import ProductsList from "../components/ProductsList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-screen">
      <ProductsList />
    </main>
  );
}
