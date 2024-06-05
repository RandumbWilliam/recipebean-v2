import { randomEnum } from "@/utils/randomEnum";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useState } from "react";

import { useSignUpMutation } from "@/graphql/hooks";
import { UserAvatar } from "@/graphql/types";

import AuthSidebar from "@/components/AuthSidebar";
import { IconGoogle } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import AuthLayout from "@/layouts/auth";
import { useRouter } from "next/router";
import { TextField } from "react-aria-components";

const initialUserData = {
  fullName: "",
  email: "",
  password: "",
  avatarId: randomEnum(UserAvatar),
};

const Signup = () => {
  const router = useRouter();

  const [, signup] = useSignUpMutation();
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signup({ userData });

      if (result.data?.signup) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <AuthSidebar
        className="hidden lg:flex"
        imageSrc="/signup.svg"
        text="Sign up to save your recipes, make meal plans, and more."
      />
      <div className="flex flex-1 items-center justify-center 2xl:justify-start">
        <div className="px-14 py-7 w-full max-w-md 2xl:ml-28">
          <h2 className="text-2xl font-medium mb-6">Sign up to Recipebean</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField>
              <Label>Full Name</Label>
              <Input
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
              />
            </TextField>
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
              <Button type="submit">Create Account</Button>
            </div>
          </form>
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default withUrqlClient(urqlClient)(Signup);
