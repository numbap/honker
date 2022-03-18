import mongoose from 'mongoose'
import {TranscriptLineSchemaModel, VideoModel, ChannelModel} from './models/Channel.js'
import dotenv from 'dotenv'
import { updateChannel } from './utils/channelUpdate.js'
import connectDB from './db/connect.js'

