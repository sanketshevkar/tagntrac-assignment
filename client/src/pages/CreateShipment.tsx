import { Button, Card, Flex, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";

export default function CreateShipment() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');

    const onSubmitHandler = (values: any) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({
          senderName: values.sender,
          receiverName: values.receiver,
          description: "Some description",
          from: values.from,
          to: values.to,
          lastLocation: values.from
        })
      }
      // @ts-ignore
      fetch('http://localhost:3000/api/shipment/create', options)
      .then((result) => result.json()).then((data) => {
        if (data.error) alert(data.error);
        else {
          navigate('/customerDashboard');
        }
      }).catch((error) => alert(error));
    }
    return (
      <Flex align="center" justify="center" h="100vh">
        <Card bg="white" p={6} w={"25vw"}>
          <Formik
            initialValues={{
              sender: "",
              receiver: "",
              from: "",
              to: ""
            }}
            onSubmit={(values) => onSubmitHandler(values)}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="sender">Sender Name</FormLabel>
                    <Field
                      as={Input}
                      id="sender"
                      name="sender"
                      type="sender"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="receiver">Receiver Name</FormLabel>
                    <Field
                      as={Input}
                      id="receiver"
                      name="receiver"
                      type="receiver"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="from">Source</FormLabel>
                    <Field
                      as={Input}
                      id="from"
                      name="from"
                      type="from"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="from">Destination</FormLabel>
                    <Field
                      as={Input}
                      id="to"
                      name="to"
                      type="to"
                    />
                  </FormControl>
                  <Button type="submit" backgroundColor="#00c795" color={"white"} width="full">
                    Create Shipment
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Card>
      </Flex>
    );
  }