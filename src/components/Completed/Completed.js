import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "reactstrap";

import styles from "./Completed.module.scss";

export function Completed() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirige al inicio después de 1 minuto
    }, 10000); // 60,000 ms = 1 minuto

    return () => clearTimeout(timer); // Limpia el temporizador si el usuario navega antes
  }, [router]);

  return (
    <div className={styles.completed}>
      <h3>¡Gracias por tu compra!</h3>
      <br></br>

      <p>
        "Nos colocaremos en contacto contigo para acordar los detalles del
        envío."
      </p>

<br></br>
      <Button block size="lg"
        style={{ backgroundColor: "red", color: "white", padding: "10px" }}
        onClick={() => router.push("/")}
      >
        Volver al inicio
      </Button>
    </div>
  );
}
