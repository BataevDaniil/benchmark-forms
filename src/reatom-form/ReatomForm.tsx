import { Field, FieldRenderProps, Form } from "./react-form"
import React from "react"
import { count, deep } from "../config"

const init = {}
export const ReatomForm = () => {
  return (
    <Form initialValues={init} onSubmit={console.log} subscription={{}}>
      {() => (
        <form>
          <RenderField deep={deep} name="input" />
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
            />
            <RenderField deep={deep - 1} name={newName} />
          </div>
        )
      })}
    </>
  )
}
const FieldInput: React.FC<FieldRenderProps<string>> = ({
  input: { onChange, ...input },
  meta,
  ...props
}) => {
  return (
    <div>
      <input
        onChange={(event) => onChange(event.target.value)}
        {...input}
        {...props}
      />
      <div>{meta.touched && meta.error}</div>
    </div>
  )
}
