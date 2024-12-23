"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/core/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
