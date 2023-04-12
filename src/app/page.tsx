"use client";
import Marquee from "react-fast-marquee";
import Button from "@/components/Button";
import EditableText from "@/components/demo/EditableText";
import Footer from "@/components/application/Footer";
import SubscribeToNewsletter from "@/components/application/SubscribeToNewsletter";
import clsx from "clsx";

export default function Home() {
  return (
    <main>
      <svg
        width="1343"
        height="987"
        viewBox="0 0 1343 987"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed",
          opacity: "0",
          top: "0",
          left: "0",
          transform: "scale(0)",
        }}
      >
        <clipPath id="imageClip">
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 790.805 20.1467)"
            fill="black"
          />
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 1130.47 20.1467)"
            fill="black"
          />
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 1470.13 20.1467)"
            fill="black"
          />
        </clipPath>
      </svg>
      <section
        id="hero"
        className="sectionPadding w-full max-h-[100vh] min-h-[86vh] overflow-y-hidden relative !pb-0 !mb-0"
      >
        <div className="absolute top-36 w-[100vh] transform z-0 translate-x-1/3 -rotate-[90deg] flex flex-col gap-4">
          {Array.from(new Array(5)).map((_, idx) => (
            <Marquee key={idx} direction="left" gradient={true} speed={0.25 * Math.random()}>
              {Array.from(new Array(20)).map((_, idx) => (
                <p key={idx} className="text-neutral-900 opacity-30 font-semibold px-1">
                  BEST SHOES{" "}
                </p>
              ))}
            </Marquee>
          ))}
        </div>
        <div className="w-fit flex flex-col gap-4 relative z-20">
          <div className="flex flex-col gap-4">
            <EditableText
              storageKey="HERO_MAIN_TITLE"
              as="h1"
              className="text-5xl font-semibold max-w-[350px]"
            >
              Just Perfect
            </EditableText>
            <EditableText
              inputType="textarea"
              storageKey="HERO_MAIN_DESCRIPTION"
              className="font-semibold text-base max-w-[400px]"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sit distinctio vel quia
              corporis quod?
            </EditableText>
          </div>
          <div className="w-fit flex flex-col gap-4">
            <hr />
            <div className="flex items-center gap-2 w-fit">
              <Button>Shop now!</Button>
              <Button variant="ghost">Contact us</Button>
            </div>
          </div>
        </div>

        <div
          className="absolute z-10 -top-10 right-0 lg:-right-96 sm:hidden max-h-[100vh] h-[100vh]"
          style={{
            backgroundImage: "linear-gradient(0deg, #000 15%, transparent), url(/HeroShoe.png)",
            clipPath: "url(#imageClip)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "2 / 1",
          }}
        ></div>
      </section>
      <section
        id="about"
        className="border-y-[1px] border-black py-36 flex flex-col items-center relative h-[100vh] overflow-x-hidden max-w-[100vw]"
      >
        <div className="h-full w-0.5 bg-black absolute right-1/3 top-0 lg:right-32 sm:hidden"></div>
        <p className="text-[96px] md:text-6xl font-bold text-neutral-200 absolute -left-20 bottom-6">
          OUR
          <br /> BRAND
        </p>
        <p className="text-[96px] md:text-6xl font-bold text-neutral-200 absolute -right-24 top-12">
          OUR
          <br /> BRAND
        </p>

        <div className="flex flex-col items-start">
          <EditableText as="h1" storageKey="ABOUT_TITLE" className="text-4xl font-semibold">
            Our Brand
          </EditableText>
          <div className="h-[4px] bg-black w-[60px]"></div>
        </div>

        <div className="flex flex-col justify-start items-start sectionPadding w-full">
          <div className="flex items-center gap-4">
            <EditableText
              storageKey="ABOUT_SUBTITLE"
              showOnHover={true}
              as="h2"
              className="font-bold text-lg"
            >
              How We Started
            </EditableText>
            <p className="text-6xl text-neutral-200 font-bold">?</p>
          </div>
          <EditableText
            storageKey="ABOUT_DESCRIPTION"
            className="font-semibold max-w-[650px] text-neutral-700"
            inputType="textarea"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem sequi iste saepe
            ratione laudantium fuga nemo eius aliquam quae. Ipsa alias earum numquam, eligendi in
            velit debitis libero excepturi voluptatem et temporibus cupiditate rerum exercitationem
            vel ex? Asperiores, laboriosam impedit?
          </EditableText>
        </div>
      </section>
      <section
        id="explore"
        className="border-b-[1px] border-black sectionPadding flex flex-col items-start justify-center h-[100vh]"
      >
        <EditableText className="font-bold text-4xl" allowHTML>
          You Explore.
          <br /> We deliver
        </EditableText>

        <Marquee direction="right" className="mt-8">
          {Array.from(new Array(10)).map((_, idx) => (
            <div
              className={clsx(
                "px-14 py-4 flex items-center justify-center border-r border-y border-black",
                idx === 0 && "border-l"
              )}
            >
              <p>Item</p>
            </div>
          ))}
        </Marquee>
        <p className="w-full text-right font-semibold text-sm text-neutral-600 mt-4">
          Items modifiable in Admin Panel!
        </p>
      </section>
      <section
        id="newsletter"
        className="flex relative flex-col items-center sectionPadding !pt-16 gap-6 border-b-[1px] border-black !pb-36"
      >
        <div className="h-[100vh] absolute top-0 w-[1px] bg-black left-48"></div>
        <EditableText as="h1" className="text-5xl font-bold">
          Subscribe to our newsletter
        </EditableText>
        <EditableText className="text-base font-bold">
          We will email you for every new product and sale we have!
        </EditableText>

        <SubscribeToNewsletter />
      </section>

      <div className="w-full flex justify-center mt-12">
        <Footer />
      </div>
    </main>
  );
}
