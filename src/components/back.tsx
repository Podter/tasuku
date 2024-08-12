import { useRouter } from "expo-router";

import { ArrowLeft } from "./icons/arrow-left";
import { Button } from "./ui/button";

interface BackProps {
  className?: string;
}

export default function Back({ className }: BackProps) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onPress={() => router.back()}
    >
      <ArrowLeft className="text-foreground" size={24} />
    </Button>
  );
}
