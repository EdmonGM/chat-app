import Image from "next/image";
import React from "react";

function LoadingLogo() {
  return (
    <div className="w-full">
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse mx-auto"
      />
    </div>
  );
}

export default LoadingLogo;
