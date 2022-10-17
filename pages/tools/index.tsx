import { Converter } from "../../src/components/converter/Converter";
import { Tracker } from "../../src/components/walletTracker/Tracker";
import Head from "next/head";

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>Tools | Crypto Tracker App</title>
      </Head>
      <>
        <Converter />
        <Tracker />
      </>
    </>
  );
}
