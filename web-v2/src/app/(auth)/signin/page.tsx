import Link from "next/link";
import Sidebar from "../components/Sidebar";
import SignInForm from "../components/SignInForm";

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
          <SignInForm />
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
