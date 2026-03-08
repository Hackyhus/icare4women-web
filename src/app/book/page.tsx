"use client";

import dynamic from "next/dynamic";

const BookClient = dynamic(() => import("./BookClient"), {
  ssr: false,
});

export default function BookPage() {
  return <BookClient />;
}
