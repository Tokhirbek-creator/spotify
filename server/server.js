const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000', // TODO URL-адресс перенаправления URI
    clientId: 'eb307afae0d74941b50dbce32a536d1a', // TODO Идентификатор нашего клиента
    clientSecret: '8bded1c523024938bfb5d0458f200c1f', // TODO Секрет нашего клиента
    refreshToken,
  })
    spotifyApi
    .refreshAccessToken()
    .then(data => {
      // console.log(data.body);
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})



app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000', // TODO URL-адресс перенаправления URI
    clientId: 'eb307afae0d74941b50dbce32a536d1a', // TODO Идентификатор нашего клиента
    clientSecret: '8bded1c523024938bfb5d0458f200c1f' // TODO Секрет нашего клиента

  })
  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  })
  .catch((err) => {
    console.log(err)
    res.sendStatus(400);
  })
})

app.listen(3001)
