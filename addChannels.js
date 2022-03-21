import mongoose from 'mongoose'
import {TranscriptLineSchemaModel, VideoModel, ChannelModel} from './models/Channel.js'
import dotenv from 'dotenv'
import { updateChannel, refTest, getChannelId, boldifyer } from './utils/channelUpdate.js'
import connectDB from './db/connect.js'

dotenv.config()



const start = async () => {

    try{
        await connectDB(process.env.MONGO_URL)
        let channels = await ChannelModel.find()
        console.log(channels)
        // Get all channels

    }catch(error){
        console.log(error)
    }

   
    //await getChannelId("ubldqqM1tPw")
    //const channel = new Channel.findOne({ name: 'Frooo' }).populate('videos');
    // console.new
        
    

} 

// const createJob = async (req, res) => {
//     const { position, company } = req.body
  
//     if (!position || !company) {
//       throw new BadRequestError('Please Provide All Values')
//     }
  
//     req.body.createdBy = req.user.userId
  
//     const job = await Job.create(req.body)
//     res.status(StatusCodes.CREATED).json({ job })
//   }


// const createChannel = async () => {

//     // Get all videos from Channel
//     // Get transcript for each video
//     // Add videos to Mongoose only if video does not already exist

//     mongoose.connect(process.env.MONGO_URL)
//     const job = await Channel.create({hash: "kkkkkkkkkkk"})
//     console.log("Done!")
// }

// // createChannel()
// start()


start()
