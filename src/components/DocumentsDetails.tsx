import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Field from "./_Field";

interface Props {
  validation: any;
  handleNext: () => void;
}

const aadharRegex = /^[01]\d{3}[\s-]?\d{4}[\s-]?\d{4}$/;
const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const validation = Yup.object({
  aadharNumber: Yup.string()
    .matches(aadharRegex, "Aadhar is not valid")
    .required("Required."),
  aadharPhoto: Yup.string().required("Required."),
  panNumber: Yup.string()
    .matches(panRegex, "Pan card number is not valid")
    .required("Required."),
  panPhoto: Yup.string().required("Required."),
  profilePhoto: Yup.string().required("Required."),
});

type Initial = Yup.InferType<typeof validation>;

const initialValues: Initial = {
  aadharNumber: "",
  aadharPhoto: "",
  panNumber: "",
  panPhoto: "",
  profilePhoto: "",
};

const DocumentsDetails = ({ handleNext }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        handleNext();
      }}
      validationSchema={validation}
    >
      {(props) => (
        <Form
          className=" flex-wrap gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
             mt-4 max-w-6xl mx-auto"
        >
          <Field
            label="Aadhar Card Number"
            name="aadharNumber"
            type="number"
            value={props.values.aadharNumber}
            onChange={props.handleChange}
            error={
              props.touched.aadharNumber && Boolean(props.errors.aadharNumber)
            }
            helperText={props.touched.aadharNumber && props.errors.aadharNumber}
          />
          <Field
            label="Upload Aadhar Card Photo"
            name="aadharPhoto"
            type="file"
            value={props.values.aadharPhoto}
            onChange={props.handleChange}
            error={
              props.touched.aadharPhoto && Boolean(props.errors.aadharPhoto)
            }
            helperText={props.touched.aadharPhoto && props.errors.aadharPhoto}
          />
          <Field
            label="PAN Card Number"
            name="panNumber"
            type="string"
            value={props.values.panNumber}
            onChange={props.handleChange}
            error={props.touched.panNumber && Boolean(props.errors.panNumber)}
            helperText={props.touched.panNumber && props.errors.panNumber}
          />
          <Field
            label="Upload PAN Card Photo"
            name="panPhoto"
            type="file"
            value={props.values.panPhoto}
            onChange={props.handleChange}
            error={props.touched.panPhoto && Boolean(props.errors.panPhoto)}
            helperText={props.touched.panPhoto && props.errors.panPhoto}
          />
          <Field
            label="Upload Photo"
            name="profilePhoto"
            type="file"
            value={props.values.profilePhoto}
            onChange={props.handleChange}
            error={
              props.touched.profilePhoto && Boolean(props.errors.profilePhoto)
            }
            helperText={props.touched.profilePhoto && props.errors.profilePhoto}
          />

          <button
            className="btn md:col-span-2 lg:col-span-3 mt-4"
            type="submit"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DocumentsDetails;
