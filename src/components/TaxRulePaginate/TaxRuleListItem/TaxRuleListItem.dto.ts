import { TaxRuleHolders } from "@/types";

export interface TaxRuleListItemProps {
  taxRule: TaxRuleHolders;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
}
