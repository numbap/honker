import {TranscriptLineModel, VideoModel, ChannelModel} from '../models/Channel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'

const youTubeURL = 'https://youtube.googleapis.com/youtube/v3/search'

const transcriptUrl = ""

// regex = /(\[.*?\])/gi
// console.log("I love [music] sessions".replace(regex, "."))

///\b($word)\b/i whole word match

// Get Channel Name to pretty up output
// https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UCpFN5_YDQpHMF2XGpV9JKrA&key=[YOUR_API_KEY]

export const updateChannel = async (hash, owner, paginate) => {

    console.log(`-${hash}-`)
    if (!hash) {
      throw new BadRequestError('Please provide a channel hash')
    }
    let channel
    let vids
    let channelTitle
    try{
        // Find Channel
        channel = await ChannelModel.findOne({ hash })
        if(!channel){
            channel = await ChannelModel.create({ hash, owner })
        }else{
          await channel.populate('videos')
        }

        let token = ""
        // Keep looping until no more page tokens
        while(true){

          // Get videos
          vids = await axios.get(`${youTubeURL}?part=snippet&channelId=${hash}&maxResults=25&access_token=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}&pageToken=${token}`);
          token = vids.data.nextPageToken
          console.log(token)

          vids = await Promise.all(vids.data.items.filter(x => x.id.videoId ).map(async x => {
              const {etag, id, snippet} = x
              let transcriptLines = await getTranscripts(id.videoId)

              transcriptLines = transcriptLines ? transcriptLines.map(x => {
                  let {index, start, dur, end, text } = x
                  text = text ? text : ''

                  text = text.replace(/(\[.*?\])/gi, "")

                  let transcriptModel = {index, start, dur, end, text }
                  return transcriptModel
              }) : []

              const corpus = await transcriptLines.map(x => {
                console.log(x)
                return x.text}).join(" ")

              channelTitle = snippet.channelTitle  
              return {etag, transcript:transcriptLines, name: snippet.title, videoId: id.videoId, corpus}
          }))


          // Add videos to document or update
          await Promise.all(vids.map(async x => {
            try{
              let video = await VideoModel.findOne({ videoId: x.videoId })
              if(!video){
                video = VideoModel({ videoId: x.videoId, name: x.name, etag: x.etag, transcript: x.transcript, channel: channel._id, corpus: x.corpus})
                channel.videos.push(video)
                await video.save()
              }else{
                video.name = x.name
                video.save()
              }

            }catch(e){
              console.log(e)
            }
          }))
          
          channel.name = channelTitle
          await channel.save()


          if(!token || !paginate){
            break
          }

        }
        console.log('Done!')
        return vids
    }catch(e){
        console.log("error", e)
        return []
    }

  }




export const boldifyer = (searchString, lineArray) => {
  try{
    let wordArray = searchString.match(/\b(\w+)\b/g)

  // regex = /(\[.*?\])/gi
  // console.log("I love [music] sessions".replace(regex, "."))
  
  ///\b($word)\b/i whole word match
  
    let finalOutput = lineArray.map(x => {
      let tmp = {...x}
  
      wordArray.map(y => {
        let re = RegExp(`\\b${y}\\b`, 'gi')
        tmp.text = tmp.text.replace(re, `<b>${y}</b>`)
      })

      if(tmp.text === x.text){
        tmp.text = null
      }
      return tmp
    }).filter(y => y.text)
  
    return finalOutput
  }catch(e){
    console.log(e)
  }


}


export const refTest = async (hash) => {
  let channel = await ChannelModel.findOne({ hash })
  let video = await VideoModel.findOne({ videoId: 'lllll' })
  if(!channel){
    channel = await new ChannelModel({hash})
  }
  if(!video){
    video = VideoModel({ videoId: 'lllll', name: "The Video", etag: "ddddd", channel: channel._id })
    channel.videos.push(video)
    await video.save()
    await channel.save()
    console.log(channel, "xxxxxx")
  }
  video.populate('channel')
  await channel.populate('videos')
  await channel.save()
  // console.log(channel, video)

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
        return response.data.length ? response.data : []
        // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // console.log(error);
      return []
    });

    return froo ? froo : []
    

  }

  export const getChannelId = async (videoid) => {

    try{
      let vids = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=ubldqqM1tPw&key=${process.env.YOUTUBE_DATA}&key=${process.env.YOUTUBE_DATA}`)
      console.log(vids.data.items[0].snippet.channelId)
    }catch(e){
      console.log(e.response)
    }
  }

  