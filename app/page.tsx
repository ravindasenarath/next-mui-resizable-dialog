'use client'

import Application from "@/components/Application";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Header/>

      <Application/>

      {/* <Footer/> */}
    </main>
  );
}
