import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";
import { setToken } from "~/lib/session-store";
import { LoginSchema } from "~/validators/auth";

export default function Login() {
  const router = useRouter();

  const { mutate, isPending } = api.user.auth.login.useMutation({
    onSuccess: ({ sessionId }) => {
      setToken(sessionId);
      router.replace("/");
    },
  });

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <>
      <Controller
        control={control}
        name="username"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            textContentType="username"
            className="w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            className="w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Button
        className="w-full"
        onPress={handleSubmit((data) => mutate(data))}
        disabled={isPending}
      >
        <Text>Login</Text>
      </Button>
    </>
  );
}
