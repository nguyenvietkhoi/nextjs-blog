import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container} style={{background: "url(/wave.png)"}}>
      <Head>
        <title>Linguaevum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="http://linguaevum.ddns.net/">Linguaevum</a> xin kính chào
        </h1>

        <div className={styles.grid}>
          <a href="https://nguyenvietkhoi.github.io/SinicIME/" className={styles.card}>
            <h3>Sinic IME</h3>
            <p>Bộ gõ chữ Hán Nôm</p>
          </a>

          <a href="/TayNung" className={styles.card}>
            <h3>Từ điển Tày Nùng - Việt</h3>
            <p>Tra cứu từ ngữ tiếng Tày Nùng</p>
          </a>

          <a
            href="https://nguyenvietkhoi.github.io/SinicIME/TaiDB"
            className={styles.card}
          >
            <h3>Dữ liệu Kra-Dai</h3>
            <p>Cập nhật cơ sở dữ liệu ngữ hệ Kra-Dai</p>
          </a>

          <a
            href="https://nguyenvietkhoi.github.io/SinicIME/AustroasiaticDB"
            className={styles.card}
          >
            <h3>Dữ liệu Nam Á</h3>
            <p>Cập nhật cơ sở dữ liệu ngữ hệ Nam Á</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          rel="noopener noreferrer"
        >
          © 2021{' '}
          <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} />
			  &nbsp;Linguaevum
        </a>
      </footer>
    </div>
  )
}
