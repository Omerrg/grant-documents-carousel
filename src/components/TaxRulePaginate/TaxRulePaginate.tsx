import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import TaxRuleListItem from "./TaxRuleListItem";
import { TaxRulePaginateProps } from "./TaxRulePaginate.dto";
import StakeholderDisplay from "./StakeholderDisplay";
import { Divider } from "@mui/material";

const PopperPaper = styled(Paper)({
  maxWidth: "300px",
  maxHeight: "400px",
  overflow: "auto",
});

const CenteredDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > button:focus": {
    outline: "none",
  },
});

const StyledClickableDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const TaxRulePaginate: React.FC<TaxRulePaginateProps> = ({
  taxRules,
  selectIndex,
  onToggleSelectAll,
  gotoNext,
  gotoPrevious,
  currentStakeholderWithTaxRule,
  selectedIndexes,
  currentIndex,
  maxIndex,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const handleClick = () => {
    setOpen((currentOpen) => !currentOpen);
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
    onToggleSelectAll();
  };

  const id = open ? "tax-rule-popper" : undefined;

  const isIndeterminate =
    selectedIndexes.length > 0 && selectedIndexes.length < taxRules.length;
  const isAllSelected = selectedIndexes.length === taxRules.length;

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <CenteredDiv>
        <IconButton
          onClick={gotoPrevious}
          disabled={currentIndex === 0}
        >
          <MdChevronLeft />
        </IconButton>

        <StyledClickableDiv
          ref={anchorRef}
          aria-describedby={id}
          onClick={handleClick}
        >
          <StakeholderDisplay
            currentStakeholderWithTaxRule={currentStakeholderWithTaxRule}
            currentIndex={currentIndex}
            maxIndex={maxIndex}
          />
        </StyledClickableDiv>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          transition
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ]}
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
                    <>
                    <Divider />
                    <TaxRuleListItem
                      key={taxRule.taxRuleName}
                      taxRule={taxRule}
                      isSelected={selectedIndexes.includes(index)}
                      isExpanded={expandedIndexes.includes(index)}
                      onToggleSelect={() => handleToggleSelect(index)}
                      onToggleExpand={() => handleToggleExpand(index)}
                    />
                    </>
                  ))}
                </List>
              </PopperPaper>
            </Fade>
          )}
        </Popper>

        <IconButton
          onClick={gotoNext}
          disableRipple
          disableFocusRipple
          disabled={currentIndex === maxIndex - 1}
        >
          <MdChevronRight />
        </IconButton>
      </CenteredDiv>
    </ClickAwayListener>
  );
};
