import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CountryFlag from "@/components/CountryFlag"; // Ensure this is correctly imported
import { TaxRuleHolders } from "@/types";
import { grey } from "@mui/material/colors";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import TaxRuleListItem from "./TaxRuleListItem";

interface TaxRulePaginateProps {
  currentIndex: number;
  taxRules: TaxRuleHolders[];
  onNext: () => void;
  onPrevious: () => void;
  selectedIndexes: number[];
  selectIndex: (index: number) => void;
  selectAll: (selectAll: boolean) => void;
}

const PopperPaper = styled(Paper)({
  maxWidth: "300px",
  maxHeight: "400px",
  overflow: "auto",
});

const CenteredDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledClickableDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const BoldSpan = styled("span")({
  fontWeight: "bold",
});

const SubtleSpan = styled("span")({
  margin: "0 8px",
  color: grey[600],
});

export const TaxRulePaginate: React.FC<TaxRulePaginateProps> = ({
  currentIndex,
  taxRules,
  onNext,
  onPrevious,
  selectedIndexes,
  selectIndex,
  selectAll,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleToggleSelect = (index: number) => {
    selectIndex(index);
  };

  const handleToggleExpand = (index: number) => {
    if (!selectedIndexes.includes(index)) {
      return;
    }
    const newExpandedIndexes = [...expandedIndexes];
    const position = newExpandedIndexes.indexOf(index);
    if (position > -1) {
      newExpandedIndexes.splice(position, 1);
    } else {
      newExpandedIndexes.push(index);
    }
    setExpandedIndexes(newExpandedIndexes);
  };

  const handleSelectAllClick = () => {
    selectAll(selectedIndexes.length !== taxRules.length);
  };

  const open = Boolean(anchorEl);
  const id = open ? "tax-rule-popper" : undefined;

  const isIndeterminate =
    selectedIndexes.length > 0 && selectedIndexes.length < taxRules.length;
  const isAllSelected = selectedIndexes.length === taxRules.length;
  const currentRule = selectedIndexes.includes(currentIndex)
    ? taxRules[currentIndex]
    : taxRules.filter((_, index) => selectedIndexes.includes(index))[0];

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <CenteredDiv>
        <IconButton onClick={onPrevious} disabled={currentIndex === 0}>
          <MdChevronLeft />
        </IconButton>

        <StyledClickableDiv aria-describedby={id} onClick={handleClick}>
          <CountryFlag countryCode={currentRule.countryCode} />
          <BoldSpan>{currentRule.taxRuleName}</BoldSpan>
          <SubtleSpan>{`${
            taxRules
              .filter((_, index) => selectedIndexes.includes(index))
              .indexOf(currentRule) + 1
          }/${selectedIndexes.length}`}</SubtleSpan>
        </StyledClickableDiv>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <PopperPaper>
                <List dense>
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={handleSelectAllClick}
                  >
                    <Checkbox
                      edge="start"
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary="Select All" />
                  </ListItemButton>
                  {taxRules.map((taxRule, index) => (
                    <TaxRuleListItem
                      key={taxRule.taxRuleName} // Ensure stakeholder names are unique
                      taxRule={taxRule}
                      isSelected={selectedIndexes.includes(index)}
                      isExpanded={expandedIndexes.includes(index)}
                      onToggleSelect={() => handleToggleSelect(index)}
                      onToggleExpand={() => handleToggleExpand(index)}
                    />
                  ))}
                </List>
              </PopperPaper>
            </Fade>
          )}
        </Popper>

        <IconButton
          onClick={onNext}
          disabled={currentIndex === selectedIndexes.length - 1}
        >
          <MdChevronRight />
        </IconButton>
      </CenteredDiv>
    </ClickAwayListener>
  );
};
