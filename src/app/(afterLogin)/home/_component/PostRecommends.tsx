'use client'

import { Fragment } from "react";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../../_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2:string], number>({ 
    queryKey: ['posts', 'recommends'], 
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale 변경되는 시간
    gcTime: 300 * 1000 // inactive일 때, 메모리를 비우는 시간. 보통 staleTime 보다 길어야 한다.
  })

  return data?.pages.map((page, i) => (
    <Fragment key={i}>
      {
        page.map((post) => <Post key={post.postId} post={post}/>)
      }
    </Fragment>
  ))
}