import React, { useState, useEffect } from "react";
import { useCart} from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import styles from "./ListCart.module.scss";
import { BASE_NAME } from "@/config/constants";
import { Products } from "@/api/products";

const productCtrl = new Products();

export function ListCart({ product }) {
  const [productCode, setProductCode] = useState(null);
  const { decreaseCart, incrementCart, deleteCart, deleteAllCart } = useCart();
  const router = useRouter();

  
  // Consulta para verificar el stock del producto
  // const {
  //   data: stockData,
  //   isLoading: isCheckingStock,
  //   refetch: checkStock,
  // } = useQuery({
  //   queryKey: ["stockData", productCode],
  //   queryFn: () => productCtrl.getProductByCode(productCode),
  //   enabled: !!productCode,
  //   staleTime: 1000 * 60 * 1,
  //   cacheTime: 1000 * 60 * 2,
  // });

  // const handleIncrement = async (selectedProduct) => {
  //   const newProductCode = selectedProduct.codigo;
    

    // if (newProductCode !== productCode) {
    //   setProductCode(newProductCode);
    //   return;
    // }

    // if (isCheckingStock) {
    //   alert("Verificando disponibilidad...");
    //   return;
    // }

    // try {
      // const { data: refreshedStock } = await checkStock();

      // const availableQuantity = refreshedStock[0]?.qty_available || 0;

      // Obtener la cantidad del producto en el carrito desde localStorage
      // const cartProduct = JSON.parse(localStorage.getItem("cart_antotex")) || [];
      // const productInCart = cartProduct.find(
      //   (item) => item.id === newProductCode
      // );

      // const cartQuantity = availableQuantity - productInCart.quantity;


      // Verificar si la cantidad en el carrito más la cantidad disponible es mayor a 0
    //   if (cartQuantity > 0) {
    //     incrementCart(newProductCode); // Incrementar carrito
    //   } else {
    //     alert("No hay stock disponible para este producto.");
    //   }
  //   } catch (error) {
  //     console.error("Error al verificar el stock:", error);
  //     alert("No se pudo verificar el stock. Inténtalo de nuevo más tarde.");
  //   }
  // };

  // useEffect(() => {
  //   if (productCode) {
  //     checkStock();
  //   }
  // }, [productCode, checkStock]);

  // Función para formatear los números a formato colombiano (COP)
  const formatCurrency = (number) =>
    new Intl.NumberFormat("es-CO").format(Math.floor(number));

  // Cálculo del subtotal y descuentos
  const subtotal = product.reduce((acc, item) => {
    const price =
      item?.price_old > item?.price1
        ? item?.price_old
        : item?.price1;
    return acc + price * item.quantity;
  }, 0);

  const descuento = product.reduce((acc, item) => {
    const priceOld = item?.price_old;
    const price1 = item?.price1;
    const quantity = item.quantity;

    // Si algún valor es inválido o price_old no es mayor que price1, ignorar este producto
    if (!priceOld || !price1 || !quantity || priceOld <= price1) {
      return acc;
    }

    // Acumular el descuento
    return acc + (priceOld - price1) * quantity;
  }, 0);

  const handleNavigation = (path) => router.push(path);

  return (
    <div className={styles.list}>
      <h4>CARRITO</h4>

      {product.map((item) => (
        <div key={item?.codigo} className={styles.card}>
          <div className={styles.foot}>
            <p className={styles.name}>{item?.name_extend}</p>
          </div>
          <div className={styles.body}>
            <div className={styles.body__content}>
              <BsTrash3
                size="20"
                color="gray"
                onClick={() => deleteCart(item?.codigo)}
              />

              <CardImg
                alt="Imagen del producto"
                src={BASE_NAME + (item?.images || item?.image_alterna)}
                className={styles.skeleton}
              />

              <div className={styles.price}>
                <p>
                  Unidad: ${" "}
                  {formatCurrency(
                    item?.price_old > item?.price1
                      ? item?.price_old
                      : item?.price1
                  )}
                </p>
                <p>
                  Subtotal: ${" "}
                  {formatCurrency(
                    (item?.price_old > item?.price1
                      ? item?.price_old
                      : item?.price1) * item.quantity
                  )}
                </p>
                {item?.price_old > 0 &&
                  item?.price_old > item?.price1 && (
                    <p>
                      Descuento:{" "}
                      <u>
                        ${" "}
                        {formatCurrency(
                          (item?.price_old -
                            item?.price1) *
                            item.quantity
                        )}
                      </u>
                    </p>
                  )}
              </div>

              <div className={styles.button}>
                <AiOutlineMinusCircle
                  onClick={() => decreaseCart(item.codigo)}
                  size={20}
                />
                <p>{item.quantity}</p>
                <AiFillPlusCircle
                  onClick={() => incrementCart(item.codigo)}
                  size={20}
                />
              </div>
            </div>
          </div>

          
        </div>
      ))}

      <div className={styles.totales}>
        <p>SUBTOTAL: $ {formatCurrency(subtotal)}</p>
        {descuento > 0 && (
          <>
            <p>
              DESCUENTO: <u>$ {formatCurrency(descuento)}</u>
            </p>
            <p>TOTAL: $ {formatCurrency(subtotal - descuento)}</p>
          </>
        )}
      </div>

      <div className={styles.footButton}>
        <Button block onClick={() => handleNavigation("/payment")}>
          Finalizar Compra
        </Button>
        <Button outline block onClick={() => handleNavigation("/")}>
          Seguir Comprando
        </Button>
        <Button outline block onClick={deleteAllCart}>
          Eliminar Todo
        </Button>
      </div>
    </div>
  );
}
