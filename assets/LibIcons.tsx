import React from "react";

const placeholder = (name: string) =>
  function Icon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width={24}
        height={24}
        {...props}
      >
        <title>{name}</title>
        <rect width="24" height="24" rx="4" opacity="0.15" />
      </svg>
    );
  };

export const CoinBase = placeholder("CoinBase");
export const MetaMask = placeholder("MetaMask");
export const PhantomWallet = placeholder("PhantomWallet");
export const TrustWallet = placeholder("TrustWallet");
