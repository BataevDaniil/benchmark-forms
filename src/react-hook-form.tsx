import React from "react"
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { count, deep } from "./config"
import { ControllerProps } from "react-hook-form/dist/types/controller"

export const ReactHookForm = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        <RenderField deep={deep} name="input" />
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  )
}

const style = { marginLeft: "20px" }
const RenderField: React.FC<{ deep: number; name: string }> = ({
  deep,
  name,
}) => {
  const { control } = useFormContext()
  if (deep === 0) {
    return null
  }
  return (
    <>
      {new Array(count).fill(undefined).map((_, index) => {
        const newName = `${name}-${index}`
        return (
          <div key={newName} style={style}>
            <Controller
              control={control}
              name={newName}
              render={(props) => (
                <FieldInput
                  // @ts-ignore
                  placeholder={newName}
                  {...props}
                />
              )}
            />
            <RenderField deep={deep - 1} name={newName} />
          </div>
        )
      })}
    </>
  )
}
const FieldInput = ({
  field,
  fieldState,
  formState: _,
  ...props
}: Parameters<ControllerProps["render"]>[0]) => {
  return (
    <div>
      <input {...field} {...props} />
      <div>{fieldState.isTouched && fieldState.error}</div>
    </div>
  )
}
