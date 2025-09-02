import React, { useContext, useEffect, useState } from "react";
import { Button, Form, List, Checkbox, Icon } from "semantic-ui-react";
import { useData, update } from "../../lib/useFirebase";
// import { Context } from "../../lib/context";
import { Formik, Form as F, Field as FI } from "formik";

export default function EditDriverForm({ driver, handleClose }) {
  const { drivers } = useData();

  const {
    name,
    id,
    num,
    approveStatus,
    pool,
    blocked,
    providerName,
    plate,
    key
  } = drivers.filter(x => x.key === driver)[0];

  const [toggle, setToggle] = useState(blocked);
  return (
    <Formik
      initialValues={{
        name,
        id,
        num,
        approveStatus,

        providerName,
        pool,
        blocked,
        plate,
        key
      }}
      onSubmit={values => {
        update(values);
        handleClose();
      }}
    >
      {formik => (
        <Form as="div">
          <F>
            <Form.Field>
              <FI name={`name`} placeholder="Driver Name" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`num`} placeholder="Driver Num" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <List>
              <List.Item>
                <Form.Field>
                  <FI name={`id`} placeholder="Driver Link" />
                </Form.Field>
                {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
              </List.Item>
              <List.Item
                floated="right"
                as="a"
                target="_blank"
                rel="noreferrer noopener"
                href={`https://fdm.elmenus.com/driver-profile/${formik.values.id}/orders`}
              >
                <Icon circular size="small" name="linkify" />
              </List.Item>
            </List>

            <Form.Field>
              <FI name={`approveStatus`} placeholder="Driver Approval Status" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <Form.Field>
              <FI name={`providerName`} placeholder="Provider Name" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>

            <Form.Field>
              <FI
                as={Checkbox}
                name={`blocked`}
                label={formik.values.blocked ? "Blocked" : "Not Blocked"}
                toggle
                onChange={() => {
                  formik.values.blocked = !formik.values.blocked;
                }}
                checked={formik.values.blocked}
              />
              {/* {console.log(formik.values)} */}
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`plate`} placeholder="Vehicle Number" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            <Form.Field>
              <FI name={`pool`} placeholder="Pool" />
              {/* Wrapper for Controllable Input Component from Formik Library 
        (to avoid boilerplate of rewriting handleChange, value, etc...) */}
            </Form.Field>
            {/* <Checkbox
            as={FI}
              toggle
              label="Check this box"
              onChange={() => setToggle(!toggle)}
              checked={toggle}
            /> */}
            <Button type="submit" primary>
              Update
            </Button>
          </F>
        </Form>
      )}
    </Formik>
  );
}
