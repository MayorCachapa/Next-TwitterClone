import React from "react";
import NewTweetForm from "~/components/NewTweetForm";


export default function Home() {
  return (
    <>
    <header className="sticky top-o z-10 border-b pt-2">
      <h1 className="mb-2 px-2 text-lg font-bold">Home</h1>
    </header>
    <NewTweetForm />
    </>
  );
}