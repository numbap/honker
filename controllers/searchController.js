import {TranscriptLineModel, VideoModel, ChannelModel} from '../models/Channel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import axios from 'axios'
import dotenv from 'dotenv'
import { updateChannel, refTest, getChannelId, boldifyer } from '../utils/channelUpdate.js'
import {MongoClient, ObjectId} from 'mongodb'

const youTubeURL = 'https://youtube.googleapis.com/youtube/v3/search'
const transcriptUrl = ""

export const searchTranscripts = async (req, res) => {

  let currentChannel
  let vids
  let page
  let vidCount

  currentChannel = await ChannelModel.findOne({hash: req.params.id})

  const perPage = 25
  page = (parseInt(req.body.searchPage) - 1)*perPage

  vidCount = await VideoModel.find({ 
    '$text': {'$search': req.body.search}, 
    'channel': currentChannel._id}).count()

  try{

    


    console.log(vidCount, "ssssss")

    
    vids = await VideoModel.find({ 
      '$text': {'$search': req.body.search}, 
      'channel': currentChannel._id}).limit(perPage).skip(page)
      
     
      vids = await vids.map(async x => {
        x.transcript = await boldifyer(req.body.search, x.transcript)
        return x
      })
  
      vids = await Promise.all(vids)
  
  
    res.status(StatusCodes.OK).json( {vids, vidCount, paijee: req.body.searchPage} )
  }catch(e){
    console.log("error", e)
    res.status(StatusCodes.OK).json( { paijee: vidCount} )
    // throw new NotFoundError(`Invalid input given`, {e, paijee: req.body.searchPage})
  }

  }


  export const getVideo = async (req, res) => {
    let videoId = req.params.id
    let channels
    try{
        let vid = await VideoModel.findOne({ videoId: req.params.id })
        res.status(StatusCodes.OK).json({ vid })
    }catch(e){
        console.log("error", e)
        throw new NotFoundError(`Invalid input`, e)
    }
  }

  export const getChannel = async (req, res) => {
    let videoId = req.params.id
    let channels
    try{
        let chan = await ChannelModel.findOne({ hash: req.params.id })
        let {name} = chan
        res.status(StatusCodes.OK).json({ name })
    }catch(e){
        console.log("error", e)
        throw new NotFoundError(`Invalid input`, e)
    }
  }


  export const getAllChannels = async (req, res) => {
    let channels
    try{
        let chan = await ChannelModel.find({}).select('name hash')
        let {name} = chan
        res.status(StatusCodes.OK).json({ chan })
    }catch(e){
        console.log("error", e)
        throw new NotFoundError(`Invalid input`, e)
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