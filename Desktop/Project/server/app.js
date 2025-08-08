const express = require('express');
const app = express();

// Middleware לפרסר JSON רק אם יש גוף בקשה
app.use((req, res, next) => {
  const contentLength = req.headers['content-length'];
  if (contentLength && parseInt(contentLength) > 0) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// טיפול בשגיאות פרסור JSON - מונע קריסה ושולח הודעת שגיאה ברורה
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next();
});

// הנתיבים שלך
const buildingRoutes = require('./routes/buildingRoutes');
const userRoutes = require('./routes/userRoutes');
const floorRoutes = require('./routes/floorRoutes');
const roomRoutes = require('./routes/roomRoutes');
const sensorRoutes = require('./routes/sensorRoutes')
app.use('/api/buildings', buildingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/floors', floorRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/sensors', sensorRoutes);
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
