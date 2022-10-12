import { Formik, Form } from "formik";
import React from "react";
import Field from "./_Field";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import moment from "moment";

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
  { value: "BE", name: "B.E" },
  { value: "BA", name: "BA" },
  { value: "BSc", name: "B.Sc" },
];

const phoneRegExp =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;

const validation = Yup.object({
  name: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  email: Yup.string().email("Invalid Email").required("Required"),
  guardian: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  phonenumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Phone number should be 10 digits")
    .required("Required"),
  dateofbirth: Yup.string().required("DOB is Required"),
  gender: Yup.string().required("Required"),
  bloodgroup: Yup.string().required("Required"),
  qualification: Yup.string().required("Required"),
  profession: Yup.string().required("Required"),
});

type Initial = Yup.InferType<typeof validation>;

const initialValues: Initial = {
  name: "",
  email: "",
  guardian: "",
  phonenumber: "",
  dateofbirth: "",
  gender: "",
  bloodgroup: "",
  qualification: "",
  profession: "",
};

export default function PersonalDetails({ handleNext }: Props) {
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
            label="Full Name"
            name="name"
            type="text"
            value={props.values.name}
            onChange={props.handleChange}
            error={props.touched.name && Boolean(props.errors.name)}
            helperText={props.touched.name && props.errors.name}
          />
          <Field
            label="Father's Name / Mother's Name / Husband's Name"
            name="guardian"
            type="text"
            value={props.values.guardian}
            onChange={props.handleChange}
            error={props.touched.guardian && Boolean(props.errors.guardian)}
            helperText={props.touched.guardian && props.errors.guardian}
          />

          <Field
            label="Email Address"
            name="email"
            type="email"
            value={props.values.email}
            onChange={props.handleChange}
            error={props.touched.email && Boolean(props.errors.email)}
            helperText={props.touched.email && props.errors.email}
          />
          <Field
            label="Phone Number"
            name="phonenumber"
            type="tel"
            value={props.values.phonenumber}
            onChange={props.handleChange}
            error={
              props.touched.phonenumber && Boolean(props.errors.phonenumber)
            }
            helperText={props.touched.phonenumber && props.errors.phonenumber}
          />
          <Field
            label="Date of Birth"
            name="dateofbirth"
            type="date"
            value={props.values.dateofbirth}
            onChange={props.handleChange}
            error={
              props.touched.dateofbirth && Boolean(props.errors.dateofbirth)
            }
            helperText={props.touched.dateofbirth && props.errors.dateofbirth}
          />
          {/* <_Field
            label="Gender"
            name="gender"
            as="select"
            options={[
              { value: "male", name: "Male" },
              { value: "female", name: "Female" },
              { value: "others", name: "Others" },
            ]}
          /> */}
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
            error={props.touched.bloodgroup && Boolean(props.errors.bloodgroup)}
          >
            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
            <Select
              name="bloodgroup"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.values.bloodgroup}
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
              {props.touched.bloodgroup && props.errors.bloodgroup}
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
          <FormControl
            error={props.touched.profession && Boolean(props.errors.profession)}
          >
            <InputLabel id="demo-simple-select-label">Profession</InputLabel>
            <Select
              name="profession"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.values.profession}
              label="Profession"
              onChange={props.handleChange}
            >
              {[
                { value: "Public sector", name: "Public Sector" },
                { value: "Private sector", name: "Private Sector" },
                { value: "others", name: "Others" },
              ].map((_) => (
                <MenuItem key={_.value} value={_.value}>
                  {_.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {props.touched.profession && props.errors.profession}
            </FormHelperText>
          </FormControl>
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
}
