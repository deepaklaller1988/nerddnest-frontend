import React from "react";
import Image from "next/image";

const ConnectionItem = ({ name, status, imageUrl }: any) => {
  return (
    <section className="cursor-pointer flex items-center gap-2">
      <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
        <Image
          quality={40}
          height={60}
          width={60}
          className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
          src={imageUrl?imageUrl: "/logo.png"}
          alt="logo"
        />
      </span>
      <span>
        <h6 className="text-white">{name}</h6>
        <p className="text-[13px]">{status}</p>
      </span>
    </section>
  );
};

export default ConnectionItem;
