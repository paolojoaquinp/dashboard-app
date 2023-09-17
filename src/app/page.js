import Image from 'next/image'
import styles from './page.module.css'
import LicitacionList from '@/views/Licitacion'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.description}>
        <LicitacionList />
      </div>
    </main>
  )
}
