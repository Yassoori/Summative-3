import React, { useState } from "react";
import { useIcons } from "../context/IconContext";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const icons = useIcons();

  const HandleSearch = () => {
    onSearch(searchQuery);
  };
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <React.Suspense fallback={<div>Loading Icons...</div>}>
        <div onClick={HandleSearch}>
          <icons.SearchIcon />
        </div>
      </React.Suspense>
    </div>
  );
};

export default SearchBar;
