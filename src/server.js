const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route to fetch random art from Unsplash
app.get('/api/random-art', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: '0sdYTqwO6bq7uTWmSrqmLEPcuESO0WNkZ8OUGYxcNZI', 
      },
    });

    // Extract relevant data from the response
    const randomArt = {
      id: response.data.id,
      title: response.data.description || 'Untitled',
      imageUrl: response.data.urls.regular,
    };

    res.json(randomArt);
  } catch (error) {
    console.error('Error fetching random art:', error);
    res.status(500).json({ error: 'Failed to fetch random art' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
