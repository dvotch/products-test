"use client";

import { ProductEntity } from "@/entities/product.entity";
import { useEffect, useState } from "react";
import Product from "./Product";
import { useProductsEvents } from "@/hooks/useProductsEvents";

const ProductsList = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const event = useProductsEvents();

  useEffect(() => {
    switch (event?.type) {
      case "created":
        setProducts((prev) => [...prev, event.data]);
        break;
      case "updated":
        setProducts((prev) =>
          prev.map((p) => (p.id === event.data.id ? event.data : p))
        );
        break;
      case "deleted":
        setProducts((prev) => prev.filter((p) => p.id !== event.data.id));
        break;
    }
  }, [event]);

  return (
    <ul className="border flex flex-col w-2xl p-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
