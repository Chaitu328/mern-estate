import express from 'express'
import { createListing } from '../controller/listing.controller.js'
import { verifyUserToken } from '../Utils/verifyUser.js'

const router = express.Router()

router.post('/create',verifyUserToken,createListing)


export default router