import axios from "../../../app/shared/lib/axios";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

//utils
import { useAuth } from "payload/components/utilities";
import { getLocaleDate } from "../../../app//hooks/getLocaleData";

import styles from "./styles.module.scss";

export const ORDER_STATUSES = {
  pending: "Pending",
  recieved: "Recieved",
  sended: "Sended",
  delivered: "Delivered",
  rejected: "Rejected",
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//This custom component will remain the data up-to-date
const OrdersComponent = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [orders, setOrders] = useState([]);

  const isLight = localStorage?.getItem("payload-theme") === "light";

  const handleRedirect = (id: string) => {
    history.push(`/admin/collections/orders/${id}`);
  };
  useEffect(() => {
    let intervalId;

    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data } = await axios("http://localhost:3000/api/graphql", {
          method: "POST",
          data: {
            query: `
            query Orders($page: Int!, $limit: Int!) {
              Orders(
                limit: $limit,
                page: $page,
                sort: "-createdAt"
              ) {
                docs {
                  id
                  district
                  apartment
                  houseNumber
                  orderStatus
                  totalAmount
                  deliveryPrice
                  createdAt
                }
              }
            }
          `,
            variables: { limit: 50, page: 1 },
          },
        });
        console.log("data.data", data.data);

        setOrders(data.data.Orders.docs);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Fetch orders immediately and set up interval fetching
    fetchOrders();
    intervalId = setInterval(() => {
      fetchOrders();
    }, 4000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user]);

  return (
    <div className={`${styles.container} ${isLight && styles.light}`}>
      <h3>Orders</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>District</th>
            <th>Home</th>
            <th className={styles.text_center}>Status</th>
            <th className={styles.text_center}>Price (delivery included)</th>
            <th>Created at</th>
          </tr>
        </thead>

        <tbody>
          {orders?.length > 0 &&
            orders.map(
              ({ id, district, apartment, houseNumber, orderStatus, totalAmount, deliveryPrice, createdAt }) => (
                <tr onClick={() => handleRedirect(id)}>
                  <td>{district}</td>
                  <td>
                    {apartment} / {houseNumber}
                  </td>
                  <td className={`${styles.text_center} ${styles[orderStatus]}`}>{ORDER_STATUSES[orderStatus]}</td>
                  <td className={styles.text_center}>{+totalAmount + +deliveryPrice || 0}</td>
                  <td>{getLocaleDate(createdAt)}</td>
                </tr>
              ),
            )}
        </tbody>
      </table>
      {orders?.length === 0 && (
        <div className={styles.emptyBLock}>
          <div className={styles.title}>No orders yet</div>
        </div>
      )}
    </div>
  );
};

export default OrdersComponent;
