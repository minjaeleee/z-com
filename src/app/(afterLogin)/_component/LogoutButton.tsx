"use client"

import { signOut, useSession } from "next-auth/react";
import styles from "./logoutButton.module.css";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

type Props = {
  me: Session
}

export default function LogoutButton({ me } : Props) {
  const router = useRouter();

  const onLogout = () => {
    signOut({redirect: false})
    .then(() => {
      router.replace('/')
    })
  };

  if(!me?.user) {
    return null;
  }

  return (
    <button className={styles.logOutButton} onClick={onLogout}>
      <div className={styles.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.id}/>
      </div>
      <div className={styles.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id}</div>
      </div>
    </button>
  )
}