import { Container } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-lg sm:text-2xl font-bold">
          404 - Nothing to see here
        </h1>
        <Image src="/cheems-notfound.gif" alt="bonk" width={300} height={300} />
        <Link href="/">
          <button className="rounded bg-gruvbox-dark3 px-6 py-3 text-white transition-colors duration-200 hover:bg-gruvbox-faded_orange">
            Go back home
          </button>
        </Link>
      </div>
    </Container>
  );
}
