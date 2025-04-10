import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants"; 
import { useWhatsApp, useGallery, useCart } from "@/hooks";
import { toast } from "react-toastify";

import { ImageCarousel } from "../ImageCarousel";

import {
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";

import { BsWhatsapp } from "react-icons/bs";
import styles from "./DetailProduct.module.scss";

export function DetailProduct(props) {
  const { product, relate } = props;
  const { addCart } = useCart();
  const { getGalleryByCode, gallery } = useGallery();
  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const { ...productDetall } = product ?? {};

  const [productData, setProductData] = useState(productDetall[0]);
  const [idProduct, setIdPropduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");
  const [quantity, setQuantity] = useState(1);

  const scale = "c_scale,f_auto,q_auto,w_800/";
  const upload = "image/upload/";

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };


  useEffect(() => {
    getGalleryByCode(productData?.codigo);
  }, []);

  const changeDetail = (data) => {
    setProductData(data);
    getGalleryByCode(data?.codigo);
    window.scrollTo(0, 0);
  };

  //-----------------------------------------------

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addProductId = (id) => {
    setIdPropduct(id);
    openCloseModal();
  };

  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");

    openCloseModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  //-------------------------------------

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal();
  };



  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    }
  };

  if (product) {
    return (
  
        <div className={styles.detailProduct}>
          <div className={styles.product} id="seccion-1">
            {size(gallery) > 0 ? (
              <ImageCarousel images={gallery} />
            ) : productData?.images ? (
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + upload + scale + productData.images?.split(upload)[1]}
              />
            ) : (
              <CardImg
                alt="Card image cap"
                src={productData?.image_alterna}
              />
            )}

            <div className={styles.description}>
              <CardTitle className={styles.title}>
                <h6 className={styles.name_extend}>
                  {productData?.name_extend}
                </h6>
                <div className={styles.price}>
                  
                    <h5>Precio: $ {format(productData.price1)} </h5>
                </div>
              </CardTitle>

              <Button onClick={() => addProductId(productData.codigo)}>
                Agregar al Carrito
              </Button>
              <p>{productData?.description}</p>
            </div>
          </div>

          
          <Modal centered isOpen={showModal} toggle={openCloseModal}>
            <ModalHeader toggle={openCloseModal}>Ingrese Cantidad</ModalHeader>

            <ModalBody>
              Cantidad
              <FormGroup>
                <Input
                  value={quantity}
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  placeholder="Cantidad"
                  onChange={handleQuantityChange}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={addData}>
                Aceptar
              </Button>{" "}
              <Button color="secondary" onClick={openCloseModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

       
          <Modal centered isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

          <ModalBody>
            <FormGroup>
              {items.map((item, index) => (
                <Button
                  key={index}
                  color="success"
                  size="sm"
                  outline
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
            <Button size="sm" outline color="secondary" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button size="sm" color="success" onClick={addDataToWhatsApp}>
              Aceptar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return <h5> La pagina no existe</h5>;
  }
}
