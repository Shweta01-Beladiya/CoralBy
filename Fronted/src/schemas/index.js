import React from 'react'
import * as Yup from "yup"


export const subscribeSchema = Yup.object({
  Email : Yup.string().email().required("Enter Your Email"),
})


// contact us form validation schema
export const contactUsSchema = Yup.object().shape({
    firstName: Yup.string().min(2).required("Enter Your FirstName"),
    lastName : Yup.string().min(2).required("Enter Your LastName"),
    email : Yup.string().email().required("Enter Your Email"),
    subject : Yup.string().min(2).required("Enter Your Subject"),
    comments : Yup.string().min(5).required("Enter Your Comments"),
});
