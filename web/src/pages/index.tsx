import { buttonVariants } from "@/components/ui/button";
import DefaultLayout from "@/layouts/default";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <DefaultLayout>
      <section className="pt-[60px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-4xl text-center md:text-5xl lg:text-7xl md:text-left">
              The Ultimate Cooking App
            </h1>
            <p className="text-center text-sm md:text-start md:text=lg lg:text-xl">
              Meet the all-in-one food app for recipe saving, meal planning,
              grocery shopping, and dietary details.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                className={cn(buttonVariants({ size: "lg" }))}
                href="/signup"
              >
                Get Started
              </Link>
            </div>
          </div>

          <Image
            src="/hero.svg"
            alt="hero"
            width={1000}
            height={1000}
            priority
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
