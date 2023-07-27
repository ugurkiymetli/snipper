import Head from "next/head";
import Link from "next/link";
import Snipper from "~/components/Snipper";
import useDeviceDetect from "~/utils/useDeviceDetect";

function SnipperLogo() {
  return (
    <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
      Snipper <span className="text-[hsl(280,100%,70%)]">.</span> Video ✂️
    </h1>
  );
}
function WorkInProgress() {
  return (
    <h5 className=" text-xl font-extrabold tracking-tight text-[#292929] sm:text-[2rem]">
      <span className="rounded-xl bg-gradient-to-r from-[#ebe01a] to-[#eb9e1a] p-4">
        Work In Progress 🛠️
      </span>
    </h5>
  );
}

function MobileAlert() {
  return (
    <div className=" mx-auto max-w-sm rounded-lg bg-gradient-to-r from-[#ebe01a] to-[#eb9e1a] p-6 shadow-lg">
      <div className="text-center">
        <h3 className="mb-4 text-2xl font-bold text-red-600">Oops!</h3>
        <p className="text-lg text-[#292929]">
          This app is designed for desktop use only and may not work properly on
          mobile devices.
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginBottom: "2.5%",
        marginLeft: "2.5%",
        width: "95%",
      }}
      className="fixed bottom-0 left-0 z-20 block w-full rounded-lg bg-white/10 p-2.5 shadow hover:bg-white/20"
    >
      <Link href="https://ugurkiymetli.com/" target="_blank">
        <div className="mx-auto w-full max-w-screen-xl p-4 sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            ugurkiymetli - 2023
          </span>
        </div>
      </Link>
    </footer>
  );
}

export default function Home() {
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <Head>
        <title>Snipper</title>
        <meta
          name="description"
          content="Snipper is a user-friendly web app that effortlessly splits longer videos into 15-second segments, making it easy for users to share captivating stories on WhatsApp."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-space-between mb-2 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-12">
          <SnipperLogo />
          <WorkInProgress />
          {isMobile ? <MobileAlert /> : null}
          <div className="w-full max-w-md">{!isMobile && <Snipper />}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
