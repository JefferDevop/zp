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
  const [idProduct, setIdPropduct] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");
    toggleModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
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
        <ModalHeader toggle={toggleModal}>Ingrese Cantidad</ModalHeader>

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
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
