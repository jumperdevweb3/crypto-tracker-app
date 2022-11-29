import { Converter } from "@/components/tools/converter/Converter";
import { Tracker } from "@/components/tools/walletTracker/Tracker";
import Head from "next/head";

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>Tools | Crypto Tracke</title>
      </Head>
      <>
        <Converter />
        <Tracker />
      </>
    </>
  );
}
