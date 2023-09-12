import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/Search";

const Shop = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products?category=${category}`
        );

        if (response.status === 200) {
          console.log(`Fetched data for ${category}`, response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const HandleSearch = (query) => {
    const filteredResults = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredResults);
  };

  return (
    <div className="shop">
      <h2>Shop for {category}</h2>
      <SearchBar onSearch={HandleSearch} />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
