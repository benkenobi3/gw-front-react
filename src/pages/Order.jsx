import "./Order.sass"
import { fetchOrder } from "../requests"
import StatusTag from "../components/StatusTag"
import OrderImages from "../components/OrderImages"
import OrderTimeline from "../components/OrderTimeline"
import OrderPerformer from "../components/OrderPerformer"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input, Select, Button } from "antd"


function Order() {
    const { orderId } = useParams()

    const [order, setOrder] = useState({})
    const [edit, setEdit] = useState(false)

    const fields = [
        {name: 'title', value: order.title},
        {name: 'status', value: order.status},
        {name: 'description', value: order.description},
        {name: 'performer', value: order.performer ? order.performer.id.toString() : 0},
    ]
    
    useEffect(() => {
        async function F() {
            const data = await fetchOrder(orderId)
            setOrder(data)
        }
        F()
    }, [orderId])

    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 23}},
    }

    const onFinish = values => {
        if (values.status !== order.status) {
            order.status = values.status 
        }
        setEdit(false)
    }

    const onEditOrCancel = () => {
        setEdit(edit => !edit)
    }

    return (
        <Row className="order">
            <Col xs={24} md={18} xxl={{span: 12, offset: 5}}>
                <PageHeader className="order-page-header back-color"
                    title={<div className="montserrat text-color">Заявка №{order.id}</div>}
                    backIcon={<ArrowLeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Form name="show-order" size="large" fields={fields} {...formItemLayout} onFinish={onFinish}>
                    <Form.Item label="Проблема" name="title">
                        <Input disabled className="input-disabled"/>
                    </Form.Item>

                    <Form.Item label="Описание" name="description">
                        <Input.TextArea disabled className="input-disabled" rows={3}/>
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

                    <Form.Item label="Исполнитель" name="performer">
                        <OrderPerformer performer={order.performer} availablePerformers={[]} edit={edit}/>
                    </Form.Item>

                    <Form.Item label="Фото" name="images">
                        <OrderImages images={order.images}/>
                    </Form.Item>
                    
                    <Row justify="center">
                        <Col md={24} style={{textAlign: "end"}}>
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
                                onClick={onEditOrCancel}
                            >
                                {edit ? 'Отмена' : 'Редактировать'}    
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col xs={24} md={{span: 5, offset: 1}} xxl={5}>
                <Row justify="center" style={{marginTop: '95px'}}>
                    <Col><OrderTimeline creation_dt={order.creation_datetime}/></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Order