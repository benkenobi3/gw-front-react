import "./Order.sass"
import axios from "axios"
import { Row, Col, PageHeader } from "antd"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import { ORDERS_ORDER_URL } from "../settings"


function Order() {
    const { orderId } = useParams()

    const [order, setOrder] = useState({})

    const fetchOrder = async () => {
        const { data } = await axios.get(ORDERS_ORDER_URL(orderId))
        data.key = data.id
        const order = data
        setOrder(order)
        console.log(order)
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <Row justify="center" className="order">
            <Col xs={24} sm={18} xxl={12} >
                <PageHeader className="order-page-header back-color"
                    ghost={false}
                    title={<div className="text-color"></div>}
                    backIcon={<LeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Row align="top" gutter={1}>
                    <Col xs={24} md={5}><h3>Проблема:</h3></Col>
                    <Col>{order.title}</Col>
                </Row>
                <Row align="top" gutter={1}>
                    <Col xs={24} md={5}><h3>Описание проблемы:</h3></Col>
                    <Col>{order.description}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Order