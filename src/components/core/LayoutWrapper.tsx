"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/core/Footer";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken);
    }
  }, []);

  // useEffect(() => {
  //   if (token && pathname.startsWith("/auth")) {
  //     router.push("/"); 
  //   }
  //   if (!token && !pathname.startsWith("/auth")) {
  //     router.push("/auth/login");
  //   }
  // }, [token, pathname, router]);

  const isAuthRoute = pathname.startsWith("/auth");
  const isStoryViewer = pathname.startsWith("/storyviewer");

  return (
    <Provider store={store}>
      {!(isAuthRoute || isStoryViewer) && <Header />}
      {children}
      {!(isAuthRoute || isStoryViewer) && <Footer />}
    </Provider>
  );
}
