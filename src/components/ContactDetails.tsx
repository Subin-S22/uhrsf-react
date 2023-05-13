import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import Field from "./_Field";
import { AppContext } from "../store";
import { TYPE } from "../store/reducers/registrationFormReducer";
import { State, City, ICity } from "country-state-city";

interface Props {
  validation: any;
  handleNext: () => void;
}

const validation = Yup.object({
  address: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().max(6, "too long!").required("Required"),
  nationality: Yup.string(),
});

type Initial = Yup.InferType<typeof validation>;

let initialValues: Initial = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  nationality: "INDIAN",
};

function ContactDetails({ handleNext }: Props) {
  const store = useContext(AppContext);
  const [cities, setCities] = useState<ICity[] | null>([]);

  console.log(State.getStatesOfCountry("IN"));
  initialValues = store?.state.registration?.address
    ? store.state.registration
    : initialValues;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        store?.action({
          type: TYPE.add,
          payload: values,
        });
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
            label="Address"
            name="address"
            type="text"
            as="textarea"
            className="lg:col-span-3"
            value={props.values.address}
            onChange={props.handleChange}
            error={props.touched.address && Boolean(props.errors.address)}
            helperText={props.touched.address && props.errors.address}
          />
          <Field
            label="State"
            name="state"
            as="select"
            options={State.getStatesOfCountry("IN").map((state) => ({
              name: state.name,
              value: state.name,
            }))}
            value={props.values.state}
            onChange={(e) => {
              props.setFieldValue("state", e.target.value);
              console.log("states", props.values);

              const state = State.getStatesOfCountry("IN").find(
                (state) => state.name === e.target.value
              );

              if (!state) return;

              setCities(
                City.getCitiesOfState(state?.countryCode, state?.isoCode)
              );
            }}
            error={props.touched.state && Boolean(props.errors.state)}
            helperText={props.touched.state && props.errors.state}
          />
          <Field
            label="City"
            name="city"
            as="select"
            options={cities?.map((city) => ({
              name: city.name,
              value: city.name,
            }))}
            value={props.values.city}
            onChange={(e) => props.setFieldValue("city", e.target.value)}
            error={props.touched.city && Boolean(props.errors.city)}
            helperText={props.touched.city && props.errors.city}
          />
          <Field
            label="Pin Code"
            name="pincode"
            type="number"
            value={props.values.pincode}
            onChange={props.handleChange}
            error={props.touched.pincode && Boolean(props.errors.pincode)}
            helperText={props.touched.pincode && props.errors.pincode}
          />
          <Field
            label="Nationality"
            name="nationality"
            type="text"
            value={props.values.nationality}
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

export default ContactDetails;
