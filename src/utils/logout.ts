import { useApi } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {
  const { API } = useApi();
  const router = useRouter();

  const logout = async () => {
    try {
      await API.get("auth/logout");
      typeof window !== "undefined" && localStorage.clear();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};