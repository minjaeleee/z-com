import { Suspense } from 'react';

import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabProvider from './_component/TabProvider';
import TabDeciderSuspense from '../_component/TabDeciderSuspense';
import Loading from './loading';
import { auth } from '@/auth';

import styles from './home.module.css'

export default async function Home() {
  const session = await auth();

  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab/>
        <PostForm me={session}/>
        <Suspense fallback={<Loading/>}>
          <TabDeciderSuspense/>
        </Suspense>
      </TabProvider>
    </main>
  )
}