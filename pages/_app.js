import "../styles/globals.css";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
const Progress = dynamic(() => import("../components/Progress.js"));
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Progress />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
