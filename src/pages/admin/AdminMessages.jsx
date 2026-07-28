import { useEffect, useState } from "react";
import api from "../../api/Axios";
import styles from "./AdminMessages.module.css";
import AdminLayout from "../../components/adminReuseUI/AdminLayout";




const AdminMessages = () => {

    const [messages,setMessages]=useState([]);

    useEffect(()=>{

        const fetchMessages=async()=>{

            const {data}=await api.get("/api/contact");

            setMessages(data);

        };

        fetchMessages();

    },[]);

    return(

        <AdminLayout>

        <div className={styles.container}>

            <h1>Customer Messages</h1>

            <div className={styles.tableWrapper}>

            <table className={styles.table}>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>

                </thead>

                <tbody>

                {messages.map((msg)=>(

                    <tr key={msg._id}>

                        <td>{msg.name}</td>

                        <td>{msg.email}</td>

                        <td>{msg.phone}</td>

                        <td>{msg.subject}</td>

                        <td className={styles.message}>
                            {msg.message}
                        </td>

                        <td>
                            {new Date(msg.createdAt).toLocaleString()}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

            </div>

        </div>

        </AdminLayout>

    );

};

export default AdminMessages;



