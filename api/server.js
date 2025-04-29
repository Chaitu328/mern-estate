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

dotenv.config()

const PORT = process.env.PORT || 3000;
// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __direname2 = path.resolve()

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

// API routes
app.use('/api/user', useRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(__dirname, 'uploads', uniqueName);
      
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          cb(null, uniqueName);
        } else {
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

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong during upload' });
  }
});

// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from client dist directory
app.use(express.static(path.join(__direname2, 'client', 'dist')));

// This should be the LAST route
app.get('*', (req, res) => {
  res.sendFile(path.join(__direname2, 'client', 'dist', 'index.html'));
});

// Error middleware
app.use(errMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});