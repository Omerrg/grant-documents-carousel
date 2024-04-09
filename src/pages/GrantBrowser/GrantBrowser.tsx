import React, { useMemo } from "react";
import { mockGrants } from "@/mockData";
import { usePagination } from "@/hooks/usePagination";
import TaxRulePaginate from "@/components/TaxRulePaginate";
import { StakeholderWithTaxRule, TaxRuleHolders } from "@/types";
import { useSelection } from "@/hooks/useSelection";

export const GrantBrowser: React.FC = () => {
  const availableTaxRules = useMemo(() => {
    const taxRules: TaxRuleHolders[] = [];
    mockGrants.forEach((grant) => {
      grant.taxRules.forEach((taxRule) => {
        const existingTaxRule = taxRules.find(
          (rule) => rule.taxRuleName === taxRule.taxRuleName
        );
        if (!existingTaxRule) {
          taxRules.push({
            taxRuleName: taxRule.taxRuleName,
            countryCode: taxRule.countryCode,
            holders: [grant.stakeholderName],
          });
        } else {
          existingTaxRule.holders.push(grant.stakeholderName);
        }
      });
    });

    return taxRules;
  }, [mockGrants]);

  const { selectedIndexes, selectIndex, toggleSelectAll } = useSelection(
    availableTaxRules.length
  );

  const combinedStakeholdersWithTaxRules: StakeholderWithTaxRule[] =
    useMemo(() => {
      return availableTaxRules
        .filter((_, index) => selectedIndexes.includes(index))
        .flatMap((rule) =>
          rule.holders.map((holder) => ({ holder, taxRule: rule }))
        );
    }, [availableTaxRules, selectedIndexes]);
  
  const { currentIndex, goToNext, goToPrevious } = usePagination(
    combinedStakeholdersWithTaxRules
  );

  const currentStakeholderWithTaxRule =
    combinedStakeholdersWithTaxRules[currentIndex];
  return (
    <div>
      <TaxRulePaginate
        taxRules={availableTaxRules}
        selectIndex={selectIndex}
        onToggleSelectAll={() => toggleSelectAll()}
        gotoNext={goToNext}
        gotoPrevious={goToPrevious}
        currentStakeholderWithTaxRule={currentStakeholderWithTaxRule}
        selectedIndexes={selectedIndexes}
        currentIndex={currentIndex}
        maxIndex={combinedStakeholdersWithTaxRules.length}
      />
    </div>
  );
};
