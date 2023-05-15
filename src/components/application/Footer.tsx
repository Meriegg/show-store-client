import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="flex flex-col items-center w-fit gap-1 mb-4">
      <p className="font-semibold text-sm text-neutral-600">
        Site designed and developed by{" "}
        <a href="https://mariodev.vercel.app" className="text-black underline">
          MarioDev
        </a>
      </p>
      <p className="font-semibold text-sm text-neutral-600">&copy; 2023 All rights reserved.</p>
      <div className="h-[1px] w-full bg-neutral-300"></div>
      <div className="flex gap-4 justify-center items-center w-full px-2">
        <a
          href="mailto://mario.developer.contact@gmail.com"
          className="text-lg text-neutral-600 hover:text-neutral-900"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a
          href="https://github.com/Meriegg"
          className="text-lg text-neutral-600 hover:text-neutral-900"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://www.instagram.com/meriofrog/"
          className="text-lg text-neutral-600 hover:text-neutral-900"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <div className="h-full border-l-[2px] border-neutral-300"></div>
        <a
          href="https://www.freepik.com/free-vector/military-knife-template_8136751.htm#query=knife%20svg&position=0&from_view=keyword&track=ais"
          className="text-sm font-semibold text-neutral-600"
        >
          Knife image by dgim-studio on Freepik
        </a>
      </div>

      {/* <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-neutral-600 font-semibold text-sm">Technologies Used</p>
        <div className="flex flex-col gap-3 items-center">
          <a
            href="https://nextjs.org/"
            className="text-lg hover:opacity-70 transition-all duration-300"
            title="Next.js"
          >
            <img src="/Nextjs-logo.svg" className="w-auto h-[15px]" />
          </a>
          <a
            href="https://tailwindcss.com"
            className="text-lg hover:opacity-70 transition-all duration-300"
            title="Tailwind css"
          >
            <img src="/tailwindcss-logotype.svg" className="w-auto h-[15px]" />
          </a>
          <a
            href="https://trpc.io/"
            className="text-lg hover:opacity-70 transition-all duration-300"
            title="tRPC"
          >
            <img src="/trpc-logo.svg" className="w-auto h-[30px]" />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
