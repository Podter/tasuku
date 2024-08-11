import { Link } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Auth() {
  return (
    <>
      <Link href="/signup" asChild>
        <Button className="w-full">
          <Text>Sign up</Text>
        </Button>
      </Link>
      <Link href="/login" asChild>
        <Button className="w-full" variant="secondary">
          <Text>Login</Text>
        </Button>
      </Link>
    </>
  );
}
