import { Children, Fragment } from "react";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWithSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return <Fragment key={index}>{child}</Fragment>;
    }
    return child;
  });
  return (
    <ol className="breadcrumb"> {childrenWithSeperator} </ol>
  );
};

export default Breadcrumb;
