'use client'

import { Fragment, useEffect } from "react";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../../_lib/getPostRecommends";
import { useInView } from "react-intersection-observer";

import styles from '@/app/(afterLogin)/home/home.module.css';

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2:string], number>({ 
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

  if (isPending) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <svg className={styles.loader} height="100%" viewBox="0 0 32 32" width={40}>
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"
                  style={{stroke: 'rgb(29, 155, 240)', opacity: 0.2}}></circle>
          <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"
                  style={{stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60}}></circle>
        </svg>
      </div>
    )
  }

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