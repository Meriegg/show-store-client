"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Button onClick={() => console.log("Hello, World!")}>Hello there!</Button>
    </main>
  );
}
