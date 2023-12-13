import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./results.css"; 
import Product from "../components/Product"; // Import the Product component

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API call to search products by name
    fetch(`/api/products/search?name=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-results-container">
      <h2 className="search-results-header">Search Results for: {query}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="search-products">
          {searchResults.map((result) => (
            <Product
              key={result._id}
              name={result.name}
              description={result.description}
              price={result.price}
              imageUrl={result.imageUrl}
              productId={result._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
