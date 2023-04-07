import React, { useEffect } from "react";
import Section from "./Section";

const CategoriesListing = ({
    activeCategory,
    emoji,
    onItemClick,
  }) => {

    return (
        <div className="categories-listing">
          {emoji.map(([id, items], i) => (id === activeCategory) && (
              <Section
                key={id}
                name={id}
                items={items}
                onItemClick={onItemClick}
              />
          ))}
        </div>
    );    
  };

  export default CategoriesListing;
  