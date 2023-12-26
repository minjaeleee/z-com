import Link from 'next/link';
import styles from './layout.module.css'
import Image from 'next/image';
import ZLogo from '../../../public/zlogo.png';
import RightSearchZone from './_component/RightSearchZone';
import NavMenu from './_component/NavMenu';

type Props = {
  children: React.ReactNode,
};

export default function AfterLoginLayout({children} : Props) {
  return (
      <div className={styles.container}>
        <header className={styles.leftSectionWrapper}>
          <section className={styles.leftSection}>
            <div className={styles.leftSectionFixed}>
              <Link className={styles.logo} href="/home">
                <div className={styles.logoPill}>
                  <Image src={ZLogo} alt="z.com로고" width={40} height={40}/>
                </div>
              </Link>
              <nav>
                <ul>
                  <NavMenu/>
                </ul>
              </nav>
            </div>
          </section>
        </header>
        <div className={styles.rightSectionWrapper}>
          <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
            <section className={styles.rightSection}>
              <RightSearchZone/>
              {/* <TrendSection/>
              <div className={styles.followRecommend}>
                <h3>팔로우 추천</h3>
                <FollowRecommendSection/>
              </div> */}
            </section>
          </div>
        </div>
      </div>
  )
}