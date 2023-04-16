import Link from "next/link";
import clsx from "clsx";

interface Props {
  links: { text: string; href: string; disabled?: boolean }[];
  containerClassName?: string;
  linkClassName?: string;
}

const LinkGroup = ({ links, containerClassName, linkClassName }: Props) => {
  return (
    <div className={clsx("font-semibold flex items-center gap-2", containerClassName)}>
      {links.map((link, idx) => (
        <>
          <Link
            href={link.href}
            key={idx}
            className="text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            {link.text}
          </Link>
          {idx < links.length - 1 && <p className="text-neutral-600">/</p>}
        </>
      ))}
    </div>
  );
};

export default LinkGroup;