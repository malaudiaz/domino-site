import styled from "styled-components";
import { UncontrolledTooltip } from "reactstrap";

// Default values
const backgroundColor = "#fff";
const borderColor = "#28a745";

// pointer-events to fix the tooltip flickering when mouseover
const TooltipLeft = styled(UncontrolledTooltip)`
  opacity: 1 !important;
  pointer-events: none;

  .tooltip-inner {
    display: inline-block;
    position: relative;
    text-align: left;
    color: #333;
    background-color: ${backgroundColor};
    border-width: 2px;
    border-style: solid;
    border-color: ${borderColor};
    padding: 10px;
    margin: 0 10px 0 0;
    filter: drop-shadow(rgba(0, 0, 0, 0.4) 0 2px 3px);
  }

  .arrow {
    display: none !important;
  }

  .tooltip-inner::before,
  .tooltip-inner::after {
    content: "";
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .tooltip-inner::after {
    top: calc(50% - 7px);
    border-color: transparent transparent transparent ${backgroundColor};
    border-width: 7px;
  }

  .tooltip-inner::before {
    top: calc(50% - 10px);
    border-color: transparent transparent transparent ${borderColor};
    border-width: 10px;
  }
`;
export default TooltipLeft;
