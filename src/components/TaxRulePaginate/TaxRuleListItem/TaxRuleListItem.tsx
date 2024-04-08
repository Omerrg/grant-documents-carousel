import React from "react";
import {
  ListItemButton,
  Checkbox,
  ListItemText,
  IconButton,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CountryFlag from "@/components/CountryFlag"; // Ensure this is correctly imported
import { TaxRuleHolders } from "@/types";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

interface TaxRuleListItemProps {
  taxRule: TaxRuleHolders;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
}

const TaxRuleListItemContainer = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TaxRuleListItemIcon = styled(IconButton)({
  padding: 0,
  marginLeft: "auto",
});

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <CountryFlag countryCode={taxRule.countryCode} />
              <div
                style={{
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {taxRule.taxRuleName}
              </div>
              <span
                style={{ marginLeft: "auto", color: grey[600], paddingLeft: 8 }}
              >
                ({taxRule.holders.length} Grants)
              </span>
            </div>
          }
        />
        <TaxRuleListItemIcon
          size="small"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onToggleExpand();
          }}
        >
          {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
        </TaxRuleListItemIcon>
      </TaxRuleListItemContainer>
      <Collapse in={isExpanded && isSelected} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {taxRule.holders.map((holder) => (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={holder} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
