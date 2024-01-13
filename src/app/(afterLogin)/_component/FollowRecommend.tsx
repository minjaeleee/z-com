import Link from "next/link"
import cx from "classnames";
import { User } from "@/model/User"

import styles from './followRecommend.module.css'

type Props = {
  user: User   
}

export default function FollowRecommend({ user }: Props) {
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
      <div className={cx(styles.followButtonSection, followed && styles.followed)}>
        <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
      </div>
    </Link>
  )
}