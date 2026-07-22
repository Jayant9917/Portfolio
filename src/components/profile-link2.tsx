import React from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandBehance, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { MailOpen } from "lucide-react";

export const ProfileLinks = () => {
  return (
      <div className="flex items-center border-neutral-100 pt-6 dark:border-neutral-800">
        {/* <p className="text-xs text-neutral-500 dark:text-neutral-400">Built with love by Jayant Pratap Singh</p> */}

        {/* Profile Links */}
        {/* mail */}
        <div className="justify-left flex items-center gap-4">
          <Link href="https://github.com/Jayant9917">
            <MailOpen className="size-5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400" />
          </Link>
          {/* Calendly */}
          <Link
            href="https://github.com/Jayant9917"
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M19.655 14.262c0.281 0 0.557 0.023 0.828 0.064 0 0.005 -0.005 0.01 -0.005 0.014 -0.105 0.267 -0.234 0.534 -0.381 0.786l-1.219 2.106c-1.112 1.936 -3.177 3.127 -5.411 3.127h-2.432c-2.23 0 -4.294 -1.191 -5.412 -3.127l-1.218 -2.106a6.251 6.251 0 0 1 0 -6.252l1.218 -2.106C6.736 4.832 8.8 3.641 11.035 3.641h2.432c2.23 0 4.294 1.191 5.411 3.127l1.219 2.106c0.147 0.252 0.271 0.519 0.381 0.786 0 0.004 0.005 0.009 0.005 0.014 -0.267 0.041 -0.543 0.064 -0.828 0.064 -1.816 0 -2.501 -0.607 -3.291 -1.306 -0.764 -0.676 -1.711 -1.517 -3.44 -1.517h-1.029c-1.251 0 -2.387 0.455 -3.2 1.278 -0.796 0.805 -1.233 1.904 -1.233 3.099v1.411c0 1.196 0.437 2.295 1.233 3.099 0.813 0.823 1.949 1.278 3.2 1.278h1.034c1.729 0 2.676 -0.841 3.439 -1.517 0.791 -0.703 1.471 -1.306 3.287 -1.301Zm0.005 -3.237c0.399 0 0.794 -0.036 1.179 -0.11 -0.002 -0.004 -0.002 -0.01 -0.002 -0.014 -0.073 -0.414 -0.193 -0.823 -0.349 -1.218 0.731 -0.12 1.407 -0.396 1.986 -0.819 0 -0.004 -0.005 -0.013 -0.005 -0.018 -0.331 -1.085 -0.832 -2.101 -1.489 -3.03 -0.649 -0.915 -1.435 -1.719 -2.331 -2.395 -1.867 -1.398 -4.088 -2.138 -6.428 -2.138 -1.448 0 -2.855 0.28 -4.175 0.841 -1.273 0.543 -2.423 1.315 -3.407 2.299S2.878 6.552 2.341 7.83c-0.557 1.324 -0.842 2.726 -0.842 4.175 0 1.448 0.281 2.855 0.842 4.174 0.542 1.274 1.314 2.423 2.298 3.407s2.129 1.761 3.407 2.299c1.324 0.556 2.727 0.841 4.175 0.841 2.34 0 4.561 -0.74 6.428 -2.137a10.815 10.815 0 0 0 2.331 -2.396c0.652 -0.929 1.158 -1.949 1.489 -3.03 0 -0.004 0.005 -0.014 0.005 -0.018 -0.579 -0.423 -1.255 -0.699 -1.986 -0.819 0.161 -0.395 0.276 -0.804 0.349 -1.218 0.005 -0.009 0.005 -0.014 0.005 -0.023 0.869 0.166 1.692 0.506 2.404 1.035 0.685 0.505 0.552 1.075 0.446 1.416C22.184 20.437 17.619 24 12.221 24c-6.625 0 -12 -5.375 -12 -12s5.37 -12 12 -12c5.398 0 9.963 3.563 11.471 8.464 0.106 0.341 0.239 0.915 -0.446 1.421 -0.717 0.529 -1.535 0.873 -2.404 1.034 0.128 0.716 0.128 1.45 0 2.166 -0.387 -0.074 -0.782 -0.11 -1.182 -0.11 -4.184 0 -3.968 2.823 -6.736 2.823h-1.029c-1.899 0 -3.15 -1.357 -3.15 -3.095v-1.411c0 -1.738 1.251 -3.094 3.15 -3.094h1.034c2.768 0 2.552 2.823 6.731 2.827Z" />
            </svg>
          </Link>
          {/* Github */}
          <Link href="https://github.com/Jayant9917">
            <IconBrandGithub className="size-5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400" />
          </Link>
          {/* LinkedIn */}
          <Link href="https://www.linkedin.com/in/jayant-pratap-singh/">
            <IconBrandLinkedin className="size-5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400" />
          </Link>
          {/* X */}
          <Link href="https://github.com/Jayant9917">
            <IconBrandX className="size-5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400" />
          </Link>
          {/* Behance */}
          <Link href="https://github.com/Jayant9917">
            <IconBrandBehance className="size-5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400" />
          </Link>
          {/* Hire Me */}
          {/* <Link
            href="https://github.com/Jayant9917"
            className="group relative ml-4 flex items-center gap-2 rounded-full bg-neutral-200 px-4 py-1.5 pr-4 pl-3 text-sm font-medium text-secondary transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Hire Me
          </Link> */}
          {/* Medium */}
          {/* <Link
            href="https://medium.com/@ranajayant527"
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor">
              <path d="M9.025 8c0 2.485 -2.02 4.5 -4.513 4.5A4.506 4.506 0 0 1 0 8c0 -2.486 2.02 -4.5 4.512 -4.5A4.506 4.506 0 0 1 9.025 8m4.95 0c0 2.34 -1.01 4.236 -2.256 4.236S9.463 10.339 9.463 8c0 -2.34 1.01 -4.236 2.256 -4.236S13.975 5.661 13.975 8M16 8c0 2.096 -0.355 3.795 -0.794 3.795 -0.438 0 -0.793 -1.7 -0.793 -3.795 0 -2.096 0.355 -3.795 0.794 -3.795 0.438 0 0.793 1.699 0.793 3.795" />
            </svg>
          </Link> */}
        </div>
      </div>
    
  );
};
