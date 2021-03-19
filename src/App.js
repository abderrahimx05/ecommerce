import React, { useEffect, useState } from "react";
import Products from "./components/Products/Products";
import NavBar from "./components/NavBar/Navbar";
import { commerce } from "./lib/commerce";
const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <NavBar />
      <Products />
    </div>
  );
};

export default App;
