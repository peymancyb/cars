import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Footer() {
  return (
    <footer className="footer-container">
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © AUTO1 Group 2018
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
