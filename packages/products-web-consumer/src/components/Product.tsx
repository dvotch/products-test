import { ProductEntity } from "@/entities/product.entity";

type Props = {
  product: ProductEntity;
};

const Product = ({ product }: Props) => {
  return (
    <div className="flex justify-between mt-4 border-b-2 pb-2">
      <p>{product.name}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;
