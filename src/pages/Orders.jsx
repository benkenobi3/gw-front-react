import "./Orders.sass"
import axios from 'axios'
import { useState, useEffect } from "react"
import { ORDERS_ALL_URL } from "../settings"
import { Table, Tag } from "antd"
import { STATUS_MAPPING } from "../settings"
import { Link } from "react-router-dom"

function Orders() {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const { data } = await axios.get(ORDERS_ALL_URL)
        data.forEach((order) => order.key = order.id)
        const orders = data
        setOrders(orders)
        console.log(orders)
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'key',
            render: (title, key) => {
                return (
                    <Link to={`/panel/orders/${key}`}>{title}</Link>
                )
            }
        },

        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            render: description => {
                return (
                    <div className='truncate-text'>
                        {description}
                    </div>
                )
            }
        },

        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                let color = status === 'rejected' ? 'darkred' : 'green'
                color = status === 'info_required' ? 'orange' : color
                color = status === 'done' ? 'darkgreen' : color

                return (
                    <Tag color={color} key={status}>
                        {STATUS_MAPPING[status]}
                    </Tag>
                )
            }
        },
    ]

    return (
        <div className="main-table">
            <Table dataSource={orders} columns={columns} ></Table>
        </div>
    )
}

export { Orders }