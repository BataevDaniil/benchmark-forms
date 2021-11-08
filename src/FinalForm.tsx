import { Field, FieldRenderProps, Form } from "react-final-form"
import React from "react"
import { count, deep } from "./config"

export const FinalForm = () => {
  return (
    <Form onSubmit={console.log} subscription={{}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RenderField deep={deep} name="input" />
          <button type="submit">submit</button>
        </form>
      )}
    </Form>
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
              name={newName}
              placeholder={newName}
              component={FieldInput}
              subscription={{ value: true }}
            />
            <RenderField deep={deep - 1} name={newName} />
          </div>
        )
      })}
    </>
  )
}
const FieldInput: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
  ...props
}) => {
  return (
    <div>
      <input {...input} {...props} />
      <div>{meta.touched && meta.error}</div>
    </div>
  )
}
