"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Avatar() {
  return (
    <DotLottieReact
      className="text-left pb-4"
      src="grv.lottie"
      loop
      speed={0.5}
      autoplay
      width="60"
      height="60"
    />
  );
}
