import React from 'react';
import Layout from '../components/Layout';
import Logo from '../assets/logo@2x.png';

function NotFound() {
  return (
    <Layout>
      <div data-testid="not-found-component" className="not-found-container">
        <img src={Logo} className="not-found-logo" alt="logo" />
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          You can always go back to
          <span>
            <a href="/" className="link-text">
              homepage.
            </a>
          </span>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
