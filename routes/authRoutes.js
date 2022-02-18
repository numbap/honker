import express from "express";
import {login, register, updateUser} from '../controllers/authController.js'
import authenticateUser from '../middlware/auth.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  })

const authRouter = express.Router()

authRouter.route('/register').post(apiLimiter, register)
authRouter.route('/login').post(apiLimiter, login)
authRouter.route('/updateUser').patch(authenticateUser, updateUser)

export default authRouter