import express from 'express'
import UserModel from './schema'

const usersRouter = express.Router()

usersRouter.get('/', async(req, res, next) => {
    try{
      const users = await UserModel.find()  
    }
    catch(error){
        next(error)
    }
})