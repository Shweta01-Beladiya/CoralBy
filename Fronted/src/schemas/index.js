import React from 'react'
import * as Yup from "yup"


export const subscribeSchema = Yup.object({
  Email : Yup.string().email().required("Enter Your Email"),
})
