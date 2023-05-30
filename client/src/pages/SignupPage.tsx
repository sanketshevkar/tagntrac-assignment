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
  FormHelperText
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const onSubmitHandler = (values: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        userType: values.userType
      })
    }
    fetch('http://localhost:3000/api/user/register', options)
    .then((result) => result.json()).then((data) => {
      if (data.error) alert(data.error);
      else {
        navigate('/login');
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
            userType: ""
          }}
          onSubmit={(values) => {
            onSubmitHandler(values)
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
              <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
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
                </FormControl>
                <Button type="submit" backgroundColor="#00c795" color={"white"} width="full">
                  Sign Up
                </Button>
                <Button onClick={()=>navigate('/login')} type="submit" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
}