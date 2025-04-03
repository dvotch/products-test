import { ProductEntity } from '@/entities/product.entity';
import { Button } from './common/Button';
import { useState } from 'react';

type Props = {
    product: ProductEntity;
    onDelete: () => Promise<void>;
    onUpdate: (dto: { name: string; description?: string }) => Promise<void>;
};

const Product = ({ product, onDelete, onUpdate }: Props) => {
    const [dryProduct, setDryProduct] = useState<ProductEntity>(product);

    return (
        <div className="flex justify-between mt-4 border-b-2 pb-2">
            <input
                value={dryProduct.name}
                onChange={(e) => setDryProduct({ ...dryProduct, name: e.target.value })}
                className="border"
            />
            <input
                value={dryProduct.description}
                onChange={(e) => setDryProduct({ ...dryProduct, description: e.target.value })}
                className="border"
            />
            <Button onClick={onDelete}>Удалить</Button>
            <Button
                onClick={() =>
                    onUpdate({
                        name: dryProduct.name,
                        description: dryProduct.description,
                    })
                }
            >
                Обновить
            </Button>
        </div>
    );
};

export default Product;
