import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Logo from '../assets/logo@2x.png';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  toolbarLink: {
    padding: theme.spacing(5),
    textDecoration: 'none !important',
  },
}));

const links = [
  {
    url: '/purchase',
    title: 'Purchase',
  },
  {
    url: '/myorders',
    title: 'My Orders',
  },
  {
    url: '/sell',
    title: 'Sell',
  },
];

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div>
          <img src={Logo} alt="logo" style={{ width: 150 }} />
        </div>
        <div>
          {links.map((link) => (
            <Link
              key={link.title}
              color="inherit"
              noWrap
              variant="body2"
              href={link.url}
              className={classes.toolbarLink}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </Toolbar>
    </div>
  );
}
