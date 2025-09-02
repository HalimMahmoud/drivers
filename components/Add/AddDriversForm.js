import React, { useContext } from "react";

import { Formik, FieldArray } from "formik";
// import { Context } from "../../lib/context";
import { add } from "../../lib/useFirebase";
import DynamicForm from "./DynamicForm";

export default function AddDriversForm({ handleClose }) {
  // const { add } = useContext(Context);
  // const add = () => {};
  return (
    <Formik
      initialValues={{
        newDrivers: [
          {
            name: "",
            num: "",
            id: "",
            approveStatus: "",
            pool: "",
            blocked: false,
            plate: "",
            providerName: ""
          }
        ]
      }}
      onSubmit={
        values => {
          add(values.newDrivers);
          handleClose();
        }
        // alert(JSON.stringify(values.newDrivers, null, 2));
        // }, 500);
      }
    >
      {formikProps => <FieldArray name="newDrivers" component={DynamicForm} />}
    </Formik>
  );
}
