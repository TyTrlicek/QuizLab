const CLIENT_ID = '16c1f06da8d146f3bd24ddabf70153c6';  // Replace with your actual Client ID
const CLIENT_SECRET = '5c4b8e2034d6414b807383e5a58cf331';  // Replace with your actual Client Secret

// Function to get the access token using client credentials flow
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Function to search Spotify (for songs, artists, albums)
async function searchSpotify(query) {
  const token = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;  // Contains search results
}

// Example search
searchSpotify('Imagine Dragons').then((data) => {
  console.log(data);
});
