import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import useStyles from "./styles";
import AdressForm from "./container/AdressForm";
import PaymentForm from "./container/PaymentForm";
const steps = ["Shipping address", "Payment details"];
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        history.pushState("/");
      }
    };
    generateToken();
  }, [cart]);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <Typography variant="h5">
          Thank you for your purchase , {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle1">
          Order ref : {order.customer_reference}
        </Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (error) {
    <>
      <Typography variant="h5">Error;{error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        backStep={backStep}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            Checkout
          </Typography>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
