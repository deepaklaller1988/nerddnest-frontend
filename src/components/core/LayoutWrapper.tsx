"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { store } from '../../app/redux/store'
import { Provider } from 'react-redux'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <>
    <Provider store={store}>
      {!isAuthRoute && <Header />}
      {children}
      {!isAuthRoute && <Footer />}
      </Provider>
    </>
  );
}
