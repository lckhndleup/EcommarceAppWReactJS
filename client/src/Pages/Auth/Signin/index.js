import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validations from "./Validations";
import { fetchLogin } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useAuth } from '../../../Context/AuthContext';

function Signin() {
  
  const {login} = useAuth();

  const navigate =  useNavigate(); 
  const [successMessage, setSuccessMessage] = useState(""); /

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validations,

    onSubmit: async (values, bag) => {


      try {  //eğer problem yoksa 
        const loginResponse = await fetchLogin({ 
          email: values.email,
          password: values.password,
        });


        login(loginResponse);
        
        navigate("/"); 


        setSuccessMessage("başarıyla kaydedildi...");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message }); 
      }
    },
  });
  return (
    <div>
      <Flex align={"center"} width={"full"} justifyContent={"center"}>
        <Box pt={10}>
          <Box textAlign={"center"}>
            <Heading>Sign In</Heading>
          </Box>

          <Box my={5}>
            {successMessage && (
              <Alert status="success">
                <AlertIcon />
                {successMessage}
              </Alert>
            )}
          </Box>


          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign={"left"}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                >

                </Input>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
             
              <Button mt={4} width={"full"} type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
