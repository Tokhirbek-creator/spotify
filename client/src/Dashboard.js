/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import useAuth from './useAuth';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
  clientId: 'fa4756327999488f96efc43a9b02b442',
});

// eslint-disable-next-line react/prop-types
export default function Dashboard({ code }) {
  // eslint-disable-next-line no-unused-vars
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');
  // eslint-disable-next-line react/jsx-filename-extension

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  useEffect(() => {
    if (!playingTrack) return

    axios.get('http://localhost:3001/lyrics', {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
      },
    }).then((res) => {
      setLyrics(res.data.lyrics);
    });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(res.body.tracks.items.map((track) => {
        const smallestalbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.album.images[0]);

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestalbumImage.url,
        };
      }));
    });

    return () => cancel = true;
  }, [search, accessToken]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
      <h3>MiyagiFy</h3>
      <Form.Control
        type="search"
        placeholder="Искать песни/ альбомы/ артистов"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
