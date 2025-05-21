// pages/_app.js 或 pages/_app.tsx
import React from 'react';

import '../styles/globals.css';
import App from './index';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <App />
      <Component {...pageProps} />
    </>
  );
}
