import {TranscriptLineSchemaModel, VideoModel, ChannelModel} from '../models/Channel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'

const youTubeURL = 'https://youtube.googleapis.com/youtube/v3/search'
// const youTubeURL = 'https://youtube.googleapis.com/youtube/v3/activities'
const transcriptUrl = ""

export const updateChannel = async (req, res) => {

    const { hash, name } = req.body
    console.log(hash)
    if (!hash) {
      throw new BadRequestError('Please provide a channel has')
    }
    let channel
    try{
        channel = await ChannelModel.findOne({ hash })
        // console.log(channel.videos[0].corpus, "this shoudl be blank")
        if(!channel){
            console.log("Create new model")
            channel = await ChannelModel.create({ hash })
        }
        console.log(`${youTubeURL}?part=snippet&channelId=${hash}&maxResults=25&access_token=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}`)
        let vids = await axios.get(`${youTubeURL}?part=snippet&channelId=${hash}&maxResults=25&access_token=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}`);

        // console.log(vids, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")


        vids = await Promise.all(vids.data.items.filter(x => x.id.videoId ).map(async x => {
            const {etag, id} = x
            let transcriptLines = await getTranscripts(id.videoId)
            console.log(transcriptLines.length ? transcriptLines.length : 0)
            transcriptLines = transcriptLines.length ? transcriptLines.map(x => {
                let {index, start, dur, end, text } = x
                text = text ? text : ''
                return new TranscriptLineSchemaModel({index, start, dur, end, text })
            }) : []
            const corpus = transcriptLines.map(x => x.text).join(" ")
            return new VideoModel({etag, id, name:'Vidx', videoId: id.videoId, corpus, transcript: transcriptLines})
        }))
        channel.videos = vids

        const fffff = await ChannelModel.findOneAndUpdate({hash}, channel, {
            new: true,
            runValidators: true,
          })

          console.log(vids.nextPageToken)
    }catch(e){
        // console.log(channel, "Error")

        console.log("error", e)
    }


  }


  const getTranscripts = async (video) => {
    var data = JSON.stringify({
      "x-rapidapi-host": "subtitles-for-youtube.p.rapidapi.com",
      "x-rapidapi-key": process.env.TRANSCRIPT_KEY
    });
    
    var config = {
      method: 'get',
      url: `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${video}`,
      headers: { 
        'x-rapidapi-key': process.env.TRANSCRIPT_KEY, 
        'x-rapidapi-host': 'subtitles-for-youtube.p.rapidapi.com', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    let froo = await axios(config)
    .then(function (response) {
        return response.data
        // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    return froo
    

  }
  export { updateChannel }