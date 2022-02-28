import mongoose from 'mongoose'


const TranscriptLineSchema = new mongoose.Schema(
    {
        index: {
          type: String,
          required: [true, 'Please provide video name'],
        },
        start: {
            type: Number,
            required: [true, 'Please provide start time'],
        },
        dur: {
            type: Number,
            required: [true, 'Please provide duration'],
        },
        end: {
            type: Number,
            required: [true, 'Please provide end time'],
        },
        text: {
            type: String,
            default: ''
        }
      }
  )

const VideoSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'Please provide video name'],
          maxlength: 500,
        },
        etag: {
            type: String,
            required: [true, 'Please provide video tag'],
            maxlength: 500,
        },
        videoId: {
            type: String,
            required: [true, 'Please provide video id'],
            maxlength: 500,
            unique: true
        },
        corpus: {
          type: String,
        },
        transcript: [ TranscriptLineSchema ]
      },
      { timestamps: true }
  )

  const ChannelSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 50,
      },
      hash: {
          type: String,
          required: [true, 'Please provide channel hash'],
          maxlength: 50,
          index: true 
        },
      videos: [ VideoSchema ]
    },
      { timestamps: true }
  )

const TranscriptLineSchemaModel = mongoose.model('TranscriptLine', TranscriptLineSchema)
const VideoModel = mongoose.model('Video', VideoSchema)
const ChannelModel = mongoose.model('Channel', ChannelSchema)

export {TranscriptLineSchemaModel, VideoModel, ChannelModel}