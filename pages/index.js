import Image from 'next/image'

import Navbar from "../components/ui/Navbar";



export default function Home() {
  return (
    <>
      <Navbar accountAddress="0x1234567890" />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">
              Welcome to{" "}
              <a className="text-blue-600" href="https://nextjs.org">
                Lending 
              </a>
            </h1>
          </main>
        </div>
      </div>
    </>
  );
}
