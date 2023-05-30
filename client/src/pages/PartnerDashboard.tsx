import { Button, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { ShipmentTable } from "../components/ShipmentsTable";
import { pastShipmentsColumns } from "../utils/TableColumnHelpers/PartnerColumnHelper";
import { usePartnerDashboard } from '../hooks/usePartnerDashboard';
import ActivePartnerShipmentDetails from "../components/ActivePartnerShipmentDetails";
  

function PartnerDashboard() {
    const activeShipment = {
        senderName: '',
        receiverName: '',
        from: '',
        to: '',
        expectedDay: '',
        lastLocation: ''
    }
    const { 
        pastShipmentsData,
        setActiveShipmentData,
        activeShipmentData,
        setPastShipmentData
    } = usePartnerDashboard();
    
    function handleDelivered() {
        const authToken = localStorage.getItem('token'); // Retrieve the auth token from localStorage
  
      fetch('http://localhost:3000/api/shipment/delivered', {
      method: 'POST',
      // @ts-ignore
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
      },
      body: JSON.stringify({
        // @ts-ignore
        shipmentId: activeShipmentData._id,
        newLocation: activeShipmentData.to,
      })
      })
      .then(response => {
          if (response.ok) {
          return response.json();
          } else {
          throw new Error('Request failed');
          }
      })
      .then(data => {
          setActiveShipmentData(activeShipment);
          const pastShipments = data.pastShipments.map((shipment: any) => {
            return {
                sender: shipment.senderName,
                receiver: shipment.receiverName,
                from: shipment.from,
                to: shipment.to,
                status: shipment.status,
                deliveryDate: shipment.deliveryDay
            }
        })
        setPastShipmentData(pastShipments);
      })
      .catch(error => {
          console.error(error);
      });
    }

    return (
        <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
            <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"} height={"30%"}>
                <CardHeader> Active Shipment </CardHeader>
                <CardBody>
                    <Flex flexDirection={"column"} flexWrap={"wrap"} height={"30vh"} gap={"2rem"} >
                        <ActivePartnerShipmentDetails columnName="Sender" columnDetail={ activeShipmentData.senderName } />
                        <ActivePartnerShipmentDetails columnName="Receiver" columnDetail={ activeShipmentData.receiverName } />
                        <ActivePartnerShipmentDetails columnName="Source" columnDetail={ activeShipmentData.from } />
                        <ActivePartnerShipmentDetails columnName="Destination" columnDetail={ activeShipmentData.from } />
                        <ActivePartnerShipmentDetails columnName="Delivery By" columnDetail={ activeShipmentData.expectedDay } />
                        <ActivePartnerShipmentDetails columnName="Last Status" columnDetail={ activeShipmentData.lastLocation } />
                </Flex>
                <Button onClick={handleDelivered}>Delivered</Button>
                </CardBody>
            </Card>
            <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"}>
                <CardHeader> Past Shipments </CardHeader>
                <CardBody>
                <ShipmentTable columns={pastShipmentsColumns} data={pastShipmentsData} />
                </CardBody>
            </Card>
        </Flex>
        )
}

export default PartnerDashboard