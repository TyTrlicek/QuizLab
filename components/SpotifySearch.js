// require('dotenv').config();

// const CLIENT_ID = process.env.CLIENT_ID;

// const CLIENT_SECRET = process.env.CLIENT_SECRET; 

// async function getAccessToken() {
//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//     },
//     body: 'grant_type=client_credentials',
//   });

//   const data = await response.json();
//   return data.access_token;
// }

// async function searchSpotify(query) {
//   const token = await getAccessToken();

//   const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist&limit=10`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();
//   return data; 
// }
