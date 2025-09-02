import React from "react";
import { Checkbox, Input, Button, Form, Segment } from "semantic-ui-react";
import { Form as F, Field as FI } from "formik";
export default function DynamicForm({ form, remove, push }) {
  return (
    <Form as="div">
      {/* Form Component from Semantic UI React Library to add CSS style
          ->  The added "as" prop to be div element to avoid conflecting
              with next Formik Wrapper which adds another form element */}
      <F>
        {/* Wrapper for Controllable Form Component from Formik Library 
        (to avoid boilerplate of rewriting handleSubmit, handleReset, etc...) */}
        {form.values.newDrivers.map((newDriver, index) => (
          <Segment key={index}>
            <Form.Field>
              <FI name={`newDrivers.${index}.name`} placeholder="Driver Name" />
              {/* Wrapper for Controllable Input Component from Formik Library 
               (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`newDrivers.${index}.num`} placeholder="Driver Num" />
              {/* Wrapper for Controllable Input Component from Formik Library 
               (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`newDrivers.${index}.id`} placeholder="Driver Link" />
              {/* Wrapper for Controllable Input Component from Formik Library 
               (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <Form.Field>
              <FI
                name={`newDrivers.${index}.approveStatus`}
                placeholder="Driver Approval Status"
              />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI
                name={`newDrivers.${index}.providerName`}
                placeholder="Provider Name"
              />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <Form.Field>
              <FI
                as={Checkbox}
                name={`blocked`}
                label={form.values.blocked ? "Blocked" : "Not Blocked"}
                toggle
                onChange={() => {
                  form.values.blocked = !form.values.blocked;
                }}
                checked={form.values.blocked}
              />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <Form.Field>
              <FI
                name={`newDrivers.${index}.plate`}
                placeholder="Vehicle Number"
              />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`newDrivers.${index}.pool`} placeholder="Pool" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Button type="button" negative onClick={() => remove(index)}>
              -
            </Button>
          </Segment>
        ))}
        <Button
          positive
          type="button"
          onClick={() => push({ name: "", num: "", id: "" })}
        >
          +
        </Button>
        <Button primary type="submit">
          Submit
        </Button>
      </F>
    </Form>
  );
}
