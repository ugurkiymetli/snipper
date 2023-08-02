import Head from "next/head";
import Link from "next/link";
import Snipper from "~/components/Snipper";
import useFFMegCompatible from "~/utils/useFFMegCompatible";

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
    <div className="mx-auto max-w-sm rounded-lg p-6 ">
      <div className="text-center">
        <h3 className="mb-4 border-b-2 border-solid	border-[#2c3e50] pb-2 text-2xl	font-bold text-[#e74c3c]">
          Sorry 😔
        </h3>
        <p className="text-lg text-[#ecf0f1]">
          This app is only working on desktop and some of the mobile devices.
          May not work properly on all mobile devices. We are working on more
          mobile compatibility.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const { isCompatible, isLoading } = useFFMegCompatible();

  const isRenderOk = isCompatible && !isLoading;
  const isRenderNotOk = !isCompatible && !isLoading;

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
          <div>
            <SnipperLogo />
            <span className="pt-4 text-2xl italic text-white/80">
              <>
                made by{" "}
                <Link href="https://ugurkiymetli.com/" target="_blank">
                  <span className="underline">uğur</span>
                </Link>
              </>
            </span>
          </div>
          <WorkInProgress />
          {isRenderNotOk ? <MobileAlert /> : null}
          <div className="w-full max-w-md">{isRenderOk && <Snipper />}</div>
        </div>
      </main>
    </>
  );
}
