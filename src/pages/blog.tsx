import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import * as THREE from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pointCloud, setPointCloud] = useState<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null);
  const [fov, setFov] = useState(1);

  useEffect(() => {
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
        const material = new THREE.PointsMaterial({ size: 0.01, color: 0xffffff });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        points.scale.x = -1;
        if (points) setPointCloud(points);
      });
      camera.position.z = 500;


      const animate = function (newFov: number) {
        if (newFov >= 100) {
          return; // Stop animation when fov reaches 100
        }
        camera.fov = newFov;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      
      animate(1);

      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset;
        const maxFov = 100;
        const minFov = 1;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const minScroll = 0;

        const fovRange = maxFov - minFov;
        const scrollRange = maxScroll - minScroll;

        const newFov = ((scrollPosition - minScroll) * fovRange) / scrollRange + minFov;
        animate(newFov);
      });
    }
  }, []);
  



  return (
    <>
   <Head>
        <title>Sagar's Space</title>
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
        <div id="canvas-container"  ref={canvasRef} className="w-full h-full fixed">
        </div>
        

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 fixed">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            A Collection of my <span className="text-[hsl(280,100%,70%)]">Thoughts</span>
          </h1>

          {/* Entry 1 */}
          <div id="entry1" className="container flex flex-col items-center justify-center gap-16 px-4 py-16 bg-white/10  text-white rounded-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Entry 1
            </h1>
            {/* Create two columns (left for school right for university that have two rows withine ach of them the top row containing an image and the bottom containing a text description. */}
            <div className="grid grid-cols-1 gap-64 sm:grid-cols-2 md:gap-64">
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                {/* Add the image for school */}
                <img src="/varian.png" alt="logo" className="w-full h-full rounded-2xl" />
                <h1  className="text-lg font-bold text-white">
                Franconian International School
                </h1>
                <div className="text-lg">
                  I am a graduate of the FIS in 2022. I studied the International Baccalaureate Diploma Programme and graduated with a score of 43/45. I was also the recepient of the FIS Award in 2022.
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                {/* Add the image for school */}
  
                <div className="text-lg">
                  I am studying Computer Science and Engineering and am in my first year. I am part of Delft Aerospace Rocket Engineering (DARE) and am planning to do honours in the future.
                </div>
              </div>
            </div>
          </div>


          {/* Entry 2 */}
          <div id="entry2" className="container flex flex-col items-center justify-center gap-16 px-4 py-16 bg-white/10  text-white rounded-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Entry 2
            </h1>
            {/* Create two columns (left for school right for university that have two rows withine ach of them the top row containing an image and the bottom containing a text description. */}
            <div className="grid grid-cols-1 gap-64 sm:grid-cols-2 md:gap-64">
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                {/* Add the image for school */}
                <img src="/varian.png" alt="logo" className="w-full h-full rounded-2xl" />
                <h1  className="text-lg font-bold text-white">
                Franconian International School
                </h1>
                <div className="text-lg">
                  I am a graduate of the FIS in 2022. I studied the International Baccalaureate Diploma Programme and graduated with a score of 43/45. I was also the recepient of the FIS Award in 2022.
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-4 rounded-2xl">
                {/* Add the image for school */}
  
                <div className="text-lg">
                  I am studying Computer Science and Engineering and am in my first year. I am part of Delft Aerospace Rocket Engineering (DARE) and am planning to do honours in the future.
                </div>
              </div>
            </div>
          </div>



        </div>
        </main>
    </>
  );
};

export default Home;
