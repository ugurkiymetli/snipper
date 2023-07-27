/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
"use client";
import Head from "next/head";
import Link from "next/link";
import Snipper from "~/components/Snipper";

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
      <main className="justify-space-between mb-2 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-12">
          <h1 className="my-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Snipper <span className="text-[hsl(280,100%,70%)]">.</span> Video ✂️
          </h1>
          <h5 className="m-2 text-2xl font-extrabold tracking-tight text-[#292929] sm:text-[3rem]">
            <span className="rounded-xl bg-gradient-to-r from-[#ebe01a] to-[#eb9e1a] p-4">
              Work In Progress 🛠️
            </span>
          </h5>
          <div className="w-full max-w-md">
            <Snipper />
          </div>
        </div>
      </main>
      <footer
        style={{ marginBottom: "2.5%", marginLeft: "2.5%", width: "95%" }}
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
    </>
  );
}
export async function getServerSideProps(context: {
  res: { setHeader: (arg0: string, arg1: string) => void };
}) {
  // set HTTP header

  context.res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  context.res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  console.log({ isSecureContext: context });
  return {
    props: {},
  };
}
