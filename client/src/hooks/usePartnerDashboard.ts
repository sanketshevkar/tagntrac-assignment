import { useEffect, useState } from "react";

export function usePartnerDashboard () {
    const activeShipment = {
        senderName: '',
        receiverName: '',
        from: '',
        to: '',
        expectedDay: '',
        lastLocation: ''
    }
    const [pastShipmentsData, setPastShipmentData] = useState([]);
    const [activeShipmentData, setActiveShipmentData] = useState(activeShipment);

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

            if (data.activeShipment.length > 0) setActiveShipmentData(data.activeShipment[0]);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    return {
        pastShipmentsData,
        setActiveShipmentData,
        activeShipmentData,
        setPastShipmentData
    }
}