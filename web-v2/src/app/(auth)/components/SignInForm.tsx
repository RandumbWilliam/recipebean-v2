"use client";

import { Button } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Label } from "@/components/elements/Label";
import { IconGoogle } from "@/components/icons";
import { useSignInMutation } from "@/graphql/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "react-aria-components";

const initialUserData = {
  email: "",
  password: "",
};

const SignInForm = () => {
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
      console.log(result.data?.signin);
    }
  };

  return (
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
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button
          type="submit"
          className="bg-rich-black-500 hover:bg-rich-black-700"
        >
          <span className="flex items-center gap-2">
            <IconGoogle className="h-4 w-4" />
            <p>Continue with Google</p>
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
