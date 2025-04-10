import React, { useState, useEffect } from "react";
import styles from "./Redes.module.scss";
import { CardImg } from "reactstrap";
import { useRouter } from "next/router";

import { IoLogoWhatsapp } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsSearch } from "react-icons/bs";
import { BtnLink } from "../Common";

export function Redes() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick(link) {
    router.push(link);
  }

  return (
    <>
      <div className={styles.redes}>
        <div
          className={`${styles.sticky_div} ${
            isVisible ? styles.visible : styles.hidden
          }`}
        >
          <h1>ZAPATILLAS CALI 11</h1>
          <p>Whatsapp: 311 3666417 </p>
        </div>

        <div className={styles.panelSearch}>
          <BsSearch size={20} onClick={() => handleClick("/featured")} />
          <input
            type="text"
            value=""
            readonly
            onClick={() => handleClick("/featured")}
          />
        </div>
      </div>

      {/* <div
        className={`${styles.sticky_div} ${isVisible ? styles.visible : ""}`}
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.5)", // Cambia la escala para crecer/desvanecer
          opacity: isVisible ? 1 : 0, // Cambia la opacidad para desvanecer
          transition: "transform 0.3s, opacity 0.3s", // Aplica una transición
        }}
      >
        <h1>CRISTALERIA LA 10A</h1>
      </div> */}
    </>
  );
}
