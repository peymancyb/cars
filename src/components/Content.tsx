import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    margin: theme.spacing(2),
    minHeight: '80vh',
  },
}));

interface ContentProps {
  children?: React.ReactNode;
}

function Content({children}: ContentProps) {
  const classes = useStyles();

  return <div className={classes.main}>{children}</div>;
}

export default Content;
