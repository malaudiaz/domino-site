import TooltipTop from "./Style/TooltipTop";
import TooltipBottom from "./Style/TooltipBotton";
import TooltipLeft from "./Style/TooltipLeft";
import TooltipRight from "./Style/TooltipRight";

export default function OutlineTooltip({ placement, message, ...rest }) {
    let CustomTooltip;
    switch (placement) {
      case "top":
        CustomTooltip = TooltipTop;
        break;
      case "bottom":
        CustomTooltip = TooltipBottom;
        break;
      case "left":
        CustomTooltip = TooltipLeft;
        break;
      case "right":
        CustomTooltip = TooltipRight;
        break;
      default:
        CustomTooltip = UncontrolledTooltip;
    }
    return (
      <CustomTooltip placement={placement} target="outlineTooltip">
        {message}
      </CustomTooltip>
    );
};
