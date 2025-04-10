import styles from "./TopBar.module.scss";
import { CardImg } from "reactstrap";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export function TopBar() {
  return (
    <>
      <div className={styles.topBar}>
        <Link href="/">
          <CardImg src="/image/logo.png" alt="Antotex" />{" "}
        </Link>
        <div className={styles.topBar__text}>
          <h1>ZAPATILLAS CALI 11</h1>
          <h3>CATÁLOGO 2025</h3>
          <p>Whatsapp: 311 3666417 </p>
        </div>
        
      </div>
    </>
  );
}
