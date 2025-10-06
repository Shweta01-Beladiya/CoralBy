import React from 'react'
import * as Yup from "yup"

// Newslater : Subscribe 
export const subscribeSchema = Yup.object({
  Email: Yup.string().email().required("Enter Your Email"),
})

// Profile : Personal Information 
export const PersonalInformationSchema = Yup.object({
  firstName: Yup.string().min(2).required("Enter Your FirstName"),
  lastName: Yup.string().min(2).required("Enter Your LastName"),
  MobileNo: Yup.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid mobile number")
    .required("Mobile number is required")
})

// Profile : Address
export const addressSchema = Yup.object({
  firstName: Yup.string().min(2).required("Enter Your FirstName"),
  lastName: Yup.string().min(2).required("Enter Your LastName"),
  MobileNo: Yup.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  zipCode: Yup.string().min(4, 'zip code must be at least 7 digits').required("Zip Code Is Required"),
  address: Yup.string().min(5).required("Enter Your address"),
  city: Yup.string().min(2).required("Enter Your city"),
  state: Yup.string().min(2).required("Enter Your state")

})




// contact us form validation schema
export const contactUsSchema = Yup.object().shape({
  firstName: Yup.string().min(2).required("Enter Your FirstName"),
  lastName: Yup.string().min(2).required("Enter Your LastName"),
  email: Yup.string().email().required("Enter Your Email"),
  subject: Yup.string().min(2).required("Enter Your Subject"),
  comments: Yup.string().min(5).required("Enter Your Comments"),
});



// career job application form validation schema
export const careerJobSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  mobileNo: Yup.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  currentCompany: Yup.string().min(2, "Company name must be at least 2 characters").required("Current company is required"),
  resume: Yup.mixed().required("Resume is required"),
});