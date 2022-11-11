import Head from "next/head";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { Layout } from "../src/components/layout/Layout";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <link rel="icon" href="/bitcoin.png" />
        <title>Crypto Tracker </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <MantineProvider>
              <Component {...pageProps} />
            </MantineProvider>
          </Layout>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
