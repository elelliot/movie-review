import Head from "next/head";
import Nav from "./Nav";
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Film Database</title>
    </Head>
    <Nav />
    <main className="p-4">
      <div className="flex justify-center items-center bg-white mx-auto w-1/2 rounded-lg my-16 p-16">
        <div className="text-2xl font-medium">{children}</div>
      </div>
    </main>
  </>
);

export default Layout;
