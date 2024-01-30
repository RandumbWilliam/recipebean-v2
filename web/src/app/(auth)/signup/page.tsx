import Link from "next/link";
import Sidebar from "../components/Sidebar";
import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  return (
    <>
      <Sidebar
        className="hidden lg:flex"
        imageSrc="/signup.svg"
        text="Sign up to save your recipes, make meal plans, and more."
      />
      <div className="flex flex-1 items-center justify-center 2xl:justify-start">
        <div className="px-14 py-7 w-full max-w-md 2xl:ml-28">
          <h2 className="text-2xl font-medium mb-6">Sign up to Recipebean</h2>
          <SignUpForm />
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-brink-pink-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
