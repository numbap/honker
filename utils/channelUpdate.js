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

export const updateChannel = async (hash) => {

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
        let token = vids.data.nextPageToken
        // console.log(vids, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")


        vids = await Promise.all(vids.data.items.filter(x => x.id.videoId ).map(async x => {
            const {etag, id} = x
            // let transcriptLines = await getTranscripts(id.videoId)
            // console.log(transcriptLines.length ? transcriptLines.length : 0)
            // transcriptLines = transcriptLines.length ? transcriptLines.map(x => {
            //     let {index, start, dur, end, text } = x
            //     text = text ? text : ''
            //     return new TranscriptLineSchemaModel({index, start, dur, end, text })
            // }) : []
            // const corpus = transcriptLines.map(x => x.text).join(" ")
            return {etag, transcript:[], name:'Vidx', videoId: id.videoId}
        }))

        // Map through array of objects and upsert each one. 
        try{
            await Promise.all(vids.map( async x => {
            var query = {hash,'videos.videoId': 'k1t0Eeqd4WM'};
            let push = {$setOnInsert: { videos: {
              etag: 'q1AcbrM_dfHo78xBO6cJlgE0YFg',
              transcript: [],
              name: 'Vidx'
            }}}

            console.log(x)

            // let query = {"videoId": "k1t0Eeqd4WM"}

            let y = await channel.updateOne(
              query, 
              push)
            console.log(channel, channel.videos)
            },
            {upsert: true}))
        } catch(e){
            console.log(e)
        }


        channel.videos = vids

        // const fffff = await ChannelModel.findOneAndUpdate({hash}, channel, {
        //     new: true,
        //     runValidators: true,
        //   })

          console.log(token)
    }catch(e){
        // console.log(channel, "Error")

        console.log("error", e)
    }
  }


const updateLooper = async (channel) => {
    do {
        updateChannel(channel)
        i = i + 1;
        result = result + i;
      } while (i < 5);

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