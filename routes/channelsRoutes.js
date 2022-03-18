import express from "express";
import {addChannel, getChannels, deleteChannel} from '../controllers/channelsController.js'

const channelsRouter = express.Router()

channelsRouter.route('/').post(addChannel).get(getChannels)
channelsRouter.route('/:id').delete(deleteChannel)

export default channelsRouter