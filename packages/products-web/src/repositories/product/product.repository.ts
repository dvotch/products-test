import { ProductEntity } from '@/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type AVAIL_CRUD_METHODS = 'POST' | 'PATCH' | 'GET' | 'DELETE';

type SendOptions = {
    method: AVAIL_CRUD_METHODS;
    data?: Record<string, any>;
    subEndpoint?: string;
};

class ProductRepository {
    private _url = new URL('products/', process.env.NEXT_PUBLIC_SERVER_URL);
    private _validationErrors: Record<keyof ProductEntity, string> | null = null;

    get validationErrors() {
        return this._validationErrors;
    }

    resetErrors() {
        this._validationErrors = null;
    }

    async get(subEndpoint?: string): Promise<ProductEntity[]> {
        return await this.send({ data: {}, method: 'GET', subEndpoint });
    }

    async post(dto: CreateProductDto, subEndpoint?: string): Promise<ProductEntity> {
        return await this.send({ data: dto, method: 'POST' });
    }

    async patch(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
        return await this.send({ data: dto, method: 'PATCH', subEndpoint: `${id}/` });
    }

    async delete(id: number): Promise<ProductEntity> {
        return await this.send({ method: 'DELETE', subEndpoint: `${id}/` });
    }

    private async send({ data, method, subEndpoint }: SendOptions) {
        const finalUrl = subEndpoint ? new URL(subEndpoint, this._url) : this._url;

        const response = await fetch(finalUrl, {
            method,
            body: data ? JSON.stringify(data) : undefined,
            headers: data ? { 'Content-Type': 'application/json' } : {},
        });
        return this.returnOrThrow(response);
    }

    private async returnOrThrow(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }

        if (response.status === 400) {
            const isJson = response.headers.get('content-type')?.startsWith('application/json');
            if (!isJson) throw new Error('Unknown error');
            this.parseValidationErrors(response);
        }

        throw new Error('Unknown error');
    }

    private async parseValidationErrors(response: Response) {
        const parsed = await response.json();
        if (!('validationErrors' in parsed)) throw new Error('Unknown error');

        this._validationErrors = parsed.validationErrors;
        throw new Error('Bad request');
    }
}

export const productRepository = new ProductRepository();
