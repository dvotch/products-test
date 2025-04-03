import { ProductEntity } from "@/entities/product.entity";

class ProductRepository {
  private _url = new URL("products/", process.env.NEXT_PUBLIC_SERVER_URL);

  async getProducts(): Promise<ProductEntity[]> {
    try {
      const response = await fetch(this._url);
      return response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
}

export const productRepository = new ProductRepository();
