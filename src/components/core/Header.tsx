import React from "react";
import Link from "next/link";
import Image from "next/image";

import MainSearchBar from "../SearchBar/MainSearchBar";
import HeaderButtons from "../Buttons/HeaderButtons";

export default function Header() {
  return (
    <div className="header w-full bg-[var(--highlght-hover)] sticky top-0 z-10">
      <section className="w-full max-w-[1230px] py-3 px-4 m-auto">
        <div className="flex w-full justify-between items-center">
          <section className="flex gap-4 items-center">
            <Link href="/home" className="w-12 h-12">
              <span className="rounded-full overflow-hidden block">
                <Image
                  alt="Logo"
                  height={100}
                  width={100}
                  className="w-full block h-full"
                  src="/logo1.png"
                />
              </span>
            </Link>
            <MainSearchBar />
          </section>
          <HeaderButtons />
        </div>
      </section>
    </div>
  );
}
