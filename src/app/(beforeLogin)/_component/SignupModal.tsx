"use client";

import styles from './signup.module.css';
import BackButton from "@/app/(beforeLogin)/_component/BackButton";

export default function SignupModal() {
  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
        </div>
      </div>
    </>)
}