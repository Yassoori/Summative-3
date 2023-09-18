import React, { useState } from "react";
const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const HandleSearch = () => {
    onSearch(searchQuery);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={HandleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
