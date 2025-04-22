import express from 'express'
import { createListing,deleteListing,updateListing } from '../controller/listing.controller.js'
import { verifyUserToken } from '../Utils/verifyUser.js'

const router = express.Router()

router.post('/create',verifyUserToken,createListing)
router.delete('/delete/:id',verifyUserToken,deleteListing)
router.post('/update/:id',verifyUserToken,updateListing)

export default router