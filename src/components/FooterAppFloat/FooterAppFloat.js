import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { useRouter } from "next/router";
import Link from "next/link";

import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BsBoxes } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa";

import styles from "./FooterAppFloat.module.scss";

import { BtnLink } from "../Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CardImg,
} from "reactstrap";

export function FooterAppFloat() {
  const router = useRouter();
  const { total } = useCart();
  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      "Hola, me gustaría obtener más información sobre sus productos."
    );

    window.location.href = whatsappLink;

    toggleModal();
  };

  function handleClick(link) {
    router.push(link);
  }

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.cart}>
        <p>{total}</p>
        <div className={styles.btn_cart}>
          <GiShoppingCart
            onClick={() => handleClick("/cart")}
            size={40}
            color="white"
          />
        </div>

        <div className={styles.btn_wap}>
          <RiWhatsappFill
            onClick={() => toggleModal()}
            size={40}
            color="green"
          />
        </div>

        <div className={styles.btn_may}>
          {/* <label>MAYORISTAS</label> */}
          <Link href="https://zc11mayoristas.vercel.app/">
            <BsBoxes size={40} color="white" style={{ cursor: "pointer" }} />
          </Link>
        </div>
      </div>

      {/* <div className={styles.paneluser}>
        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsWhatsapp size={30} color="green" />
        </Button>
      </div> */}

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                key={index}
                color="success"
                outline
                size="sm"
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <FaWhatsapp size={20} /> {seller[index]}
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addData}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
