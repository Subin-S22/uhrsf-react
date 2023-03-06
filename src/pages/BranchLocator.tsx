import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "..";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import EnhancedTable from "../components/Table";

const initial = {
  state: "",
  city: "",
};

const states = [
  "Andhra Pradesh",
  "Andaman and Nicobar Islands",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadar and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const BranchLocator = () => {
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);

  const onSubmit = async (values) => {
    try {
      if (values.city === "") toast.error("Please select the city");
      const res = await axios.get(
        `${URL}/branch-locator-city?city=${values.city}`
      );
      setBranches(res.data.data);
      if (res.data.data.length === 0) {
        toast.error("No branches in this city.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleState = async (state) => {
    try {
      const res = await axios.get(`${URL}/branch-locator-state?state=${state}`);
      setCities(res.data.cities);
      if (res.data.cities.length === 0)
        toast.error("No branches in this state.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Layout name="barnch locator">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Navbar />
        <main className="flex w-full flex-1 flex-col items-center justify-center bg-gray-300 lg:px-20 px-4 md:px-10 text-center">
          <Formik initialValues={initial} onSubmit={onSubmit}>
            {(props: FormikProps<typeof initial>) => (
              <Form className="bg-white p-16 flex gap-3 flex-col w-[50%] max-w-[500px]">
                <FormControl
                  error={props.touched.state && Boolean(props.errors.state)}
                >
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    name="state"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.state}
                    label="Blood Group"
                    onChange={(e) => {
                      props.handleChange(e);
                      handleState(e.target.value);
                    }}
                  >
                    {states.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {props.touched.state && props.errors.state}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  error={props.touched.city && Boolean(props.errors.city)}
                >
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    name="city"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.city}
                    label="Blood Group"
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                  >
                    {cities.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {props.touched.city && props.errors.city}
                  </FormHelperText>
                </FormControl>

                <button
                  className="btn md:col-span-2 lg:col-span-3 mt-4"
                  type="submit"
                >
                  Search
                </button>
              </Form>
            )}
          </Formik>
        </main>
        {branches.length !== 0 && (
          <section>
            <EnhancedTable title="Branch" data={branches} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default BranchLocator;
