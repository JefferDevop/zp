import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { BASE_API } from "@/config/constants";

import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";

import styles from "./FooterApp.module.scss";

import { BtnLink } from "../Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

export function FooterApp() {
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

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        
        <BtnLink link={"/"} title={"Ir a inicio"}  />


        <BtnLink
          link={
            `${BASE_API}/admin-dashboard/`
          }
          title={""}
          logo={<CiUser size={20} />}
        />
      </div>

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
                <BsWhatsapp size={20} /> Linea {index + 1}
                <p>{seller[index]}</p>
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

