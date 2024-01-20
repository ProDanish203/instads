import { Post } from "@/components/cards";
import { Header } from "@/components/shared";
import { Suspense } from "react";

export default function Home() {

  return (
    <div className="flex w-full flex-grow">
      <Header title="Home" />

      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense fallback="loading...">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </Suspense>
      </div>
    </div>
  );
}
