import BackButton from '@/app/(afterLogin)/_component/BackButton'
import styles from './singlePost.module.css'

export default function SinglePost() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <BackButton/>
        <h3 className={styles.headerTitle}>게시하기</h3>
      </div>
    </div>
  )  
}