"use client";
import { Container } from "@/components";

export default function YoutubeVideo({ id }: { id: string }) {
  return (
    <Container>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="Youtube video player"
        allowFullScreen
        style={{ border: 0 }}
        className="my-4"
      />
    </Container>
  );
}
