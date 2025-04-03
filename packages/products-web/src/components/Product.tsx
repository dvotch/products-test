import { ProductEntity } from '@/entities/product.entity';
import { Button } from './common/Button';
import { useState } from 'react';
import { CustomInput } from './common/CustomInput';

type Props = {
    product: ProductEntity;
    onDelete: () => Promise<void>;
    onUpdate: (dto: { name: string; description?: string }) => Promise<void>;
};

const Product = ({ product, onDelete, onUpdate }: Props) => {
    const [dryProduct, setDryProduct] = useState<ProductEntity>(product);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onUpdate(dryProduct);
    };

    return (
        <form className="flex justify-between mt-4 border-b-2 pb-2" onSubmit={handleSubmit}>
            <CustomInput
                value={dryProduct.name}
                onChange={(e) => setDryProduct({ ...dryProduct, name: e.target.value })}
                required={true}
                placeholder="Описание"
            />
            <CustomInput
                value={dryProduct.description}
                onChange={(e) => setDryProduct({ ...dryProduct, description: e.target.value })}
                placeholder="Описание"
            />
            <Button onClick={onDelete}>Удалить</Button>
            <Button type="submit">Обновить</Button>
        </form>
    );
};

export default Product;
