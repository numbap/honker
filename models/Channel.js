import mongoose from 'mongoose'


const TranscriptLineSchema = new mongoose.Schema(
    {
        index: {
          type: String,
        },
        start: {
            type: Number,
            default: 0
        },
        dur: {
            type: Number,
            default: 0
        },
        end: {
            type: Number,
            default: 0
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
        title: {
          type: String
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
        transcript: [ Object ],
        channel: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Channel' 
        },
      },
      { timestamps: true }
  )
  VideoSchema.index({'name': 1, 'corpus': -1});

  const ChannelSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 50,
      },
      name: {
        type: String
      },
      hash: {
          type: String,
          required: [true, 'Please provide channel hash'],
          maxlength: 50,
          index: true 
        },
      videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
      owner: String,
      meep: String,
      moop: Object
    },
    { timestamps: true }
  )

const TranscriptLineModel = mongoose.model('TranscriptLine', TranscriptLineSchema)
const VideoModel = mongoose.model('Video', VideoSchema)
const ChannelModel = mongoose.model('Channel', ChannelSchema)

export {TranscriptLineModel, VideoModel, ChannelModel}
