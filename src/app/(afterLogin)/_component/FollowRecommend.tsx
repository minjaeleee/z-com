import Link from "next/link"
import styles from './followRecommend.module.css'

export default function FollowRecommend() {
  const user = {
    id: 'elonmusk',
    nickname: 'Elon Musk',
    image: '/yRsRRjGO.jpg'
  }
  const followed = true
  const onFollow = () => {};
  return (
    <Link href={`/${user.id}`} className={styles.container}>
      <div className={styles.userLogoSection}>
        <div className={styles.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>{user.nickname}</div>
        <div className={styles.count}>@{user.id}</div>
      </div>
      {/* <div className={cx(styles.followButtonSection, followed && styles.followed)}> */}
      <div className={styles.followed}>
        <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
      </div>
    </Link>
  )
}