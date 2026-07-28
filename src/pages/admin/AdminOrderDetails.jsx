import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/Axios";
import { useParams } from "react-router-dom";
import styles from "./AdminOrderDetails.module.css";
import AdminLayout from "../../components/adminReuseUI/AdminLayout";

const AdminOrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);


    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const { data } = await api.get(`/api/orders/${id}`)

                setOrder(data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchOrder();

    }, [id]);

    if (!order) {
        return (
            <AdminLayout>
                <h2>Loading...</h2>
            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div className={styles.container}>

                <h1 className={styles.title}>Order Details</h1>

                {/* Order ID */}
                <div className={styles.section}>
                    <h3>Order ID</h3>
                    <p>{order._id}</p>
                </div>



                {/* Customer */}
                <div className={styles.section}>

                    <h3>Customer Information</h3>

                    <p>
                        <strong>Name:</strong> {order.user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {order.user?.email}
                    </p>
                </div>


                {/* Shipping */}
                <div className={styles.section}>
                    <h3>Shipping Address</h3>

                    <p>{order.shippingAddress.fullName}</p>

                    <p>{order.shippingAddress.phone}</p>

                    <p>{order.shippingAddress.addressLine1}</p>

                    {order.shippingAddress.addressLine2 && (
                        <p>{order.shippingAddress.addressLine2}</p>
                    )}

                    <p>{order.shippingAddress.city}</p>

                    <p>{order.shippingAddress.state}</p>

                    <p>{order.shippingAddress.country}</p>

                    <p>{order.shippingAddress.postalCode}</p>
                </div>



                {/* Items */}
                <div className={styles.section}>
                    <h3>Ordered Items</h3>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.orderItems.map((item) => (
                                <tr key={item.product}>
                                    <td>{item.name}</td>

                                    <td>{item.qty}</td>

                                    <td>₹{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                {/* Total */}
                <div className={styles.totalBox}>
                    <h3>Total Amount</h3>

                    <div className={styles.totalAmount}>
                        ₹{order.totalPrice}
                    </div>
                </div>

                {/* Status */}
                <div className={styles.section}>

                    <h3>Order Status</h3>

                    <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                    </span>
                </div>
            </div>
        </AdminLayout>
    );
};



export default AdminOrderDetails;