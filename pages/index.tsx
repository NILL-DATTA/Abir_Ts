import Head from "next/head";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Our Store</title>
        <meta name="description" content="Your favorite place to shop amazing products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ ...styles.main, fontFamily: geist.style.fontFamily }}>
        <div style={styles.container}>
          <h1 style={styles.title}>Welcome to Our Website</h1>
          <p style={styles.subtitle}>
            Discover amazing products, exclusive deals, and a shopping experience tailored just for you.
          </p>
          <Link href="/auth/login" passHref legacyBehavior>
            <a style={styles.button}><b>LOGIN NOW</b></a>
          </Link>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4rem 2rem",
    minHeight: "100vh",
    background: "#141E30",
    fontFamily: "Geist, sans-serif",
  },
  container: {
    textAlign: "center",
    maxWidth: "720px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "3rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "700",
    color: "white",
    marginBottom: "1.5rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "white",
    marginBottom: "2.5rem",
    lineHeight: "1.6",
  },
  button: {
    backgroundColor: "#141E30",
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
};
