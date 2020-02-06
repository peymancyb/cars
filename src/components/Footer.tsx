import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    borderTopStyle: 'solid',
    borderTopColor: '#ededed',
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
  },
}));


function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © AUTO1 Group 2018
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
