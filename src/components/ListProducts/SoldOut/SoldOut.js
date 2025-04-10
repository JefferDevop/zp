import React from "react";
import { BASE_NAME } from "@/config/constants";

import { CardImg } from "reactstrap";

import styles from "./SoldOut.module.scss";

export function SoldOut(props) {
  const { product } = props;

  return (
    <div className={styles.list__product}>     
        <div className={styles.soldout}>
          <span>AGOTADO</span>
        </div>
        <CardImg
          alt="Card image cap"
          src={BASE_NAME + product.productData.images}
        />
    
      <h5>{product.productData.name_extend}</h5>    
    </div>
  );
}
