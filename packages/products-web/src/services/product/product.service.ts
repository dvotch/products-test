import { ProductEntity } from "@/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

type AVAIL_CRUD_METHODS = "POST" | "PATCH" | "GET" | "DELETE";

type SendOptions = {
  method: AVAIL_CRUD_METHODS;
  data?: Record<string, any>;
  subEndpoint?: string;
};

class ProductService {
  private _url = new URL("products/", process.env.NEXT_PUBLIC_SERVER_URL);

  async getProducts(): Promise<ProductEntity[]> {
    try {
      const response = await fetch(this._url, { method: "GET" });
      return response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async createProduct(dto: CreateProductDto) {
    try {
      return await this.send({ method: "POST", data: dto });
    } catch (error) {
      console.error("Erorr creating product:", error);
      throw new Error("Failed to create product");
    }
  }

  async deleteProduct(id: number) {
    try {
      return await this.send({ method: "DELETE", subEndpoint: `${id}/` });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    try {
      return await this.send({
        method: "PATCH",
        subEndpoint: `${id}`,
        data: dto,
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      throw new Error("Failed to update product");
    }
  }

  private async send({ data, method, subEndpoint }: SendOptions) {
    const finalUrl = subEndpoint ? new URL(subEndpoint, this._url) : this._url;

    const response = await fetch(finalUrl, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: data ? { "Content-Type": "application/json" } : {},
    });
    console.log(response);
    return response.json();
  }
}

export const productService = new ProductService();
