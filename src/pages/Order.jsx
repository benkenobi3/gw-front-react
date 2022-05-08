import "./Order.sass"
import axios from "axios"
import { Row, Col, PageHeader, Form, Input, Select, Button } from "antd"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import { ORDERS_ORDER_URL } from "../settings"
import StatusTag from "../components/StatusTag"


function Order() {
    const { orderId } = useParams()

    const [order, setOrder] = useState({})
    const [edit, setEdit] = useState(false)

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

    const fields = [
        {name: 'title', value: order.title},
        {name: 'description', value: order.description},
        {name: 'status', value: order.status}
    ]

    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 23}},
    }

    const onEditCancel = () => {
        setEdit(edit => !edit)
    }

    const onFinish = values => {
        if (values.status !== order.status) {
            order.status = values.status 
        }
        setEdit(false)
    }

    return (
        <Row justify="center" className="order">
            <Col xs={24} md={18} xxl={12} >
                <PageHeader className="order-page-header back-color"
                    ghost={false}
                    title={<div className="text-color"></div>}
                    backIcon={<LeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Form name="show-order" size="large" fields={fields} {...formItemLayout} onFinish={onFinish}>
                    <Form.Item label="Проблема" name="title">
                        <Input disabled className="disabled-black"/>
                    </Form.Item>
                    <Form.Item label="Описание" name="description">
                        <Input.TextArea disabled className="disabled-black" rows={3}/>
                    </Form.Item>
                    <Form.Item label="Статус" name="status">
                        <Select disabled={!edit}>
                            <Select.Option value="created"><StatusTag status="created"/></Select.Option>
                            <Select.Option value="appointed"><StatusTag status="appointed"/></Select.Option>
                            <Select.Option value="accepted"><StatusTag status="accepted"/></Select.Option>
                            <Select.Option value="info_required"><StatusTag status="info_required"/></Select.Option>
                            <Select.Option value="done"><StatusTag status="done"/></Select.Option>
                            <Select.Option value="rejected"><StatusTag status="rejected"/></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 24, style: {textAlign: 'right'}}}>
                        <Button 
                            size="default" 
                            type="primary" 
                            htmlType="submit"
                            className="button-margin"
                            hidden={!edit}
                        >
                            Сохранить  
                        </Button>
                        <Button 
                            size="default" 
                            type="dashed" 
                            className="button-back-color"
                            onClick={onEditCancel}
                        >
                            {edit ? 'Отмена' : 'Редактировать'}    
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Order