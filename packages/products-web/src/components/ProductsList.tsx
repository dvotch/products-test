"use client";

import { ProductEntity } from "@/entities/product.entity";
import Product from "./Product";
import { useEffect, useState } from "react";
import { productRepository } from "@/repositories/product/product.repository";
import { UpdateProductDto } from "@/repositories/product/dto/update-product.dto";
import { Button } from "./common/Button";

const ProductsList = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refetchProducts = async () => {
      setLoading(true);
      const products = await productRepository.getProducts();
      setLoading(false);
      if (!products) return;
      setProducts(products);
    };

    refetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    const product = await productRepository.createProduct({
      name: "",
      description: "",
    });
    setProducts((prev) => [...prev, product]);
  };

  const handleDeleteProduct = async (id: number) => {
    const product = await productRepository.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleUpdateProduct = async (id: number, dto: UpdateProductDto) => {
    const product = await productRepository.updateProduct(id, dto);
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  if (loading) return <div>Загрузка.....</div>;

  return (
    <ul className="border flex flex-col w-2xl p-4">
      <Button onClick={handleCreateProduct}>Добавить</Button>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onDelete={() => handleDeleteProduct(product.id)}
          onUpdate={(dto) => handleUpdateProduct(product.id, dto)}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
