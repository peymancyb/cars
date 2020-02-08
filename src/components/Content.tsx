import React from 'react';

interface ContentProps {
  children?: React.ReactNode;
}

function Content({children}: ContentProps) {
  return <div className="content-container">{children}</div>;
}

export default Content;
