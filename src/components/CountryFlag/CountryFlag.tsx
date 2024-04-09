import React from "react";
import ReactCountryFlag from "react-country-flag";
import { CountryFlagProps } from "./CountryFlag.dto";

const countryCodeMap: { [key: number]: string } = {
  1: "us",
  2: "il",
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  className,
}) => {
  return (
    <ReactCountryFlag
      countryCode={countryCodeMap[countryCode]}
      className={className}
    />
  );
};
