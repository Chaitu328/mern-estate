import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import useRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { errMiddleware } from './middleware/error.middleware.js'
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.route.js'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 3000;
// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirname_2 = path.resolve();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
})
const app = express()
app.use(cors());

app.use(express.json())
app.use(cookieParser())

app.use('/api/user',useRouter)


app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)

// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Create a unique filename by appending a timestamp if file exists
      const uniqueName = `${Date.now()}-${file.originalname}`;
  
      // Check if file already exists, if yes, append a random string or timestamp
      const filePath = path.join(__dirname, 'uploads', uniqueName);
      
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File doesn't exist, safe to use the unique name
          cb(null, uniqueName);
        } else {
          // File exists, generate a new unique name
          const newUniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${file.originalname}`;
          cb(null, newUniqueName);
        }
      });
    }
  });
  

  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
});
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `http://localhost:${PORT}/uploads/${file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong during upload' });
  }
});

app.use(express.static(path.join(__dirname_2,'../client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname_2,'../client','dist','index.html'))
})

app.use(errMiddleware)
app.listen(PORT,()=>{
    console.log("Server is running on Port 3000")
})
