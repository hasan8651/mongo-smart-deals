import { useEffect, useState } from "react";
import Product from "../Product/product";

const AllProducts = () => {
  const [products, setProducts] = useState([]); // initially empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);
  console.log(products);

  return (
    <div>
      <h2 className="text-5xl text-center">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
