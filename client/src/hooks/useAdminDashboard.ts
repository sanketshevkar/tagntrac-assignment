import { useEffect, useState } from "react";

export default function useAdminDashboard () {
    const [pastShipmentsData, setPastShipmentData] = useState([]);
    const [activeShipmentsData, setActiveShipmentsData] = useState([]);
    const [unassignedShipmentsData, setUnassignedShipmentsData] = useState([]);
  
    useEffect(() => {
      const authToken = localStorage.getItem('token'); // Retrieve the auth token from localStorage
  
      fetch('http://localhost:3000/api/shipment/getShipments', {
      method: 'GET',
      // @ts-ignore
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
      },
      })
      .then(response => {
          if (response.ok) {
          return response.json();
          } else {
          throw new Error('Request failed');
          }
      })
      .then(data => {
          console.log(data);
          const unassignedShipments = data.unassignedShipments.map((shipment: any) => {
            return {
                sender: shipment.senderName,
                receiver: shipment.receiverName,
                from: shipment.from,
                to: shipment.to,
            }
        })
        setUnassignedShipmentsData(unassignedShipments);
  
          const activeShipments = data.assignedShipments.map((shipment: any) => {
            return {
                sender: shipment.senderName,
                receiver: shipment.receiverName,
                from: shipment.from,
                to: shipment.to,
                lastLocation: shipment.lastLocation,
                expectedDay: shipment.expectedDay
            }
        })
        setActiveShipmentsData(activeShipments);
  
          const pastShipments = data.pastShipments.map((shipment: any) => {
              return {
                  sender: shipment.senderName,
                  receiver: shipment.receiverName,
                  from: shipment.from,
                  to: shipment.to,
                  partner: shipment.partner,
                  status: shipment.status,
                  deliveryDate: shipment.deliveryDay
              }
          })
          setPastShipmentData(pastShipments);
      })
      .catch(error => {
          console.error(error);
      });
  }, [])

  return {
    pastShipmentsData,
    activeShipmentsData,
    unassignedShipmentsData
  }
}