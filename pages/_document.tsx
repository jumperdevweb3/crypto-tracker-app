import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="root"></div>
        <div id="stats-modal"></div>
        <div id="exchange-modal"></div>
        <div id="companies-modal"></div>
        <div id="nft-modal"></div>
      </body>
    </Html>
  );
}
