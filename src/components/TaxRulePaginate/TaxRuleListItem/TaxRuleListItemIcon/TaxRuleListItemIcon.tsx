import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const TaxRuleListItemIconWrapper = styled(IconButton)({
  padding: 0,
  marginLeft: "auto",
});

export const TaxRuleListItemIcon: React.FC<TaxRuleListItemIconProps> = ({
  isSelected,
  isExpanded,
  onToggleExpand,
}) => (
  <TaxRuleListItemIconWrapper
    size="small"
    disabled={!isSelected}
    onClick={(e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpand();
    }}
  >
    {isExpanded && isSelected ? <MdExpandLess /> : <MdExpandMore />}
  </TaxRuleListItemIconWrapper>
);
