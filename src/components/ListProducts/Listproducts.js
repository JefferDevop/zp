import { map } from "lodash";
import { useState, useMemo } from "react";
import styles from "./ListProduts.module.scss";
import { Available } from "./Available";
import { Loader } from "@/components";
import { SoldOut } from "./SoldOut";

export function Listproducts({
  isLoadingCategories,
  isLoadingProducts,
  products = [],
  title,
}) {
  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }

  return (
    <div className={styles.listProduct}>
      <h4>{title}</h4>
      <div className={styles.product}>
        {map(products, (product, index) => (
          <div key={index} className={styles.productCard}>
            {product.productData.active && (
              <div key={index} className={styles.card}>
                {!product.productData.soldout ? (
                  <Available product={product} />
                ) : (
                  <SoldOut product={product} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
