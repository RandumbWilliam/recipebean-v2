import { Button } from "@/components/elements/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="block-hero">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-4xl text-center md:text-5xl lg:text-7xl md:text-left">
              The Ultimate Cooking App
            </h1>
            <p className="p-regular-18 text-center md:p-regular-20 lg:p-regular-24 md:text-left">
              Meet the all-in-one food app for recipe saving, meal planning,
              grocery shopping, and dietary details.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button size="large">Get Started</Button>
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
    </>
  );
}
