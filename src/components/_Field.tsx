import TextField from "@mui/material/TextField";
import React from "react";

interface Options {
  value: string;
  name: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  as?: string;
  options?: Options[];
  error?: boolean | undefined;
  helperText?: string | false | undefined;
}

function _Field({
  label,
  options,
  name,
  as,
  className,
  error,
  helperText,
  ...props
}: Props) {
  return (
    <div className={`flex flex-col items-start ${className}  w-full`}>
      {/* <label htmlFor={name} className="font-roboto text-gray-600">
        {label}
      </label> */}
      <TextField
        id={name}
        name={name}
        className={"w-full"}
        label={label}
        type={props.type}
        variant="outlined"
        InputLabelProps={
          props.type === "file" || props.type === "date" ? { shrink: true } : {}
        }
        multiline={name === "address"}
        rows={4}
        value={props.value}
        onChange={props.onChange}
        error={error}
        helperText={helperText}
        disabled={props.disabled}
      ></TextField>
      {/* <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-red-500 text-[12px] font-roboto">{msg}</div>
        )}
      </ErrorMessage> */}
    </div>
  );
}

export default _Field;
