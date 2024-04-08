import { GrantObject } from "./types";

export const mockGrants: GrantObject[] = [
  {
    stakeholderName: "Aki Avni",
    taxRules: [{ countryCode: 2, taxRuleName: "Israel - 102 Capital Gains" }],
  },
  {
    stakeholderName: "Allan de Neergaard",
    taxRules: [
      { countryCode: 1, taxRuleName: "United States - NSO (Non-Resident)" },
    ],
  },
  {
    stakeholderName: "Omer Regev",
    taxRules: [
      { countryCode: 1, taxRuleName: "United States - NSO (Non-Resident)" },
    ],
  },
];
