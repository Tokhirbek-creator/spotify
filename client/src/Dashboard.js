/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from './useAuth';

// eslint-disable-next-line react/prop-types
export default function Dashboard({ code }) {
  // eslint-disable-next-line no-unused-vars
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  // eslint-disable-next-line react/jsx-filename-extension
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
        Песни
      </div>
      <div>Bottom</div>
    </Container>
  );
}
