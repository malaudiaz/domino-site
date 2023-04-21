import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function DropDownMenu({ idx, items, onMenuSelection }) {
  const value = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      id={`menu_${idx}`}
      isOpen={dropdownOpen}
      toggle={toggle}
      direction={"start"}
    >
      <DropdownToggle tag="a">
        <i className="bi bi-three-dots-vertical"></i>
      </DropdownToggle>
      <DropdownMenu>
        {items.map(({ text, key, icon }, index) =>
          text !== "-" ? (
            <DropdownItem
              key={index}
              onClick={() => onMenuSelection(key, idx)}
              className={icon !== "" ? icon : ""}
            >
              {" "}
              {text}
            </DropdownItem>
          ) : (
            <DropdownItem key={index} divider />
          )
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
