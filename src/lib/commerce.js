import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  process.env.REACT_AP_CHEC_PUBLIC_KEY,
  true
);
