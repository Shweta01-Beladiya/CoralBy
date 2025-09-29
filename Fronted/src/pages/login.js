import React, { useState, useRef, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import hand from '../images/hand.png';
import register from '../images/register.png';
import '../styles/r_style.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(56);
  const [maskedPassword, setMaskedPassword] = useState("");


  const inputRefs = useRef([]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const forgotPassSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const registerSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const OTP_LENGTH = 4;
  const otpSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP must be digits only")
      .length(OTP_LENGTH, `OTP must be exactly ${OTP_LENGTH} digits`)
      .required("OTP is required"),
  });
  const confirmSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePassword1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

 const handleOtpChange = (e, index, values, setFieldValue) => {
  const inputValue = e.target.value;
  
  // Handle paste event - check if multiple characters are being entered
  if (inputValue.length > 1) {
    // This is likely a paste event
    const pastedValue = inputValue.slice(0, OTP_LENGTH); 
    let newOtp = values.otp.split('');
    
  
    for (let i = 0; i < pastedValue.length && (index + i) < OTP_LENGTH; i++) {
      if (/^\d$/.test(pastedValue[i])) {
        newOtp[index + i] = pastedValue[i];
      }
    }
   
    setFieldValue('otp', newOtp.join(''));
    
    const nextIndex = Math.min(index + pastedValue.length, OTP_LENGTH - 1);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
    
    return;
  }
  
 
  if (/^\d$/.test(inputValue) || inputValue === '') {
    let newOtp = values.otp.split('');
    newOtp[index] = inputValue;
    setFieldValue('otp', newOtp.join(''));
    

    if (inputValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }
};


const handleKeyDown = (e, index, values, setFieldValue) => {

  if (e.key === 'Backspace') {
    let newOtp = values.otp.split('');
    
    if (newOtp[index]) {

      newOtp[index] = '';
      setFieldValue('otp', newOtp.join(''));
    } else if (index > 0) {
   
      newOtp[index - 1] = '';
      setFieldValue('otp', newOtp.join(''));
      inputRefs.current[index - 1]?.focus();
    }
  }
  
  if (e.key === 'ArrowLeft' && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
  if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
    inputRefs.current[index + 1]?.focus();
  }
};

  useEffect(() => {
    let timer;
    if (isModalOpen2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isModalOpen2, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetOtpModal = () => {
    setOtp(['', '', '', '']);
    setCountdown(56);
  };

  const handleVerification = () => {

    setIsModalOpen2(false);
    setIsModalOpen3(true);
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('New password:', newPassword);
    setIsModalOpen3(false);
    alert('Password reset successfully!');

    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!isModalOpen && !isModalOpen1 && !isModalOpen2 && !isModalOpen3 && (
        <div className=" bg-white rounded-lg shadow-md p-8 r_container320">
          <div className="flex justify-center items-center gap-3">
            <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
            <img src={hand} alt="" />
          </div>

          <p className="text-gray-500 text-center mt-1">
            Shop millions of products in one place.
          </p>

          <div className="mt-6">
            {/* <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md mb-2">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✕</span>
                <span className="text-red-600 text-sm font-medium">
                 Incorrect password
                </span>
              </div>
            </div> */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form submitted:", values);
                alert("Login Successful 🚀");
              }}
            >
              {({ isSubmitting }) => (

                <Form>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>


                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Field name="password">
                        {({ field, form }) => {
                          // Show password or mask with *
                          const displayValue = showPassword
                            ? field.value
                            : "*".repeat(field.value?.length || 0);

                          const handleChange = (e) => {
                            const realValue = e.target.value;

                            if (showPassword) {
                              form.setFieldValue("password", realValue);
                            } else {

                              const oldValue = field.value || "";
                              if (realValue.length > displayValue.length) {

                                const newChar = realValue[realValue.length - 1];
                                form.setFieldValue("password", oldValue + newChar);
                              } else {

                                form.setFieldValue("password", oldValue.slice(0, -1));
                              }
                            }
                          };

                          return (
                            <input
                              type="text"
                              value={displayValue}
                              onChange={handleChange}
                              placeholder="Your password"
                              className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                            />
                          );
                        }}
                      </Field>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-right mb-4">
              <button
                type="button"
                onClick={() => setIsModalOpen1(true)}
                className="text-sm text-gray-500 hover:text-orange-500"
              >
                Forgot Password?
              </button>
            </div>


          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 underline"
            >
              Create Account
            </button>
          </p>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-8 relative r_container320">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <div className="flex justify-center items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-center">Join</h2>
              <img src={register} alt="" />
              <h2 className="text-2xl font-semibold text-center">CoralBay</h2>
            </div>

            <p className="text-gray-500 text-center mb-6">
              Create your account and start shopping today.
            </p>
            {/* <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md mb-2">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✕</span>
                <span className="text-red-600 text-sm font-medium">
                 Incorrect password
                </span>
              </div>
            </div> */}
            <Formik
              initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
              validationSchema={registerSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("Form Submitted", values);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="Ex. Helen"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        placeholder="Ex. Morgan"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>



                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Field name="password">
                        {({ field, form }) => {
                          // Show password or mask with *
                          const displayValue = showPassword
                            ? field.value
                            : "*".repeat(field.value?.length || 0);

                          const handleChange1 = (e) => {
                            const realValue = e.target.value;

                            if (showPassword) {
                              form.setFieldValue("password", realValue);
                            } else {

                              const oldValue = field.value || "";
                              if (realValue.length > displayValue.length) {

                                const newChar = realValue[realValue.length - 1];
                                form.setFieldValue("password", oldValue + newChar);
                              } else {

                                form.setFieldValue("password", oldValue.slice(0, -1));
                              }
                            }
                          };

                          return (
                            <input
                              type="text"
                              value={displayValue}
                              onChange={handleChange1}
                              placeholder="Your password"
                              className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                            />
                          );
                        }}
                      </Field>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-blue-600 underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-8 relative r_container320">
            <button
              type="button"
              onClick={() => setIsModalOpen1(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-2">
              Forgot Password?
            </h2>

            <p className="text-center mb-6 text-gray-600">
              We'll help you get back to shopping.
            </p>
            {/* <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md mb-2">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✕</span>
                <span className="text-red-600 text-sm font-medium">
                 Incorrect password
                </span>
              </div>
            </div> */}
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPassSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("Form submitted:", values);

                setIsModalOpen1(false);
                setIsModalOpen2(true);
                console.log("sent otp to email:", values.email);
                console.log("ismodel", isModalOpen2)
                resetOtpModal();

                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>


                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                      Send OTP
                    </button>
                  </div>
                </Form>
              )}
            </Formik>


          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {isModalOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-8 relative r_container320">
            <button
              type="button"
              onClick={() => setIsModalOpen2(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              Please Check your Email
            </h2>

            <p className="text-center mb-6 text-gray-600">
              We sent the OTP to exa.......@gmail.com
            </p>
            {/* <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md mb-2">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✕</span>
                <span className="text-red-600 text-sm font-medium">
                 Incorrect password
                </span>
              </div>
            </div> */}
           <Formik
  initialValues={{ otp: "".padStart(OTP_LENGTH, "") }}
  validationSchema={otpSchema}
  onSubmit={(values, { setSubmitting }) => {
    console.log("Form submitted:", values);
    setIsModalOpen2(false);
    setIsModalOpen3(true);
    resetOtpModal();
    setSubmitting(false);
  }}
>
  {({ values, setFieldValue }) => (
    <Form>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          OTP <span className="text-red-500">*</span>
        </label>

        <div className="flex justify-center gap-3 mb-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <Field
              key={index}
              innerRef={(el) => (inputRefs.current[index] = el)}
              type="text"
              name={`otp-${index}`}
              value={values.otp[index] || ""}
              onChange={(e) => handleOtpChange(e, index, values, setFieldValue)}
              onKeyDown={(e) => handleKeyDown(e, index, values, setFieldValue)}
              onPaste={(e) => {
                // Prevent default paste behavior and let onChange handle it
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text');
                
                // Create a synthetic event to trigger handleOtpChange
                const syntheticEvent = {
                  target: {
                    value: pastedData
                  }
                };
                handleOtpChange(syntheticEvent, index, values, setFieldValue);
              }}
              maxLength={OTP_LENGTH} // Allow pasting multiple characters
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none "
            />
          ))}
        </div>

        <ErrorMessage
          name="otp"
          component="div"
          className="text-red-500 text-sm text-center"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition font-medium"
        >
          Verification
        </button>
      </div>
    </Form>
  )}
</Formik>

            {countdown === 0 && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setCountdown(56)}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Password Modal */}
    

{isModalOpen3 && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md p-8 relative r_container320">
      <button
        type="button"
        onClick={() => setIsModalOpen3(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-center mb-2">
        Create New Password
      </h2>

      <p className="text-center mb-6 text-gray-600">
        Password should be different from the previous one.
      </p>

      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={confirmSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log("Password Reset:", values);
         
          alert('Password reset successfully!');
          setIsModalOpen3(false);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-4">
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Field
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition font-medium"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)}

    </div>
  );
}

export default Login;