import { Post } from "@/components/cards";
import { Header } from "@/components/shared";
import { getPosts } from "@/lib/actions/Post";
import { Suspense } from "react";

export default async function Home() {

  const {posts} = await getPosts();

  return (
    <div className="flex w-full flex-grow">
      <Header title="Home" />

      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense fallback="loading...">
          {posts && posts.length > 0 && 
          posts.map((post) => (
            <Post data={post} key={post.id}/>
          ))
          }
        </Suspense>
      </div>
    </div>
  );
}
