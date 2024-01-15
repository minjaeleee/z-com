'use client'

import { Fragment, useEffect } from "react";
import { InfiniteData, useInfiniteQuery, useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../../_lib/getPostRecommends";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2:string], number>({ 
    queryKey: ['posts', 'recommends'], 
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale 변경되는 시간
    gcTime: 300 * 1000 // inactive일 때, 메모리를 비우는 시간. 보통 staleTime 보다 길어야 한다.
  })

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  })

  useEffect(()=>{
    if(inView) {
     !isFetching && hasNextPage && fetchNextPage()
    }
  },[inView, hasNextPage, fetchNextPage, isFetching])

  return data?.pages.map((page, i) => (
    <>
      {
        data?.pages.map((page,i) => (
          <Fragment key={i}>
            {
              page.map((post) => <Post key={post.postId} post={post}/>)
            }
          </Fragment>
        ))
      }
      <div ref={ref} style={{ height: 50 }} />
    </>
  ))
}