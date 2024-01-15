'use client'

import { useQuery } from "@tanstack/react-query";

import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";

import styles from '@/app/(afterLogin)/home/home.module.css';  


export default function FollowingPosts() {
  const { data, isPending } = useQuery<IPost[]>({ 
    queryKey: ['posts', 'followings'], 
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale 변경되는 시간
    gcTime: 300 * 1000 // inactive일 때, 메모리를 비우는 시간. 보통 staleTime 보다 길어야 한다.
  })

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

  return data?.map((post) => (
    <Post key={post.postId} post={post}/>
  ))
}