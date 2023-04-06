import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/common/Seo";
import { Toaster } from "react-hot-toast";
import OfflineButton from "@/components/common/OfflineButton";

const Layout = ({ title, description, children,showBanner = false, ...rest }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo subtitle={title} description={description} />
      <div className="flex flex-col w-full" {...rest}>
        <Header />
        <div className="my-0 bg-pattern">
          <Toaster position="bottom-center" />
          {showBanner && <OfflineButton />}
          {children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
