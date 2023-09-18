// Shop.js

import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/Search";
import { useIcons } from "../context/IconContext";
import { useProducts } from "../context/ProductContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const LazyProductCard = lazy(() => import("../components/ProductCard.jsx"));

const Shop = () => {
  const { category } = useParams();
  const { filteredProducts, filterProducts, fetchProducts } = useProducts();
  const icons = useIcons();
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch products based on the category when the category changes
    fetchProducts(category);
  }, [category, fetchProducts]);

  const HandleSearch = (query) => {
    setQuery(query);
    filterProducts(query);
  };

  return (
    <div className="shop">
      <div className="shop-search">
        <div className="shop-category-heading">Showing: {category}</div>
        <SearchBar onSearch={HandleSearch} initialValue={query} />
        <div className="icon-container">
          <React.Suspense
            fallback={<div>Loading Icons...</div>}
          ></React.Suspense>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <LazyProductCard product={product} />
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Shop;
