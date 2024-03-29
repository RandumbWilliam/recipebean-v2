"use client";

import { Button } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Label } from "@/components/elements/Label";
import { IconGoogle } from "@/components/icons";
import { UserAvatar } from "@/graphql/types";
import { randomEnum } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "react-aria-components";

import {
  SignUpDocument,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/graphql/operations";
import { getUrqlClient } from "@/lib/urql";

const { client } = getUrqlClient();

const initialUserData = {
  fullName: "",
  email: "",
  password: "",
  avatarId: randomEnum(UserAvatar),
};

const SignUpForm = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await client.mutation<
      SignUpMutation,
      SignUpMutationVariables
    >(SignUpDocument, { userData });

    if (result.data?.signup) {
      console.log(result.data.signup);
    }
  };

  return (
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
            <p>Sign up with Google</p>
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
