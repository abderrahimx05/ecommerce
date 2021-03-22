import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomText from "./CustomText";
import { commerce } from "../../../lib/commerce";
const AdressForm = ({ checkoutToken }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const coutries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountries(Object.keys(countries)[0]);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <CustomText required name="firstName" label="First name" />
            <CustomText required name="lastName" label="Last name" />
            <CustomText required name="address1" label="Address" />
            <CustomText required name="email" label="Email" />
            <CustomText required name="city" label="City" />
            <CustomText required name="zip" label="ZIP/Postal code" />
            <Grid item xs={12} sm={12}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value=""
                fullWidth
                onChange={(e) => setShippingCountries(e.target.value)}
              >
                {coutries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select{" "}
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select{" "}
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;
