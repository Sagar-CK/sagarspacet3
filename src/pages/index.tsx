import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Sagar's Space</title>
        <meta name="description" content="Made by Sagar CK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#7e64f5] to-[#4f188d] overflow-x-hidden">

        <nav className="flex items-center justify-between w-full px-4 py-16 backdrop-filter backdrop-blur">


          <div className="flex items-center gap-4">
            <img src="/sck.png" alt="logo" className="w-128 h-8 px-16" />
          </div>
          <div className="flex items-center gap-16 px-8">
            {/* Create a link to bring to the education section which is on the same page*/}
            <Link href="/#education" className="text-lg font-bold text-white hover:text-[#283044]">
              Education
            </Link>
            {/* Skills */}
            <Link href="/#skills" className="text-lg font-bold text-white hover:text-[#283044]">
              Skills
            </Link>
            {/* Experience */}
            <Link href="/#experience" className="text-lg font-bold text-white hover:text-[#283044]">
              Experience
            </Link>
            <Link href="/blog " className="text-lg font-bold text-white hover:text-[#283044]">
              Blog
            </Link>
            <Link href="/about" className="text-lg font-bold text-white hover:text-[#283044]">
              About
            </Link>
          </div>
        </nav>

        <div className="flex flex-col items-center gap-32 w-screen h-full">
          <div className="container flex flex-col items-center justify-center gap-12 px-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Welcome to  <span className="text-[#283044]">Sagar's</span> Space!
            </h1>
            </div>
            {/* Create a div with 2 coulums the left contains an image followed by buttons to social media underneath them (2 rows). The right column contains text and buttons under neath them */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                {/* Now we want two divs one for the image and one to hold the list of buttons to github, linkedin, twitter.. */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className=" h-5/6 w-5/6 rounded-2xl overflow-hidden">
                    <img src="/sckpfp.jpg" alt="logo" className="w-full h-full" />
                  </div>
                  <div className="flex flex-row gap-4 justify-center">
                    {/* Create buttons with the logos */}
                    <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                      <img src="/github.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/linkedin.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/twitter.svg" alt="logo" className="w-8" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-5 rounded-xl bg-white/10 p-4 text-white">
                <h3 className="text-2xl font-bold text-[#283044]">Who am I?</h3>
                <div className="text-lg">
                  I am a freshman at TU Delft studying Computer Science and Engineering! Welcome to my "space" - an overview of some of my accomplishments to date.
                </div>
                <div className="flex flex-row gap-4">
                  <button className="bg-[#902fff] text-white rounded-md p-2">Resume</button>
                  <button className="bg-[#902fff] text-white rounded-md p-2">Contact</button>
                </div>
              </div>
            </div>
       


          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 bg-white/10 p-4 text-white rounded-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Education
            </h1>
            {/* Create two columns (left for school right for university that have two rows withine ach of them the top row containing an image and the bottom containing a text description. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                </div>
                </div>
          </div>


          <footer className="flex items-center justify-center w-full px-4 py-8 backdrop-filter backdrop-blur">
            {/* Create one div that is flex col with gap */}
            <div className="flex items-center gap-16 px-8">
              <button >
                <img src="/github.svg" alt="logo" className="w-8 text-[#283044]" />
              </button>
              <button >
                <img src="/linkedin.svg" alt="logo" className="w-8 text-[#283044]" />
              </button>
              <button >
                <img src="/twitter.svg" alt="logo" className="w-8" />
              </button>
            </div>
          </footer>

        </div>



      </main>
    </>
  );
};

export default Home;
