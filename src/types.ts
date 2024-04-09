export interface TaxObject {
  countryCode: number;
  taxRuleName: string;
}

export interface GrantObject {
  stakeholderName: string;
  taxRules: TaxObject[];
}

export interface TaxRuleHolders {
  countryCode: number;
  taxRuleName: string;
  holders: string[];
}

export interface StakeholderWithTaxRule {
  holder: string;
  taxRule: TaxRuleHolders;
}
