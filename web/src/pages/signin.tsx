import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useState } from "react";

import { useSignInMutation } from "@/graphql/hooks";

import AuthSidebar from "@/components/AuthSidebar";
import { IconGoogle } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import AuthLayout from "@/layouts/auth";
import { useRouter } from "next/router";
import { TextField } from "react-aria-components";

const initialUserData = {
  email: "",
  password: "",
};

const Signin = () => {
  const router = useRouter();

  const [, signin] = useSignInMutation();
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signin(userData);

    if (result.data?.signin) {
      router.push("/dashboard");
    }
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="8+ characters"
                onChange={handleChange}
              />
            </TextField>
            <div className="flex flex-col mt-5">
              <Button type="submit">Log In</Button>
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
