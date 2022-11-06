import Head from "next/head";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { Layout } from "../src/components/layout/Layout";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/bitcoin.png" />
        <title>Crypto Tracker App </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Provider store={store}>
        <Layout>
          <MantineProvider>
            <Component {...pageProps} />
          </MantineProvider>
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
