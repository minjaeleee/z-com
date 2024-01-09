'use client'

import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({ queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
  console.log("data",data)

  return data?.map((post) => (
    <Post key={post.postId} post={post}/>
  ))
}