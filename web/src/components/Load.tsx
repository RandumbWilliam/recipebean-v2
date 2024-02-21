import Logo from "./ui/Logo";
import Spinner from "./ui/Spinner";

const Load = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4">
      <Spinner />
      <Logo />
    </div>
  );
};

export default Load;
