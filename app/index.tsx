import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Redirect to login page on mount
    router.replace("/login");
  }, []);

  return null;
}
