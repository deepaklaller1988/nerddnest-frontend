import { useApi } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

export const logoutUser = async (): Promise<void> => {
  const { API } = useApi();
  const router = useRouter();

  try {
    await API.get("auth/logout");
    localStorage.clear();
    router.push("/auth/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
