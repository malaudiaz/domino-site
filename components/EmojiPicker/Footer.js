import NavItem from "./NavItem";
import classNames from "classnames";
import { Smile, Animal, Food, Transport, Objects, Flags } from "./Svg";
  
const Footer = ({
    className,
    categories,
    activeCategory,
    onCategoryClick,
  }) => {
    return (

      <div className="emoji-footer">

        <nav className="emoji-footer__nav">
          <ul className="emoji-footer__nav-list">

          {categories.map(category => (
            <NavItem
              key={category}
              category={category}
              isActive={category === activeCategory}
              onClick={onCategoryClick}
            />
          ))}


          </ul>
        </nav>



</div>



    );
  };
  
  export default Footer;