import { useRouter } from "expo-router";

import { ArrowLeft } from "./icons/arrow-left";
import { Button } from "./ui/button";

interface BackProps {
  className?: string;
  onPress?: () => void;
}

export default function Back({ className, onPress }: BackProps) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onPress={onPress ? onPress : () => router.back()}
    >
      <ArrowLeft className="text-foreground" size={24} />
    </Button>
  );
}
