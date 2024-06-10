import { randomEnum } from "@/utils/randomEnum";
import { urqlClient } from "@/utils/urqlClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useSignUpMutation } from "@/graphql/hooks";
import { UserAvatar } from "@/graphql/types";

import AuthSidebar from "@/components/AuthSidebar";
import PasswordRequirements from "@/components/PasswordRequirements";
import { IconGoogle } from "@/components/icons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { TextField } from "react-aria-components";

const Signup = () => {
  const router = useRouter();

  const [, signup] = useSignUpMutation();
  const [showPasswordRequirement, setShowPasswordRequirement] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = z.object({
    fullName: z.string().trim().min(1),
    email: z.string().email().min(1),
    password: z
      .string()
      .min(1)
      .refine(
        () => {
          return isPasswordValid;
        },
        {
          message: "Password does not meet the requirements.",
        }
      ),
  });

  type UserData = z.infer<typeof validationSchema>;

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
    mode: "onBlur",
  });

  const handlePasswordValidationChange = useCallback((isValid: boolean) => {
    setIsPasswordValid(isValid);
  }, []);

  const onSubmit = async (data: UserData) => {
    setLoading(true);
    try {
      const userData = {
        ...data,
        avatarId: randomEnum(UserAvatar),
      };

      const result = await signup({ userData });

      if (result.data?.signup) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-6">
              <TextField>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
                <p>{errors.fullName?.message}</p>
              </TextField>
              <TextField>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <p>{errors.email?.message}</p>
              </TextField>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField>
                    <Label>Password</Label>
                    <PasswordInput
                      placeholder="Password"
                      onChange={(e) => {
                        setShowPasswordRequirement(true);
                        onChange(e.target.value);
                      }}
                      value={value}
                    />
                    <p>{error && error.message}</p>
                    {showPasswordRequirement && (
                      <PasswordRequirements
                        password={getValues("password")}
                        className="p-2"
                        onValidateChange={handlePasswordValidationChange}
                      />
                    )}
                  </TextField>
                )}
              />
            </div>
            <div
              className={cn(
                !showPasswordRequirement && "mt-5",
                "flex flex-col"
              )}
            >
              <Button type="submit" loading={loading}>
                Create Account
              </Button>
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
