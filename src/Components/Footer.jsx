import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm" >
        <Typography variant="body1">© 2024 Hawkers</Typography>
        <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link>
      </Container>
    </footer>
  );
};

export default Footer;
