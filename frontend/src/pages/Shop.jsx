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
      <div className="shop-category-heading">{category}</div>
      <SearchBar onSearch={HandleSearch} initialValue={query} />
      <div className="icon-container">
        <React.Suspense fallback={<div>Loading Icons...</div>}>
          <icons.SearchIcon className="search-icon" />
          <icons.ShoppingCartIcon className="cart-icon" />
        </React.Suspense>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        {filteredProducts.map((product) => (
            <LazyProductCard product={product} />
        ))}
      </Suspense>
    </div>
  );
};

export default Shop;
