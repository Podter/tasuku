import { useEffect } from "react";
import { useRouter } from "expo-router";

interface RedirectProps {
  to: string;
}

// idk why expo router's Redirect component throw an error
// about useFocusEffect context not found, so I made my own
export default function Redirect({ to }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    try {
      router.replace(to);
    } catch (error) {
      console.error(error);
    }
  }, [router, to]);

  return null;
}
