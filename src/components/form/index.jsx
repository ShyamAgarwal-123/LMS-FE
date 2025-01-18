import React from "react";
import { Button } from "../ui/button";
import { FormFields } from "./FormFields";

function FormComponet({
  handelSubmit,
  formFields,
  buttonText = "Submit",
  formData,
  setFormData,
}) {
  return (
    <form onSubmit={handelSubmit}>
      <FormFields
        formFields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}

export default FormComponet;
