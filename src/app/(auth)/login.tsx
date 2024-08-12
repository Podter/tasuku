import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";
import { setToken } from "~/lib/session-store";
import { LoginSchema } from "~/validators/auth";

export default function Login() {
  const router = useRouter();

  const { mutate, isPending } = api.user.auth.login.useMutation({
    onSuccess: async ({ sessionId }) => {
      await setToken(sessionId);
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
    <View className="flex-1 items-center justify-center">
      <View className="h-full w-full flex-1 flex-col justify-between p-4 sm:max-h-[400px] sm:max-w-md sm:justify-center sm:rounded-3xl sm:border sm:border-border sm:p-6">
        <View className="gap-6">
          <View className="items-center gap-2 text-center">
            <Text className="text-3xl font-bold">Sign in to your account</Text>
            <Text className="text-muted-foreground">
              Enter your details below to continue
            </Text>
          </View>
          <View className="gap-4">
            <View className="gap-2">
              <Label nativeID="username">Username</Label>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter your username"
                    textContentType="username"
                    className="w-full"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    aria-labelledby="username"
                  />
                )}
              />
            </View>
            <View className="gap-2">
              <Label nativeID="password">Password</Label>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter your password"
                    textContentType="password"
                    secureTextEntry
                    className="w-full"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    aria-labelledby="password"
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View className="mt-6 gap-4">
          <Button
            className="w-full"
            onPress={handleSubmit((data) => mutate(data))}
            disabled={isPending}
          >
            <Text>Login</Text>
          </Button>
          <Link href="/signup" asChild>
            <Button className="w-full" variant="ghost">
              <Text>Don't have an account? Sign up</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
