import { ProductEntity } from "@/entities/product.entity";
import { Button } from "./common/Button";
import { useState } from "react";

type Props = {
  product: ProductEntity;
};

const Product = ({ product }: Props) => {
  return (
    <div className="flex justify-between mt-4 border-b-2 pb-2">
      <p className="border">{product.name}</p>
      <p className="border">{product.description}</p>
    </div>
  );
};

export default Product;
