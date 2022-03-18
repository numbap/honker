import express from "express";
import {searchTranscripts, getVideo, getChannel, getAllChannels} from '../controllers/searchController.js'

const channelsRouter = express.Router()

channelsRouter.route('/c/all').get(getAllChannels)
channelsRouter.route('/v/:id').get(getVideo)
channelsRouter.route('/c/:id').get(getChannel)
channelsRouter.route('/:id').post(searchTranscripts)

export default channelsRouter