import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import Field from "./_Field";
import { AppContext } from "../store";
import { TYPE } from "../store/reducers/registrationFormReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "..";

interface Props {
  validation: any;
  handleNext: () => void;
}

const aadharRegex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;
const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const validation = Yup.object({
  aadharcard: Yup.string()
    .matches(aadharRegex, "Aadhar is not valid")
    .required("Required."),
  aadharCardLink: Yup.string().required("Required."),
  pancard: Yup.string()
    .matches(panRegex, "Pan card number is not valid")
    .required("Required."),
  panCardLink: Yup.string().required("Required."),
  memberPhotoLink: Yup.string().required("Required."),
});

type Initial = Yup.InferType<typeof validation>;

const initialValues: Initial = {
  aadharcard: "",
  aadharCardLink: "",
  pancard: "",
  panCardLink: "",
  memberPhotoLink: "",
};

export const memberRegister = async (reqBody) => {
  try {
    const res = await axios.post(`${URL}/member-register`, reqBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Member Registered Successfully");
    return res;
  } catch (err) {
    throw err;
  }
};

const DocumentsDetails = ({ handleNext }: Props) => {
  const store = useContext(AppContext);

  const [photos, setPhotos] = useState<{
    aadharPhoto: any;
    pancardPhoto: any;
    memberPhoto: any;
  }>({
    aadharPhoto: "",
    pancardPhoto: "",
    memberPhoto: "",
  });

  const addMembers = async (values) => {
    try {
      const formData = new FormData();

      if (photos.aadharPhoto instanceof Object) {
        formData.append("aadharCard", photos.aadharPhoto);
      } else {
        formData.append("aadharCard", new Blob([new Uint8Array([])]));
      }
      if (photos.pancardPhoto instanceof Object) {
        formData.append("pancard", photos.pancardPhoto);
      } else {
        formData.append("pancard", new Blob([new Uint8Array([])]));
      }
      if (photos.memberPhoto instanceof Object) {
        formData.append("memberPhoto", photos.memberPhoto);
      } else {
        formData.append("memberPhoto", new Blob([new Uint8Array([])]));
      }

      delete values.aadharCardLink;
      delete values.panCardLink;
      delete values.memberPhotoLink;
      formData.append(
        "memberRegister",
        JSON.stringify(store?.state.registration)
      );
      await memberRegister(formData);
      toast.success("Successfully registered");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        store?.action({
          type: TYPE.add,
          payload: values,
        });

        addMembers(values);
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
            name="aadharcard"
            type="number"
            value={props.values.aadharcard}
            onChange={props.handleChange}
            error={props.touched.aadharcard && Boolean(props.errors.aadharcard)}
            helperText={props.touched.aadharcard && props.errors.aadharcard}
          />
          <Field
            label="Upload Aadhar Card Photo"
            name="aadharCardLink"
            type="file"
            value={props.values.aadharCardLink}
            onChange={(e) => {
              props.handleChange(e);
              setPhotos(e.target.files?.[0] as any);
            }}
            error={
              props.touched.aadharCardLink &&
              Boolean(props.errors.aadharCardLink)
            }
            helperText={
              props.touched.aadharCardLink && props.errors.aadharCardLink
            }
          />
          <Field
            label="PAN Card Number"
            name="pancard"
            type="string"
            value={props.values.pancard}
            onChange={props.handleChange}
            error={props.touched.pancard && Boolean(props.errors.pancard)}
            helperText={props.touched.pancard && props.errors.pancard}
          />
          <Field
            label="Upload PAN Card Photo"
            name="panCardLink"
            type="file"
            value={props.values.panCardLink}
            onChange={(e) => {
              props.handleChange(e);
              setPhotos(e.target.files?.[0] as any);
            }}
            error={
              props.touched.panCardLink && Boolean(props.errors.panCardLink)
            }
            helperText={props.touched.panCardLink && props.errors.panCardLink}
          />
          <Field
            label="Upload Photo"
            name="memberPhotoLink"
            type="file"
            value={props.values.memberPhotoLink}
            onChange={(e) => {
              props.handleChange(e);
              setPhotos(e.target.files?.[0] as any);
            }}
            error={
              props.touched.memberPhotoLink &&
              Boolean(props.errors.memberPhotoLink)
            }
            helperText={
              props.touched.memberPhotoLink && props.errors.memberPhotoLink
            }
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
