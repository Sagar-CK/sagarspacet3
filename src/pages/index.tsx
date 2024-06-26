import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import * as THREE from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import React, { use, useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pointCloud, setPointCloud] = useState<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null);
  const [fov, setFov] = useState<number>(1);


  useEffect(() => {
    // don't do this if we are on a phone
    if (canvasRef.current && canvasRef.current.children.length === 0) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // set clear color to transparent
      canvasRef.current.appendChild(renderer.domElement);

      const loader = new PCDLoader();
      loader.load('/cloud1.pcd', (pointCloud) => {
        const geometry = pointCloud.geometry;
        const color = new THREE.Color(0x4f2342);
        const material = new THREE.PointsMaterial({ size: 1, color: color });
        material.blending = THREE.AdditiveBlending; // set blending mode for glow effect
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        points.scale.x = -1;
        if (points) setPointCloud(points);
      });
      camera.position.z = 250;

      const animate = function (newFov: number) {
        if (newFov >= 100) {
          return; // Stop animation when fov reaches 100
        }
        camera.fov = newFov;
        camera.updateProjectionMatrix();

        const points = scene.children[0];
        if (points instanceof THREE.Points) {
          // Make a new color that is following a gradient towards using Hex values
          let pointsNew = new THREE.Object3D();
          if (points.material instanceof THREE.PointsMaterial) {
            if (points.material.color instanceof THREE.Color) {
              const initColor = points.material.color;
              const endColor = new THREE.Color(0xffffff);
              const color = initColor.clone().lerp(endColor, newFov / 100);
              if (points.geometry instanceof THREE.BufferGeometry) {
                const geometry = points.geometry;

                const material = new THREE.PointsMaterial({ size: 1, color: color });
                material.blending = THREE.NormalBlending;
                pointsNew = new THREE.Points(geometry, material);
                scene.remove(points);
              }
            }
          }

          // Add random points to the scene or remove them and add new ones that are more spread out
          if (points.children.length > 0) {
            const randomPoints = points.children[0];
            if (randomPoints instanceof THREE.Points) {
              points.remove(randomPoints);
            }
          }
          const randomGeometry = new THREE.BufferGeometry();
          const randomMaterial = new THREE.PointsMaterial({ size: 1, color: 0x4f2342, });
          randomMaterial.blending = THREE.NormalBlending;

          // Get the previous random points and move them inwards

          const randomPoints = new THREE.Points(randomGeometry, randomMaterial);
          const randomPositions = new Float32Array(1000 * 3); // Three values (x, y, z) for each vertex
          for (let i = 0; i < 1000 * 3; i += 3) {
            randomPositions[i] = Math.random() * 1000 - 500; // x-coordinate
            randomPositions[i + 1] = Math.random() * 1000 - 500; // y-coordinate
            randomPositions[i + 2] = Math.random() * 1000 - 500; // z-coordinate
          }
          randomGeometry.setAttribute("position", new THREE.BufferAttribute(randomPositions, 3));


          randomGeometry.setAttribute("position", new THREE.BufferAttribute(randomPositions, 3));
          // scene.add(randomPoints);
          // we need to add these points to the pointsNew object so that they are all in the same object
          // but we need to only change the position of the random points

          pointsNew.add(randomPoints);
          scene.add(pointsNew)
        }

        renderer.render(scene, camera);
      };

      animate(1);

      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset;
        const maxFov = 100;
        const minFov = 1;
        const maxScroll = (document.body.scrollHeight - window.innerHeight) / 15;
        const minScroll = 0;

        const fovRange = maxFov - minFov;
        const scrollRange = maxScroll - minScroll;

        const newFov = ((scrollPosition - minScroll) * fovRange) / scrollRange + minFov * 2;
        animate(newFov);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sagar&apos;s Space</title>
        <meta name="description" content="Made by Sagar CK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="root">
        <main className="flex min-h-screen min-w-screen flex-col items-center bg-repeat bg-gradient-to-b from-[#7e64f5] to-[#4f188d] overflow-x-hidden">

          {/* NAVIGATION BAR*/}
          <nav className="flex items-center justify-between w-full px-4 py-16 backdrop-filter backdrop-blur">
            <div className="flex items-center">
              <img src="/sck.png" alt="logo" className="lg:h-8 h-4 lg:px-16 px-0" />
            </div>
            <div className="flex items-center lg:gap-16 gap-4 md:px-8">
              {/* Create a link to bring to the education section which is on the same page*/}
              <Link href="/#education" className="lg:text-lg  text-xs font-bold text-white hover:text-[#283044]">
                Education
              </Link>
              {/* Skills */}
              <Link href="/#skills" className="lg:text-lg text-xs font-bold text-white hover:text-[#283044]">
                Skills
              </Link>
              {/* Experience */}
              <Link href="/#experience" className="lg:text-lg  text-xs font-bold text-white hover:text-[#283044]">
                Experience
              </Link>
              <Link href="/blog " className="lg:text-lg  text-xs font-bold text-white hover:text-[#283044]">
                Blog
              </Link>
            </div>
          </nav>

          <div className="flex flex-col items-center gap-32 w-full h-full">

            {/* WELCOME SECTION */}
            <div className="container flex flex-col items-center justify-center gap-12  px-4">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Welcome to  <span className="text-[#283044]">Sagar&apos;s</span> Space!
              </h1>
              <div className="flex flex-row items-center justify-center gap-4">
                <p className="text-lg font-medium text-white">Scroll down to explore!</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* THREE.JS POINTCLOUD */}
            <div id="pointcloud" className="hidden md:flex flex-col">
              <div id="canvas-container" ref={canvasRef} ></div>
              <div className="flex flex-row items-center justify-center gap-4">
                <h1 className="md:text-lg text-md"> What was that??!</h1>
                {/* Find out more  refrence to varian*/}
                <button className="px-4 py-2 md:text-lg text-md font-bold text-white bg-[#283044] rounded-md hover:bg-[#4f188d]">
                  <Link href="/#varian">
                    Find out more!
                  </Link>
                </button>
              </div>
            </div>


            {/* CONTACT SECTION */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-32">
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className=" h-5/6 w-5/6 rounded-2xl overflow-hidden">
                    <img src="/sckpfp.jpg" alt="logo" className="w-full h-full" />
                  </div>
                  <div className="flex flex-row gap-4 justify-center">
                    <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                      <Link href="https://github.com/Sagar-CK">
                        <img src="/github.svg" alt="logo" className="w-8 text-[#283044]" />
                      </Link>
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <Link href="https://linkedin.com/in/sagar-chethan-kumar">
                        <img src="/linkedin.svg" alt="logo" className="w-8 text-[#283044]" />
                      </Link>
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <Link href="https://twitter.com/SagarCK04">
                        <img src="/twitter.svg" alt="logo" className="w-8" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-10 rounded-xl bg-white/10 p-4 text-white">
                <h3 className="md:text-3xl text-xl font-bold text-[#283044]">Who am I?</h3>
                <div className="md:text-lg text-md">
                  I am a second year Computer Science student @ TU Delft! Welcome to my space - an overview of some of my accomplishments to date.
                </div>
                <div className="flex flex-row gap-4">
                  <button className=" md:text-lg text-md bg-[#283044]  hover:bg-[#4f188d] text-white rounded-md p-2">
                    <Link href="mailto:sagar.chethankumar@gmail.com">
                      Contact me!
                    </Link>
                  </button>
                </div>
              </div>
            </div>

            {/* EDUCATION SECTION */}
            <div id="education" className="container flex flex-col items-center justify-center gap-16 px-4 py-16 bg-white/10  text-white rounded-2xl">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Education
              </h1>
              <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:gap-64">
                <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                  <img src="/fis.jpg" alt="logo" className="w-full h-full rounded-2xl" />
                  <div className="flex flex-col gap-4 bg-[#2830445d] rounded-xl py-2 px-2">
                    <h1 className="md:text-lg text-md font-bold text-white">
                      Franconian International School
                    </h1>
                    <h1 className="md:text-md text-sm font-bold text-white">
                      International Baccalaureate Diploma
                    </h1>
                    <div className="md:text-lg text-md">
                      Graduated in May 2022 with a score of 43/45. I was also the recepient of the FIS Award in 2022.
                    </div>
                  </div>
                </div>
                <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                  <img src="/tud.jpg" alt="logo" className="w-full h-full rounded-2xl" />
                  {/* Div for text components */}
                  <div className="flex flex-col gap-4 bg-[#2830445d] rounded-xl py-2 px-2">
                    <h1 className="md:text-lg text-md font-bold text-white">
                      Delft University of Technology
                    </h1>

                    <h1 className="md:text-md text-sm font-bold text-white">
                      BSc. Computer Science & Engineering
                    </h1>
                    <div className="md:text-lg text-md">
                      {/* Create a list of divs that are cleanly colorfully formatted descrbing accomplishments */}
                      Honours Programme (research under <Link className='text-white hover:text-[#283044]' href='http://ujwalgadiraju.com/'>Dr. Ujwal Gadiraju</Link>), Delft Aerospace Rocket Engineering (DARE), and MakerSpace Delft.
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* SKILLS SECTION */}
            <div id="skills" className="flex flex-col items-center gap-16 py-16 bg-[#283044] p-4 w-full h-full text-white ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Skills
              </h1>
              <div className="flex flex-row justify-evenly items-center w-full">

                <div className="hidden md:flex flex-col h-full items-center justify-center  gap-4 mb-32">
                  <div className="flex flex-row gap-4">
                    <button id="html" className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                      <img src="/html5.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/css3.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/js.svg" alt="logo" className="w-8" />
                    </button>
                  </div>
                  <div className="flex flex-row gap-4">
                    <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                      <img src="/java.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/python.svg" alt="logo" className="w-8 text-[#283044]" />
                    </button>
                    <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                      <img src="/figma.svg" alt="logo" className="w-8" />
                    </button>
                  </div>
                </div>
                <div className="gap-12 flex flex-col">
                  <h1 className="text-2xl font-bold text-white">How comfortable am I with them?</h1>
                  <div className="md:text-lg text-md ">
                    I can go ahead and build a rocket with them 🚀! (Not literally but you get the point)
                    <li>
                      Java 💖
                    </li>
                    <li>
                      Python 🤍
                    </li>
                    <li>
                      HTML/CSS/JS 💝
                    </li>
                    <li>
                      TypeScript 💛
                    </li>
                  </div>
                  <div className="md:text-lg text-md">
                    I can craft a cool app with them 📱
                    <li>
                      Figma 💗
                    </li>
                    <li>
                      C++ 💖
                    </li>
                    <li>
                      C 💌
                    </li>
                  </div>
                  <div className="md:text-lg text-md">
                    I want to get to know them better 🤔
                    <li>
                      React 💙
                    </li>
                    <li>
                      Rust 💚
                    </li>
                    <li>
                      Scala 💜
                    </li>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div id="experience" className="flex flex-col items-center gap-16 md:gap-32">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Experience
              </h1>

              {/* DARE */}
              <div className="container flex flex-col-reverse md:flex-row md:justify-evenly items-center  gap-8 md:gap-16 px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="lg:w-1/3 w-2/3">
                  <img src="/srp.png" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
                <div className="flex flex-col container gap-16 items-start w-3/4">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    Simulations Engineer <span className="text-[#98b4c7]">@DARE</span> (Stratos V)
                  </h1>
                  <div className="lg:text-lg text-md">
                    As an avid puzzler, I love learning new ways to apply my skills in Computer Science, either through my existing expertise in algorithms or by branching out into new fields. DARE is precisely this to me - an opportunity to get hands-down experience with the intricacy of engineering. As a simulations engineer I enjoyed  applying my software development skills to aiding the launch of the Stratos V rocket!</div>
                </div>
              </div>

              {/* VARIAN */}
              <div id="varian" className="container flex flex-col md:flex-row md:justify-evenly items-center gap-8 md:gap-16  px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="flex flex-col gap-16 items-start w-2/3">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    Research & Software Dev Intern <span className="text-[#7aa7f0]">@Varian</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    Entering the year 2022, I was granted the opportunity to embark on a new computer science endeavor - computer vision. Under the guidance of Stefan Wiesner, I conducted a literature review to understand the world of computer vision concerning point clouds and meshes capturing the human body. I developed an extrema estimation software using an adapted version of Dijkstras algorithm. This computed the global maxima of a given human point cloud, labeling this vertex path from the centroid. Thanks once again to Varian and Stefan for taking me on board!
                  </div>
                  {/* Button to the report */}
                  <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                    <Link href="https://drive.google.com/file/d/1JOVzFal4RGDkwVlqOjsGJE0P5rbLy6If/view">
                      Read the report here!
                    </Link>
                  </button>
                </div>
                <div className="lg:w-1/6 lg:h-1/2 w-1/2">
                  <img src="/varian.png" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
              </div>

              {/* ADIDAS */}
              <div className="container flex flex-col-reverse md:flex-row md:justify-evenly  items-center gap-8 md:gap-16  px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="lg:w-1/3 w-2/3">
                  <img src="/confirmed.png" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
                <div className="flex flex-col gap-16 items-start w-3/4">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    {/* App Dev Intern @Adidas*/}
                    App Dev Intern <span className="text-[#283044]">@Adidas</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    I have loved the art of application development, and to this day, I continue to cherish my first formal opportunity of doing exactly this! During my HS freshman summer, I was grateful enough to receive the opportunity to join the Adidas team in building a shoe raffle application based on their CONFIRMED Android Adidas app. Alongside another intern, I developed the raffle ticket system allowing users to randomly be selected for new shoe drops and, by doing so, make their day with free shoes :) </div>
                </div>

              </div>

              {/* SIEMENS */}
              <div className="container flex flex-col md:flex-row md:justify-evenly items-center gap-8 md:gap-16 px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="flex flex-col gap-16 items-start w-1/2">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    Data Scientist Working Student <span className="text-[#ecaa84]">@Siemens Healthineers</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    Interested in expanding my knowledge of computer science with a focus on data, I joined Siemens Healthineers as a working student in the summer of 2023. Here I familiarized myself with NLP tasks concerning language classification and machine translation using transformers and commerical services. I enjoyed developing my knowledge of data science and look forward to applying it in the future!
                  </div>
                </div>
                <div className="lg:w-1/3 w-2/3">
                  <img src="/siemens.svg" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
              </div>


              {/* DIGIONKO */}
              <div className="container flex flex-col-reverse md:flex-row md:justify-evenly items-center gap-8 md:gap-16 px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="lg:w-1/3 w-2/3">
                  <img src="/logo-digionko-rgb.png" alt="logo" className="w-full h-full rounded-2xl" />
                </div>

                <div className="flex flex-col gap-16 items-start w-3/4">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    Research Intern <span className="text-[#ee9ad5]">@DigiOnko</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    DigiOnko is a country-wide medical project to aid breast cancer treatment and monitoring through machine learning. As a research intern, I helped conduct a systematic review of breast cancer risk parameters and assessed their ability to be implemented in technological integrations and machine learning algorithms. Thanks to the FAU Machine Learning and Data Analytics (Mad) Lab for allowing me to join their team temporarily :)  </div>
                  <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                    <Link href="https://drive.google.com/file/d/1JOVzFal4RGDkwVlqOjsGJE0P5rbLy6If/view">
                      Read the literature review here!
                    </Link>
                  </button>
                </div>
              </div>


              {/* MAKERSPACE */}
              <div className="container flex flex-col md:flex-row md:justify-evenly items-center gap-8 md:gap-16  px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="flex flex-col gap-16 items-start w-3/4">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    {/* Software Dev @ Makerspace Delft */}
                    Software Dev <span className="text-[#acfaf5]">@Makerspace Delft</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    Currently working part-time at the non-profit Makerspace Delft! Centered around community, building, and passion, Makerspace is the perfect place to be challenged with new things every day! I currently assume many responsibilities but mainly work on upkeeping existing infrastructures and developing a new website :)
                  </div>
                </div>
                <div className="lg:w-1/3 w-2/3">
                  <img src="/msd.jfif" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
              </div>

              {/* DIGITAL TWIN */}
              <div className="container flex flex-col-reverse md:flex-row md:justify-evenly items-center gap-8 md:gap-16 px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="lg:w-1/3 w-2/3">
                  <img src="/digtwin.png" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
                <div className="flex flex-col gap-16 items-start w-3/4">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    App Dev & UI/UX Intern <span className="text-[#283044]">@DigitalTwin</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    After my experience with DigiOnko, I was also tasked with helping Digital Twin, a collaborative project between FAU and Adidas. As an application development intern, I helped design and integrate the existing Digital Twin application into a more modern and Adidas-like user interface. Through integrating sensor data and developing interfaces for both IOS and Android, Digital Twin expanded my programming horizons! Looking forward to seeing what they can achieve in the coming years.
                  </div>
                </div>
              </div>

              {/* KKF */}
              <div className="container flex flex-col md:flex-row md:justify-evenly items-center gap-8 md:gap-16  px-4 py-16 bg-white/10 w-5/6 text-white rounded-2xl">
                <div className="flex flex-col gap-16 items-start w-2/3">
                  <h1 className="lg:text-5xl text-2xl font-extrabold tracking-tight text-white ">
                    Volunteer <span className="text-[#fa7b7b]">@KKF</span>
                  </h1>
                  <div className="lg:text-lg text-md">
                    Kannada Koota Franconia (KKF) is a place to chat, dance, have fun, but above all, reconnect and relish your cultural heritage. As a youth coordinator, I helped incentivize local engagement with south Asian traditions while raising funds for the less fortunate in events earnings. With a group of 250+ members, KKF sets off to reconnect south Asians across the globe.</div>
                </div>
                <div className="lg:w-1/3 w-2/3">
                  <img src="/kkf.jpg" alt="logo" className="w-full h-full rounded-2xl" />
                </div>
              </div>

            </div>


            {/* FOOTER SECTION */}
            <footer className="flex items-center justify-center w-full px-4 py-8 backdrop-filter backdrop-blur bg-white/10">
              <div className="flex items-center gap-16 px-8">
                <button className="bg-white/10 text-white hover:bg-white/20 rounded-md p-2">
                  <Link href="https://github.com/Sagar-CK">
                    <img src="/github.svg" alt="logo" className="w-8 text-[#283044]" />
                  </Link>
                </button>
                <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                  <Link href="https://linkedin.com/in/sagar-chethan-kumar">
                    <img src="/linkedin.svg" alt="logo" className="w-8 text-[#283044]" />
                  </Link>
                </button>
                <button className="bg-white/10 p-2 rounded-md text-white hover:bg-white/20">
                  <Link href="https://twitter.com/SagarCK04">
                    <img src="/twitter.svg" alt="logo" className="w-8" />
                  </Link>
                </button>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
