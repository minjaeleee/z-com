import styles from './home.module.css'
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import PostRecommends from '@/app/(afterLogin)/_component/PostRecommends';
import { getPostRecommends } from '../_lib/getPostRecommends';
import TabProvider from './_component/TabProvider';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab/>
          <PostForm/>
          <PostRecommends/>
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}