import { useState } from "react";
import { BASE_NAME } from "@/config/constants";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { toast } from "react-toastify";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  CardImg,
} from "reactstrap";
import styles from "./Available.module.scss";

export function Available(props) {
  const { product } = props;

  const scale = "c_scale,f_auto,q_50,w_400/";
  const upload = "image/upload/";

  const format = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  const { addCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [talla, setTalla] = useState('');

  const [idProduct, setIdPropduct] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    addCart(idProduct, quantity, talla);
    toast.success("¡Se agrego con exito!");
    toggleModal();
  };

  const handleQuantityChange = (event) => {

    if (event.target.value < 1) {
      toast.error("¡La cantidad no puede ser menor a 1!");
      return;
    }
    if (event.target.value > 100) {
      toast.error("¡La cantidad no puede ser mayor a 100!");
      return;
    }
    if (isNaN(event.target.value)) {
      toast.error("¡La cantidad debe ser un número!");
      return;
    }
    if (event.target.value === "") {
      toast.error("¡La cantidad no puede estar vacía!");
      return;
    }
    if (event.target.value === "0") {
      toast.error("¡La cantidad no puede ser cero!");
      return;
    }
    if (event.target.value === "-1") {
      toast.error("¡La cantidad no puede ser menor a 1!");
      return;
    }

    
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  const handleTallaChange = (event) => {
   
    // if (event.target.value === "") {
    //   toast.error("¡La talla no puede estar vacía!");
    //   return;
    // }
    if (event.target.value.length > 2) {
      toast.error("¡La talla no puede tener más de 2 caracteres!");
      return;
    }
    if (event.target.value === "0") {
      toast.error("¡La talla no puede ser cero!");
      return;
    }
    if (event.target.value === "-1") {
      toast.error("¡La talla no puede ser menor a 1!");
      return;
    }

    
    const value = event.target.value;
    setTalla(value);
  };

  const addProductId = (id) => {
    setIdPropduct(id);
    toggleModal();
  };

  return (
    <div className={styles.list__product}>
      <Link href={`/${product.productData.slug}`}>
        {product.productData.images ? (
          <CardImg
            alt="Card image cap"
            src={
              BASE_NAME +
              upload +
              scale +
              product.productData.images.split(upload)[1]
            }
          />
        ) : (
          <CardImg
            alt="Card image cap"
            src={product.productData.image_alterna}
          />
        )}
      </Link>

      <h5>{product.productData.name_extend}</h5>
      <div className={styles.product}>
        {product.productData.price1 > 0 && (
          <div className={styles.price}>
            <label>Precio: $ {format(product.productData.price1)}</label>
          </div>
        )}
      </div>

      <Button
        // color="primary"
        onClick={() => addProductId(product.productData.codigo)}
      >
        Agregar al Carrito
      </Button>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Cantidad y Talla</ModalHeader>

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

          <br></br>
          
            Talla
            <Input
              value={talla}
              type="text"
              name="talla"
              id="talla"
              placeholder="Talla"
              onChange={handleTallaChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={addData}>
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
