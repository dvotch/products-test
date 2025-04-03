"use client";

import { ProductEntity } from "@/entities/product.entity";
import { Button } from "./common/Button";
import { useState } from "react";

type Props = {
  product: ProductEntity;
  onDelete: () => Promise<void>;
  onUpdate: (dto: { name: string; description?: string }) => Promise<void>;
};

const Product = ({ product, onDelete, onUpdate }: Props) => {
  const [productState, setProductState] = useState<ProductEntity>(product);

  return (
    <div className="flex justify-between mt-4 border-b-2 pb-2">
      <input
        value={productState.name}
        onChange={(e) =>
          setProductState({ ...productState, name: e.target.value })
        }
        className="border"
      />
      <input
        value={productState.description}
        onChange={(e) =>
          setProductState({ ...productState, description: e.target.value })
        }
        className="border"
      />
      <Button onClick={onDelete}>Удалить</Button>
      <Button
        onClick={() =>
          onUpdate({
            name: productState.name,
            description: productState.description,
          })
        }
      >
        Обновить
      </Button>
    </div>
  );
};

export default Product;
