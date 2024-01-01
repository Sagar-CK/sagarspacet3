import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {


  return (
    <>
   <Head>
        <title>Sagar&apos;s Space</title>
        <meta name="description" content="Made by Sagar CK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main  className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#7e64f5] to-[#4f188d] overflow-x-hidden">
        
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
          </div>
        </nav>

        {/* HEADER */}      
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            A Collection of my <span className="text-[hsl(280,100%,70%)]">Thoughts</span>
          </h1>

          {/* Entry 1 */}
          <div id="entry1" className="container flex flex-col items-center justify-center gap-16 px-4 py-16 bg-white/10  text-white rounded-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Entry 0
            </h1>
            {/* Nothing here yet + loading svg */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-lg font-bold text-white">
                Nothing here yet, coming soon💫
              </h1>
              <h1 className="text-lg font-bold text-white">
              <Link href="https://medium.com/@sagar.chethankumar" className="text-white hover:text-[#283044]" >https://medium.com/@sagar.chethankumar</Link> 
              </h1>

              <p></p>
              
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              </div>

          </div>

        </div>
        </main>
    </>
  );
};

export default Home;
