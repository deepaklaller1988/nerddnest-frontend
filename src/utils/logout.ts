import { useApi } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

export const LogoutUser =  () => {
  const { API } = useApi();
  const router = useRouter();

  try {
   const a=async()=>{
    await API.get("auth/logout");
    localStorage.clear();
    router.push("/auth/login");
   } 
   a()
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
