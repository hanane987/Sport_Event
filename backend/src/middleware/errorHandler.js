export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error', error: err });
    }
  
    res.status(500).json({ message: 'Server error', error: err.message });
  };
  