import { Formik, Form, Field, FieldProps } from "formik"

import React from "react"
import { count, deep } from "./config"

const init = { "input-0": "112" }
export const FormikForm = () => {
  return (
    <Formik
      initialValues={init}
      onSubmit={console.log}
      validate={() => ({ "input-0": "error" })}
    >
      <Form>
        <RenderField deep={deep} name="input" />
      </Form>
    </Formik>
  )
}

const style = { marginLeft: "20px" }
const RenderField: React.FC<{ deep: number; name: string }> = ({
  deep,
  name,
}) => {
  if (deep === 0) {
    return null
  }
  return (
    <>
      {new Array(count).fill(undefined).map((_, index) => {
        const newName = `${name}-${index}`
        return (
          <div key={newName} style={style}>
            <Field
              type="text"
              name={newName}
              placeholder={newName}
              component={FieldInput}
            />
            <RenderField deep={deep - 1} name={newName} />
          </div>
        )
      })}
    </>
  )
}
const FieldInput: React.FC<FieldProps<string>> = ({
  field,
  meta = {},
  form: _,
  ...props
}) => {
  return (
    <div>
      <input {...field} {...props} />
      <div>{meta.touched && meta.error}</div>
    </div>
  )
}
