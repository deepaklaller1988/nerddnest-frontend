import React from "react";

interface ConnectionItemProps {
  name: string;
  status: string;
  imageUrl: string;
}

const ConnectionItem = ({ name, status, imageUrl }: ConnectionItemProps) => {
  return (
    <section className="cursor-pointer flex items-center gap-2">
      <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
        <img
          className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
          src={imageUrl}
          alt="logo"
        />
      </span>
      <span>
        <h6 className="text-[var(--highlight)]">{name}</h6>
        <p className="text-[13px] text-gray-500/50">{status}</p>
      </span>
    </section>
  );
};

export default ConnectionItem;
