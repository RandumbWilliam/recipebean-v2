import Sidebar from "../components/Sidebar";

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
          <h2 className="text-2xl font-medium">Sign up to Recipebean</h2>
          <form className="flex flex-col">
            <input
              className="border border-black"
              type="text"
              name="fullName"
            />
            <input className="border border-black" type="email" name="email" />
            <input
              className="border border-black"
              type="password"
              name="password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
