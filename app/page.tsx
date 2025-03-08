import BlogPostCard from "@/components/general/BlogpostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";

async function getData() {
 // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });

  return data;
}

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>
      <Suspense fallback={<p>Loading....</p>}>
        <BlogPost />
      </Suspense>
    </div>
  );
}

async function BlogPost() {
  const data = await getData();
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}
