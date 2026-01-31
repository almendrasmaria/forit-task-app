import express from 'express';
import router from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

// parse Json request body
app.use(express.json());

app.use('/api/tasks', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
