import React, { useMemo } from "react";
import { mockGrants } from "@/mockData";
import { usePagination } from "@/hooks/usePagination";
import TaxRulePaginate from "@/components/TaxRulePaginate";
import { TaxRuleHolders } from "@/types";

export const GrantBrowser: React.FC = () => {
  const availableTaxRules = useMemo(() => {
    const taxRules: TaxRuleHolders[] = [];
    mockGrants.forEach((grant) => {
      grant.taxRules.forEach((taxRule) => {
        const existingTaxRule = taxRules.find((rule) => rule.taxRuleName === taxRule.taxRuleName)
        if (
          !existingTaxRule
        ) {
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
  const {
    goToNext,
    goToPrevious,
    currentIndex,
    selectIndex,
    selectAll,
    selectedIndexes,
  } = usePagination(availableTaxRules);

  return (
    <div>
      <TaxRulePaginate
        currentIndex={currentIndex}
        taxRules={availableTaxRules}
        selectedIndexes={selectedIndexes}
        selectIndex={selectIndex}
        selectAll={selectAll}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
};
