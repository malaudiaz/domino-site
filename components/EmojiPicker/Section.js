import React from "react";

const Section = ({ name, items, onItemClick }) => (
    <section
      id={name}
    >
      <div className="section__icons-list">
        {items.map(({ id, value }) => (
          <div
            className="section__icon-wrapper"
            key={id}
            onClick={() => {
              onItemClick({ id, value });
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </section>
  ); 
  export default Section;
  