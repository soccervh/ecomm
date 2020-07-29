import React, { Fragment, useState } from "react";

interface ShippingBillingInterface {
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    user: any;
    id?: number;
  };
  billingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    user: any;
    id?: number;
  };
  setShippingAddress?: (v) => {};
  setBillingAddress?: (v) => {};
}

export const ShippingBillingContext = React.createContext({
  setShippingAddress: (v) => {},
  setBillingAddress: (v) => {},
  shippingAddress: {} as any,
  billingAddress: {} as any,
});
export const ShippingBillingProvider = ({ children }) => {
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});

  return (
    <ShippingBillingContext.Provider
      value={{
        shippingAddress,
        setShippingAddress,
        billingAddress,
        setBillingAddress,
      }}
    >
      <Fragment>{children}</Fragment>
    </ShippingBillingContext.Provider>
  );
};
