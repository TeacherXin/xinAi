// pages/_app.js 或 pages/_app.tsx
 
import '../styles/globals.css';
import App from './index';
 
export default function MyApp({ Component, pageProps }) {
  return <>
    <App />
    <Component {...pageProps} />
  </>;
}