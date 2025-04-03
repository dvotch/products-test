"use client";

import { ProductEntity } from "@/entities/product.entity";
import Product from "./Product";
import { useEffect, useState } from "react";
import { productService } from "@/services/product/product.service";
import { UpdateProductDto } from "@/services/product/dto/update-product.dto";
import { Button } from "./common/Button";

const ProductsList = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refetchProducts();
  }, []);

  const refetchProducts = async () => {
    setLoading(true);
    const products = await productService.getProducts();
    setLoading(false);
    if (!products) return;
    setProducts(products);
  };

  const handleCreateProduct = async () => {
    const product = await productService.createProduct({
      name: "",
      description: "",
    });
    console.log(product);
    // setProducts((prev) => [...prev, product]);
  };

  const handleDeleteProduct = async (id: number) => {
    const product = await productService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleUpdateProduct = async (id: number, dto: UpdateProductDto) => {
    const product = await productService.updateProduct(id, dto);
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
