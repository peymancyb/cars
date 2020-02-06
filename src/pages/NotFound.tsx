import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Layout from '../components/Layout';

import Logo from '../assets/logo@2x.png';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80vh',
  },
  link: {
    color: '#dd843e',
    padding: 4,
  },
  logo: {
    width: 300,
  },
}));


function NotFound() {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <img src={Logo} className={classes.logo} alt="logo" />
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          You can always go back to
          <span>
            <Link
              href="/"
              className={classes.link}
            >
              homepage.
            </Link>
          </span>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
