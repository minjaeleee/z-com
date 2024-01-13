'use client';

import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import FollowRecommend from "./FollowRecommend";

export default function FollowRecommendSection() {
  const session = useSession();
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분
    gcTime: 300* 10000,
  })

  return data?.map(
    (user) => <FollowRecommend
        user={user}
        key={user.id}
      />
    )
}