import clsx from "clsx";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <div
      className={clsx(
        "w-full",
        "border-t",
        "border-opacity-25",
        "border-t-gruvbox-gray_245",
        "bottom-0",
      )}
    >
      <div className="container max-w-3xl mx-auto flex flex-nowrap p-2 py-4 justify-between">
        <div className="w-1/2 text-left px-3 font-normal text-xs">
          manuel.grv {new Date().getFullYear()}
        </div>
        <div className="w-1/2 flex flex-nowrap justify-end px-3">
          <div className="flex flex-nowrap space-x-4">
            <Link href="https://www.github.com/manuelgrv" target="_blank">
              <GithubIcon size={16} />
            </Link>
            <Link href="https://www.linkedin.com/in/mgrv" target="_blank">
              <LinkedinIcon size={16} />
            </Link>
            <Link href="https://www.x.com/grv0x" target="_blank">
              <TwitterIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
