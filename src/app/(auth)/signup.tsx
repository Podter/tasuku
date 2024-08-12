// TODO: implement keyboard avoiding view

import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Back from "~/components/back";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";
import { setToken } from "~/lib/session-store";
import { SignUpSchema } from "~/validators/auth";

export default function SignUp() {
  const router = useRouter();

  const { mutate, isPending } = api.user.auth.signup.useMutation({
    onSuccess: async ({ sessionId }) => {
      await setToken(sessionId);
      router.replace("/");
    },
  });

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Back className="absolute left-2 top-2 hidden sm:flex" />
      <View className="h-full w-full flex-1 flex-col justify-between p-4 sm:max-h-[478px] sm:max-w-md sm:justify-center sm:rounded-3xl sm:border sm:border-border sm:p-6">
        <View className="gap-6">
          <View className="items-center gap-2 text-center">
            <Text className="text-3xl font-bold">Create an account</Text>
            <Text className="text-muted-foreground">
              Enter your details below to create your account
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
                    textContentType="newPassword"
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
            <View className="gap-2">
              <Label nativeID="password-confirm">Confirm password</Label>
              <Controller
                control={control}
                name="passwordConfirm"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Confirm your password"
                    textContentType="newPassword"
                    secureTextEntry
                    className="w-full"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    aria-labelledby="password-confirm"
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
            <Text>Sign up</Text>
          </Button>
          <Link href="/login" asChild>
            <Button className="w-full" variant="ghost">
              <Text>Aready have an account? Login</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
