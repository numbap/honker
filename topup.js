import mongoose from 'mongoose'
import {VideoModel, ChannelModel} from './models/Channel.js'
import dotenv from 'dotenv'
import { updateChannel, refTest, getChannelId, boldifyer } from './utils/channelUpdate.js'
import connectDB from './db/connect.js'

dotenv.config()



const start = async () => {

    try{
        await connectDB(process.env.MONGO_URL)
        let channels = await ChannelModel.find().select('hash owner')
        console.log(channels)

        let topup = channels.map(x => {
            updateChannel(x.hash, x.owner, false)
            console.log(x.hash, x.owner)
        })

        await Promise.all(topup)
        console.log('Finished!')

    }catch(error){
        console.log(error)
    }    

} 

start()