export const uploadFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      res.status(200).json({
        message: 'File uploaded successfully',
        path: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
