import { FooterApp, SearchTable, NotFound } from "@/components";
import { size } from "lodash";
import React from "react";

export default function FeaturedPage(props) {
  const { products } = props;
  const hasProduct = size(products) > 0;

  return (
    <>
      <SearchTable products={products} />

      <FooterApp />
    </>
  );
}
