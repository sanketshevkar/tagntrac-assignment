import { Formik, Field } from "formik";
import {
  Card,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  RadioGroup,
  HStack,
  Radio,
  FormHelperText,
  Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type values = {
  email: string,
  password: string,
  userType: string
}

export default function LoginPage({ isAdmin = false }) {

  const navigate = useNavigate();

  const onSubmitHandler = (values: values) => {
    if (isAdmin) values.userType = 'admin';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        userType: values.userType
      })
    }
    fetch('http://localhost:3000/api/user/login', options)
    .then((result) => result.json()).then((data) => {
      if (data.error) alert(data.error);
      else {
        localStorage.setItem("token", data.token);
        if(values.userType === 'customer') navigate('/customerDashboard');
        if(values.userType === 'partner') navigate('/partnerDashboard');
        if(values.userType === 'admin') navigate('/adminDashboard');
      }
    }).catch((error) => alert(error));
  }
  return (
    <Flex align="center" justify="center" h="100vh">
      <Card bg="white" p={6} minWidth={"25vw"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
            userType: ""
          }}
          onSubmit={(values) => onSubmitHandler(values)}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value: any) => {
                      let error;

                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                { !isAdmin ? 
                <FormControl as='fieldset'>
                <FormLabel as='legend'>
                  Please select your role
                </FormLabel>
                <RadioGroup id="userType" name="userType">
                  <HStack spacing="24px">
                    <Field name="userType">
                      {({ field }: any) => (
                        <Radio {...field} value="customer">
                          Customer
                        </Radio>
                      )}
                    </Field>
                    <Field name="userType">
                      {({ field }: any) => (
                        <Radio {...field} value="partner">
                          Delivery Partner
                        </Radio>
                      )}
                    </Field>
                  </HStack>
                </RadioGroup>
                <FormHelperText>Please select one</FormHelperText>
              </FormControl>
               : 
                <Box></Box>
              }
                <Button type="submit" backgroundColor="#00c795" color={"white"} width="full">
                  Login
                </Button>
                <Button onClick={()=>navigate('/signup')} type="submit" width="full">
                  Resgister
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
}