import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeftOutlined, WarningOutlined, UserOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input } from "antd"

import "./Order.sass"
import { getUser } from "../auth/user"
import { saveOrderStatus, saveOrderPerformer} from "../requests"
import OrderImages from "../components/OrderImages"
import OrderCustomer from "../components/OrderCustomer"
import OrderSpecs from "../components/OrderSpecs"

function CreateOrder() {
    const user = getUser()

    const [order, setOrder] = useState({})
    
    const orderFields = [
        {name: 'title', value: ''},
        {name: 'description', value: ''},
        {name: 'customer', value: user},
        {name: 'perf_spec', value: 1},
        {name: 'images', value: []}
    ]

    const createOrder = async values => {
        const diff = {}

        setOrder({...order, ...diff})
    }

    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 21}},
    }
 
    return (
        <div className="order">
        <Row>
            <Col xs={24} md={18} xxl={{span: 12, offset: 5}}>
                <PageHeader className="order-page-header back-color"
                    title={<div className="montserrat text-color">Новая заявка</div>}
                    backIcon={<ArrowLeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Form name="show-order" size="large" fields={orderFields} {...formItemLayout} onFinish={createOrder}>
                    <Form.Item label="Проблема" name="title">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Описание" name="description">
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item label="Заявитель" name="customer">
                        <OrderCustomer/>
                    </Form.Item>

                    <Form.Item label="Специализация" name="perf_spec">
                        <OrderSpecs />
                    </Form.Item>

                    <Form.Item label="Фото" name="images">
                        <OrderImages/>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </div>
    )
}

export default CreateOrder