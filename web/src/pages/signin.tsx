import { urqlClient } from "@/utils/urqlClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSignInMutation } from "@/graphql/hooks";

import AuthSidebar from "@/components/AuthSidebar";
import { IconError, IconGoogle } from "@/components/icons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth";
import { useRouter } from "next/router";
import { TextField } from "react-aria-components";

const validationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserData = z.infer<typeof validationSchema>;

const Signin = () => {
  const router = useRouter();

  const [, signin] = useSignInMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm<UserData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
    mode: "onBlur",
  });

  const onSubmit = async (data: UserData) => {
    setLoading(true);
    const result = await signin(data);

    if (result.data?.signin) {
      router.push("/dashboard");
    }

    if (result.error) {
      setError(result.error.graphQLErrors[0].message);
    }
    setLoading(false);
  };

  const clearErrors = () => {
    setError("");
  };

  return (
    <AuthLayout>
      <AuthSidebar
        className="hidden lg:flex"
        imageSrc="/signin.svg"
        text="Welcome Back!"
      />
      <div className="flex flex-1 items-center justify-center 2xl:justify-start">
        <div className="px-14 py-7 w-full max-w-md 2xl:ml-28">
          <h2 className="text-2xl font-medium mb-6">Sign in to Recipebean</h2>
          {error && (
            <Alert variant="destructive" className="mb-3">
              <IconError className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <TextField>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email", { onChange: clearErrors })}
              />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <PasswordInput
                placeholder="Password"
                {...register("password", { onChange: clearErrors })}
              />
            </TextField>
            <div className="flex flex-col mt-5">
              <Button type="submit" loading={loading}>
                Log In
              </Button>
            </div>
          </form>
          <p className="text-center mt-5 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default withUrqlClient(urqlClient)(Signin);
