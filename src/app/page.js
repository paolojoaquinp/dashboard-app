import Image from 'next/image'
import styles from './page.module.css'
import LicitacionList from '@/views/Licitacion'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <LicitacionList />
      </div>
    </main>
  )
}
