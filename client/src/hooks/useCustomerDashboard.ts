import { useEffect, useState } from "react";

export default function useCustomerDashboard() {
    const [pastShipmentsData, setPastShipmentData] = useState([]);
    const [activeShipmentsData, setActiveShipmentsData] = useState([]);

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
            const activeShipments = data.activeShipments.map((shipment: any) => {
                return {
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
    }, [])

    return {
        pastShipmentsData,
        activeShipmentsData
    }
}