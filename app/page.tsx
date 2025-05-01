import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
        draggable={false}
      />
      <p className="w-1/2 text-center">
        Welcome to Chat App! A full-stack realtime chat application built with
        Next.js.
      </p>
    </section>
  );
}
