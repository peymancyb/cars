import React from 'react';
import Link from '@material-ui/core/Link';

interface IPagination {
  totalPageCount: number;
  loading: boolean;
}

interface ITextLink {
  text: string;
  href: string;
}

function TextLink({ text, href }: ITextLink) {
  return (
    <Link
      color="inherit"
      noWrap
      variant="body2"
      href={href}
      className="details-text"
    >
      {text}
    </Link>
  );
}

function Pagination({ totalPageCount, loading }: IPagination) {
  if(loading) {
    return null;
  }
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 100,
      marginRight: 100,
    }}
    >
      <TextLink text="First" href="/" />
      <TextLink text="Previous" href="/" />
      <p>
        Page 1 of
        {' '}
        {totalPageCount}
      </p>
      <TextLink text="Next" href="/" />
      <TextLink text="Last" href="/" />
    </div>
  );
}

export default Pagination;
