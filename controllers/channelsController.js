import {TranscriptLineModel, VideoModel, ChannelModel} from '../models/Channel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'
import { updateChannel, refTest, getChannelId } from '../utils/channelUpdate.js'

const youTubeURL = 'https://youtube.googleapis.com/youtube/v3/search'
const transcriptUrl = ""

export const addChannel = async (req, res) => {

    let channelId = req.body.channelId

    let userId = req.user.userId
    let vids = []
    if (!channelId) {
      throw new BadRequestError('Please provide a channel')
    }

    try{ 
      vids = await updateChannel(channelId, userId, false)
      res.status(StatusCodes.OK).json({ vids, channelId, userId })
    }catch(e){
      throw new NotFoundError(`Invalid input`)
    }   

  }



  export const deleteChannel = async (req, res) => {
    // const { id: jobId } = req.params
    console.log(req.params)
    const { hash, name } = req.body
    console.log(hash)
    if (!hash) {
      throw new BadRequestError('Please provide a channel has')
    }
    let channel
    try{
        // channel = await ChannelModel.findOne({ hash })
        // // console.log(channel.videos[0].corpus, "this shoudl be blank")
        // if(!channel){
        //     console.log("Create new model")
        //     channel = await ChannelModel.create({ hash })
        // }
        // console.log(`${youTubeURL}?part=snippet&channelId=${hash}&maxResults=25&access_token=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}`)
        // let vids = await axios.get(`${youTubeURL}?part=snippet&channelId=${hash}&maxResults=25&access_token=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}`);

        // // console.log(vids, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")


        // vids = await Promise.all(vids.data.items.filter(x => x.id.videoId ).map(async x => {
        //     const {etag, id} = x
        //     let transcriptLines = await getTranscripts(id.videoId)
        //     console.log(transcriptLines.length ? transcriptLines.length : 0)
        //     transcriptLines = transcriptLines.length ? transcriptLines.map(x => {
        //         let {index, start, dur, end, text } = x
        //         text = text ? text : ''
        //         return new TranscriptLineSchemaModel({index, start, dur, end, text })
        //     }) : []
        //     const corpus = transcriptLines.map(x => x.text).join(" ")
        //     return new VideoModel({etag, id, name:'Vidx', videoId: id.videoId, corpus, transcript: transcriptLines})
        // }))
        // channel.videos = vids

        // const fffff = await ChannelModel.findOneAndUpdate({hash}, channel, {
        //     new: true,
        //     runValidators: true,
        //   })

        //   console.log(vids.nextPageToken)
    }catch(e){
        // console.log(channel, "Error")

        console.log("error", e)
    }


  }




  export const getChannels = async (req, res) => {
    let userId = req.user.userId
    let channels
    try{
        channels = await ChannelModel.find({ owner: userId })
        res.status(StatusCodes.OK).json({ channels, moo: "moooooo" })
    }catch(e){
        console.log("error", e)
        throw new NotFoundError(`Invalid input`)
    }
  }








  //   export const getChannels = async (req, res) => {

  //     const { hash, name } = req.body
  //     console.log(hash)
  //     if (!hash) {
  //       throw new BadRequestError('Please provide a channel has')
  //     }
  //     let channel
  //     try{
  //       console.log('Goop')
  //     }catch(e){
  //         // console.log(channel, "Error")
  
  //         console.log("error", e)
  //     }
  
  // }












  const getTranscripts = async (video) => {
    var data = JSON.stringify({
      "x-rapidapi-host": "subtitles-for-youtube.p.rapidapi.com",
      "x-rapidapi-key": process.env.TRANSCRIPT_KEY
    });
    
    var config = {
      method: 'get',
      url: `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${video}`,
      params: {type: 'Auto', translated: 'None', lang: 'en-US'},
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