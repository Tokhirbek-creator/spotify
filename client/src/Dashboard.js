/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from './useAuth';
import TrackSearchResult from './TrackSearchResult';

const spotifyApi = new SpotifyWebApi({
  clientId: 'eb307afae0d74941b50dbce32a536d1a',
});

// eslint-disable-next-line react/prop-types
export default function Dashboard({ code }) {
  // eslint-disable-next-line no-unused-vars
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // eslint-disable-next-line react/jsx-filename-extension

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return
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
    <Container className="d-flex flex-column py-3" style={{ height: '100vh' }}>
      <Form.Control
        type="search"
        placeholder="Искать песни/артистов"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>
      <div>Bottom</div>
    </Container>
  );
}
