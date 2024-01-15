import { Suspense } from 'react';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabProvider from './_component/TabProvider';
import PostRecommends from './_component/PostRecommends';
import TabDeciderSuspense from '../_component/TabDeciderSuspense';

import styles from './home.module.css'
import Loading from './loading';

export default async function Home() {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab/>
        <PostForm/>
        <Suspense fallback={<Loading/>}>
          <TabDeciderSuspense/>
        </Suspense>
      </TabProvider>
    </main>
  )
}