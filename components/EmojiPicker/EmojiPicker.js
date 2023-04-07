import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import CategoriesListing from "./CategoriesListing";
import emojis from "emojilib/emojis.json";

const EmojiPicker = ({onSelect}) => {
  const [activeCategory, setActiveCategory] = useState("people");

  const categories = [
    "people",
    "animals_and_nature",
    "food_and_drink",
    "activity",
    "travel_and_places",
    "objects",
    "flags",
  ];

  const fillEntries = () => {
    let result = [];

    categories.map((cat, idx) => {
      let arr = [];

      Object.entries(emojis).forEach(([key, value]) => {
        if (cat === value.category) {
          arr.push({ id: key, value: value.char });
        }
      });

      result.push([cat, arr]);
    });

    return result;
  };

  const emojiEntries = fillEntries();

  const scrollToCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <div id="emoji" className="emoji-picker">
      <CategoriesListing 
        activeCategory={activeCategory}
        emoji={emojiEntries} 
        onItemClick={onSelect}
      />
      <Footer 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryClick={scrollToCategory}
      />
    </div>
  );
};

function useActiveCategoryFromScroll(
  scrolledSections,
  setActiveCategory
) {
  useEffect(() => {
    const isScrolledFlags = scrolledSections.map((x) => x.isScrolled);
    const lastScrolledIndex = isScrolledFlags.findIndex(
      (isScrolled, i) => isScrolled && !isScrolledFlags[i + 1]
    );
    const lastCategory = categories[lastScrolledIndex];

    if (!lastCategory) {
      return;
    }

    setActiveCategory(lastCategory);
  }, [scrolledSections, setActiveCategory]);
}

function useUsageCountMap() {
  const [usageCountMap, setUsageCountMap] = useState({});

  const setEmojiCount = (emojiItem) => {
    const usageCount = usageCountMap[emojiItem.id];
    if (usageCount) {
      setUsageCountMap({ ...usageCountMap, [emojiItem.id]: usageCount + 1 });
    } else {
      setUsageCountMap({ ...usageCountMap, [emojiItem.id]: 1 });
    }
  };
  return { usageCountMap, setEmojiCount };
}


export default EmojiPicker;
