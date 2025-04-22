import express from 'express'
import { createListing,deleteListing,updateListing,getListing } from '../controller/listing.controller.js'
import { verifyUserToken } from '../Utils/verifyUser.js'

const router = express.Router()

router.post('/create',verifyUserToken,createListing)
router.delete('/delete/:id',verifyUserToken,deleteListing)
router.post('/update/:id',verifyUserToken,updateListing)
router.get('/get/:id',getListing)
export default router