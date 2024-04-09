import React from "react";
import { StakeholderDisplayProps } from "./StakeholderDisplay.dto";
import CountryFlag from "@/components/CountryFlag";
import BoldSpan from "@/components/ui-kit/BoldSpan";
import SubtleSpan from "@/components/ui-kit/SubtleSpan";

export const StakeholderDisplay: React.FC<StakeholderDisplayProps> = ({
  currentStakeholderWithTaxRule,
  currentIndex,
  maxIndex,
}) => (
  <>
    <CountryFlag
      countryCode={currentStakeholderWithTaxRule?.taxRule?.countryCode}
    />
    <BoldSpan>{currentStakeholderWithTaxRule?.holder}</BoldSpan>
    <SubtleSpan>{`${currentIndex + 1}/${maxIndex}`}</SubtleSpan>
  </>
);
