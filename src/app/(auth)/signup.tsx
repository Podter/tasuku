import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";

export default function Login() {
  return (
    <>
      <Input
        placeholder="Username"
        textContentType="username"
        className="w-full"
      />
      <Input
        placeholder="New password"
        textContentType="newPassword"
        secureTextEntry
        className="w-full"
      />
      <Input
        placeholder="Confirm password"
        textContentType="newPassword"
        secureTextEntry
        className="w-full"
      />
      <Button className="w-full">
        <Text>Sign up</Text>
      </Button>
    </>
  );
}
