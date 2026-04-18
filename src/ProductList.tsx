import { useEffect, useState } from "react";
import "./products.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

  return (
    <div className="product-list">
      <h2>Product Lists</h2>
      <ul className="product-list-items">
        {products.map((product: any) => (
          <li key={product.id} className="product-list-item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductList;


const ProductCard = ({ product }: any) => {
    const { title, description, price, image } = product;

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3>{title}</h3>
            <p>{description}</p>
            <p>${price}</p>
        </div>
    );
}