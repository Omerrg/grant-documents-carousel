import { StakeholderWithTaxRule, TaxRuleHolders } from "@/types";

export interface TaxRulePaginateProps {
  taxRules: TaxRuleHolders[];
  selectIndex: (index: number) => void;
  onToggleSelectAll: () => void;
  gotoNext: () => void;
  gotoPrevious: () => void;
  currentStakeholderWithTaxRule: StakeholderWithTaxRule;
  selectedIndexes: number[];
  currentIndex: number;
  maxIndex: number;
}
