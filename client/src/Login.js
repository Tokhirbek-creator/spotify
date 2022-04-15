import React from 'react';

import { Container } from 'react-bootstrap';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=fa4756327999488f96efc43a9b02b442&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Login() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <h2 style={{ display: 'flex', position: 'absolute', 'margin-top': '-200px' }}>MiyagiFy</h2>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
