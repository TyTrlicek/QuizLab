import express from 'express';
import cors from 'cors';
import prisma from './prismaClient.js';
import { ListStart } from 'lucide-react';
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get('/api/spotify-token', async (req, res) => {
    const CLIENT_ID = '16c1f06da8d146f3bd24ddabf70153c6';
    const CLIENT_SECRET = '5c4b8e2034d6414b807383e5a58cf331';

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      console.error('Spotify API error:', data);
      return res.status(response.status).json({ error: data });
    }
  
    res.json(data);
  } catch (err) {
    console.error('Spotify token fetch failed:', err);
    res.status(500).json({ error: 'Failed to get token' });
  }
  
});

app.post('/api/create', async (req, res) => {
  const { quizTitle, selectedCategories, quizType, reducedList, mediaType, imageOrVideo } = req.body;
  console.log('Quiz Submit received', req.body);
  console.log("test", req.body.imageOrVideo);
  console.log("image or video backend", imageOrVideo)

  const quiz = await prisma.quiz.create({
    data: {
      quizTitle,
      selectedCategories,
      quizType,
      quizList: reducedList,
      image: reducedList[0].image,
      imageOrVideo,
    }
  })

  //console.log(quiz);
  res.json({ message: 'Data received successfully!', received: req.body });
});

app.get('/getquiz/:id', async (req, res) => {
  const { id } = req.params;

  const list = await prisma.quiz.findUnique({
    where: { id },
  });

  if (!list) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  if(list.imageOrVideo === "Video") {
  res.json({ 
    quizList: list.quizList,
    imageOrVideo: "Video"
  });
}
else {
  res.json({ 
    quizList: list.quizList,
    imageOrVideo: "Image"
  });
}
});

app.get('/home', async (req,res) => {
  try{
  const posts = await prisma.quiz.findMany();
  res.json(posts);
  } catch(error) {
    console.error('failed fetching home posts', error)
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
