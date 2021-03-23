import React from "react";
import { TextField, Grid, useFormControl } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const CustomText = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        defaultValue=""
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  );
};

export default CustomText;
