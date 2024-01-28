import { Button } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Label } from "@/components/elements/Label";
import { IconGoogle } from "@/components/icons";
import Link from "next/link";
import { TextField } from "react-aria-components";
import Sidebar from "../components/Sidebar";

const Signin = () => {
  return (
    <>
      <Sidebar
        className="hidden lg:flex"
        imageSrc="/signin.svg"
        text="Welcome back!"
      />
      <div className="flex flex-1 items-center justify-center 2xl:justify-start">
        <div className="px-14 py-7 w-full max-w-md 2xl:ml-28">
          <h2 className="text-2xl font-medium mb-6">Sign in to Recipebean</h2>
          <form className="flex flex-col gap-6">
            <TextField>
              <Label>Email</Label>
              <Input type="email" />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <Input type="password" />
            </TextField>
            <div className="flex flex-col mt-5">
              <Button type="submit">Sign In</Button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <Button
                type="submit"
                className="bg-rich-black-500 hover:bg-rich-black-700"
              >
                <span className="flex items-center gap-2">
                  <IconGoogle className="h-4 w-4" />
                  <p>Sign In with Google</p>
                </span>
              </Button>
            </div>
          </form>
          <p className="text-center mt-5 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brink-pink-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
