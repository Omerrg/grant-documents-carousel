import React from "react";
import {
  ListItemButton,
  Checkbox,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import CountryFlag from "@/components/CountryFlag";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { TaxRuleListItemProps } from "./TaxRuleListItem.dto";
import TaxRuleListItemIcon from "./TaxRuleListItemIcon";

const TaxRuleListItemContainer = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PrimaryContentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
});

const TaxRuleNameContainer = styled("div")({
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const GrantsCountSpan = styled("span")(({ theme }) => ({
  marginLeft: "auto",
  color: grey[600],
  paddingLeft: theme.spacing(1),
}));

export const TaxRuleListItem: React.FC<TaxRuleListItemProps> = ({
  taxRule,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
}) => {
  return (
    <>
      <TaxRuleListItemContainer dense onClick={() => onToggleExpand()}>
        <Checkbox
          edge="start"
          checked={isSelected}
          tabIndex={-1}
          disableRipple
          onChange={onToggleSelect}
          onClick={(e) => e.stopPropagation()}
        />
        <ListItemText
          primary={
            <PrimaryContentContainer>
              <CountryFlag countryCode={taxRule.countryCode} />
              <TaxRuleNameContainer>{taxRule.taxRuleName}</TaxRuleNameContainer>
              <GrantsCountSpan>
                ({taxRule.holders.length} Grants)
              </GrantsCountSpan>
            </PrimaryContentContainer>
          }
        />
        <TaxRuleListItemIcon
          isExpanded={isExpanded}
          isSelected={isSelected}
          onToggleExpand={onToggleExpand}
        />
      </TaxRuleListItemContainer>
      <Collapse in={isExpanded && isSelected} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {taxRule.holders.map((holder) => (
            <ListItemButton key={holder}>
              <ListItemText primary={holder} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
