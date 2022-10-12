import {
  Box,
  Button,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle as Check } from "react-icons/ai";
import * as Yup from "yup";
import ContactDetails from "../components/ContactDetails";
import DocumentsDetails from "../components/DocumentsDetails";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import PersonalDetails from "../components/PersonalDetails";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  email: Yup.string().email("Invalid Email").required("Required"),
});

const steps = ["Personal Details", "Contact Details", "Documents"];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [Current, setCurrent] = useState({ p: PersonalDetails });
  const handleNext = () => {
    if (activeStep < 2) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setCurrent({ p: PersonalDetails });
        break;
      case 1:
        setCurrent({ p: ContactDetails });
        break;
      case 2:
        setCurrent({ p: DocumentsDetails });
        break;
      default:
        setCurrent({ p: PersonalDetails });
    }
  }, [activeStep]);

  return (
    <Layout name="Registration">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Navbar />
        <main className="flex w-full flex-1 flex-col items-center justify-center bg-gray-300 lg:px-20 px-4 md:px-10 text-center">
          <div className="shadow-xl rounded-md p-4 md:p-8 w-full mt-6 bg-white m-16">
            <h1 className="text-xl font-semibold font-roboto underline-offset-4 underline">
              REGISTRATION FORM FOR UHRSF VOLUNTEER
            </h1>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="mt-8"
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {/* <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </Box>
            <Current.p validation={validation} handleNext={handleNext} />
          </div>
        </main>

        {/* <footer className="flex h-24 w-full items-center justify-center border-t"></footer> */}
      </div>
    </Layout>
  );
};

export default Home;
