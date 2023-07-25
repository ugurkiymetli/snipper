import Head from "next/head";
import Link from "next/link";
import VideoUpload from "~/components/VideoUpload";

export default function Home() {
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
      <body className="justify-space-between flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <main>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Snipper <span className="text-[hsl(280,100%,70%)]">.</span> Video
            </h1>
            <div style={{ marginLeft: "50%" }} className=" w-full">
              <span className=" flex max-w-xs cursor-pointer flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
                <h3 className="text-2xl font-bold">Upload Video</h3>
                <VideoUpload />
              </span>
            </div>
          </div>
        </main>

        <footer
          style={{ marginBottom: "2.5%", marginLeft: "2.5%", width: "95%" }}
          className="fixed bottom-0 left-0 z-20 block w-full rounded-lg bg-white/10 p-2.5 shadow hover:bg-white/20"
        >
          <Link href="https://ugurkiymetli.com/" target="_blank">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                ugurkiymetli - 2023
              </span>
            </div>
          </Link>
        </footer>
      </body>
    </>
  );
}
