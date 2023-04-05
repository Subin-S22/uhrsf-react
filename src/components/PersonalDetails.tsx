import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import Field from "./_Field";
import { AppContext } from "../store";
import { TYPE } from "../store/reducers/registrationFormReducer";
import axios from "axios";

interface Props {
  validation: any;
  handleNext: () => void;
}

const bloodGroups = [
  { value: "A+", name: "A+" },
  { value: "A-", name: "A-" },
  { value: "B+", name: "B+" },
  { value: "B-", name: "B-" },
  { value: "AB+", name: "AB+" },
  { value: "AB-", name: "AB-" },
  { value: "O+", name: "O+" },
  { value: "O-", name: "O-" },
];

const qualification = [
  { value: "Illiterate", name: "Illiterate" },
  { value: "Primary Education", name: "Primary Education" },
  {
    value: "Secondary Education or high school",
    name: "Secondary Education or high school",
  },
  { value: "Bachelor's Degree", name: "Bachelor's Degree" },
  { value: "Master's Degree", name: "Master's Degree" },
  { value: "Doctorate or higher", name: "Doctorate or higher" },
];

const phoneRegExp =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;

const validation = Yup.object({
  firstAndLastName: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  emailId: Yup.string().email("Invalid Email").required("Required"),
  parentsName: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Phone number should be 10 digits")
    .required("Required"),
  dob: Yup.string().required("DOB is Required"),
  gender: Yup.string().required("Required"),
  bloodGroup: Yup.string().required("Required"),
  qualification: Yup.string().required("Required"),
  profession: Yup.string().required("Required"),
  referredBy: Yup.string(),
  referredByName: Yup.string(),
});

type Initial = Yup.InferType<typeof validation>;

const initialValues: Initial = {
  firstAndLastName: "",
  emailId: "",
  parentsName: "",
  mobileNumber: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  qualification: "",
  profession: "",
  referredBy: "",
  referredByName: "",
};

export default function PersonalDetails({ handleNext }: Props) {
  const store = useContext(AppContext);

  const handleReferral = async (
    e: React.ChangeEvent<HTMLInputElement>,
    props: FormikProps<any>
  ) => {
    try {
      props.handleChange(e);
      if (e.target.value.length > 9) {
        const res = await axios.get(
          `https://csnservernet.tech/uhrsf_dev/api/v1/uhrsf/return-referred-details?referredId=${e.target.value}`
        );
        props.setFieldValue("referredByName", res.data.data.referredName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(store);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        store?.action({
          type: TYPE.add,
          payload: values,
        });
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
            label="Full Name"
            name="firstAndLastName"
            type="text"
            value={props.values.firstAndLastName}
            onChange={props.handleChange}
            error={
              props.touched.firstAndLastName &&
              Boolean(props.errors.firstAndLastName)
            }
            helperText={
              props.touched.firstAndLastName && props.errors.firstAndLastName
            }
          />
          <Field
            label="Father's Name / Mother's Name / Husband's Name"
            name="parentsName"
            type="text"
            value={props.values.parentsName}
            onChange={props.handleChange}
            error={
              props.touched.parentsName && Boolean(props.errors.parentsName)
            }
            helperText={props.touched.parentsName && props.errors.parentsName}
          />

          <Field
            label="Email Address"
            name="emailId"
            type="email"
            value={props.values.emailId}
            onChange={props.handleChange}
            error={props.touched.emailId && Boolean(props.errors.emailId)}
            helperText={props.touched.emailId && props.errors.emailId}
          />
          <Field
            label="Phone Number"
            name="mobileNumber"
            type="tel"
            value={props.values.mobileNumber}
            onChange={props.handleChange}
            error={
              props.touched.mobileNumber && Boolean(props.errors.mobileNumber)
            }
            helperText={props.touched.mobileNumber && props.errors.mobileNumber}
          />
          <Field
            label="Date of Birth"
            name="dob"
            type="date"
            value={props.values.dob}
            onChange={props.handleChange}
            error={props.touched.dob && Boolean(props.errors.dob)}
            helperText={props.touched.dob && props.errors.dob}
          />
          <FormControl
            error={props.touched.gender && Boolean(props.errors.gender)}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              name="gender"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.values.gender}
              label="Gender"
              onChange={props.handleChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
            <FormHelperText>
              {props.touched.gender && props.errors.gender}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={props.touched.bloodGroup && Boolean(props.errors.bloodGroup)}
          >
            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.values.bloodGroup}
              label="Blood Group"
              onChange={props.handleChange}
            >
              {bloodGroups.map((group) => (
                <MenuItem key={group.value} value={group.value}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {props.touched.bloodGroup && props.errors.bloodGroup}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={
              props.touched.qualification && Boolean(props.errors.qualification)
            }
          >
            <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
            <Select
              name="qualification"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.values.qualification}
              label="Qualification"
              onChange={props.handleChange}
            >
              {qualification.map((_) => (
                <MenuItem value={_.value} key={_.value}>
                  {_.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {props.touched.qualification && props.errors.qualification}
            </FormHelperText>
          </FormControl>
          <Field
            label="Profession"
            name="profession"
            type="text"
            value={props.values.profession}
            onChange={props.handleChange}
            error={props.touched.profession && Boolean(props.errors.profession)}
            helperText={props.touched.profession && props.errors.profession}
          />
          <Field
            label="Referral Id"
            name="referredBy"
            type="text"
            value={props.values.referredBy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleReferral(e, props)
            }
            error={props.touched.referredBy && Boolean(props.errors.referredBy)}
            helperText={props.touched.referredBy && props.errors.referredBy}
          />
          <Field
            label="Referral Name"
            name="referredByName"
            type="text"
            value={props.values.referredByName}
            disabled
          />
          <button
            className="btn md:col-span-2 lg:col-span-3 mt-4"
            type="submit"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
}
