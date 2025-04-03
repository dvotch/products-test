'use client';

import { ProductEntity } from '@/entities/product.entity';
import Product from './Product';
import { useEffect, useState } from 'react';
import { productRepository } from '@/repositories/product/product.repository';
import { UpdateProductDto } from '@/repositories/product/dto/update-product.dto';
import { Button } from './common/Button';

const ProductsList = () => {
    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const refetchProducts = async () => {
            setLoading(true);
            const products = await productRepository.get();
            setLoading(false);
            if (!products) return;
            setProducts(products);
        };

        refetchProducts();
    }, []);

    const createProduct = async () => {
        const product = await productRepository.post({
            name: '',
            description: '',
        });
        setProducts((prev) => [...prev, product]);
    };

    const deleteProduct = async (id: number) => {
        const product = await productRepository.delete(id);
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
    };

    const updateProduct = async (id: number, dto: UpdateProductDto) => {
        const product = await productRepository.patch(id, dto);
        setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    };

    if (loading) return <div>Загрузка.....</div>;

    return (
        <ul className="border flex flex-col w-2xl p-4">
            <Button onClick={createProduct}>Добавить</Button>
            {products.map((product) => (
                <Product
                    key={product.id}
                    product={product}
                    onDelete={() => deleteProduct(product.id)}
                    onUpdate={(dto) => updateProduct(product.id, dto)}
                />
            ))}
        </ul>
    );
};

export default ProductsList;
