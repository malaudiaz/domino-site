import React from "react";
import classNames from "classnames";
import { Smile, Animal, Food, Sport, Transport, Objects, Flags } from "./Svg";

const NavItem = ({ category, isActive, onClick }) => (
  <li
    className={classNames("emoji-nav-item", {
      "emoji-nav-item--active": isActive,
    })}
    onClick={()=>{onClick(category)}}
  >
    {category === "people" && <Smile className="emoji-nav-item__icon" isFilled={isActive}></Smile>}
    {category === "animals_and_nature" && <Animal className="emoji-nav-item__icon" isFilled={isActive}></Animal>}
    {category === "food_and_drink" && <Food className="emoji-nav-item__icon" isFilled={isActive}></Food>}
    {category === "activity" && <Sport className="emoji-nav-item__icon" isFilled={isActive}></Sport>}
    {category === "travel_and_places" && <Transport className="emoji-nav-item__icon" isFilled={isActive}></Transport>}
    {category === "objects" && <Objects className="emoji-nav-item__icon" isFilled={isActive}></Objects>}
    {category === "flags" && <Flags className="emoji-nav-item__icon" isFilled={isActive}></Flags>}
  </li>
);

export default NavItem;
