import { ProductEntity } from "@/entities/product.entity";
import { useEffect, useState } from "react";

interface ProductEvent {
  type: "created" | "updated" | "deleted";
  data: ProductEntity;
}

export function useProductsEvents() {
  const [event, setEvent] = useState<ProductEvent>();

  useEffect(() => {
    const eventSource = new EventSource(
      process.env.NEXT_PUBLIC_SSE_PRODUCTS_URL!
    );

    eventSource.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data) as ProductEvent;
        setEvent(event);
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return event;
}
