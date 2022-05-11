import "./Order.sass"
import { fetchOrder } from "../requests"
import { IMAGE_FALLBACK } from "../settings"
import StatusTag from "../components/StatusTag"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input, Select, Button, Image, Steps } from "antd"

const { Step } = Steps;


function OrderTimeline({creation_dt}) {
    if (creation_dt) {
        const date = new Date(creation_dt)
        return (
            <Steps direction="vertical" size="small" current={1}>
                <Step title="Заявка создана" description={date.toLocaleString()} />
                <Step title="Заявка назначена на исполнителя" description={(new Date()).toLocaleString()} />
                <Step title="Ожидание" description="" />
            </Steps>
        )
    }
    return <Steps direction="vertical" size="small" current={0}><Step title="Заявка создана" description={""} /></Steps>
}


function OrderImages({images}) {

    const [visible, setVisible] = useState(false)

    let result = <></>

    if (images) {

        result = (
            <Image.PreviewGroup>
                <Image 
                    width={150} height={200} 
                    src={images[0].url} 
                    fallback={IMAGE_FALLBACK}
                />
            </Image.PreviewGroup>
        )

        if (images.length > 1) {

            let group = []
            for (let i =0; i < images.length; i++) {
                group.push(
                    <Image key={i} width={150} height={200} src={images[i].url} fallback={IMAGE_FALLBACK}/>
                )
            }

            result = (
                <>
                    <Image 
                        width={150} height={200} 
                        src={images[0].url} 
                        preview={{ visible: false }} 
                        onClick={() => setVisible(true)} 
                        fallback={IMAGE_FALLBACK}
                    />
                    <Button type="link" onClick={() => setVisible(true)}>
                        {"Еще\u00a0+" + (images.length-1)}
                    </Button>
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                            {group}
                        </Image.PreviewGroup>
                    </div>
                </>
            )

        }

    }
    return result
}


function Order() {
    const { orderId } = useParams()

    const [order, setOrder] = useState({})
    const [edit, setEdit] = useState(false)
    

    useEffect(() => {
        async function F() {
            const data = await fetchOrder(orderId)
            setOrder(data)
        }
        F()
    }, [orderId])

    const fields = [
        {name: 'title', value: order.title},
        {name: 'status', value: order.status},
        {name: 'description', value: order.description},
    ]

    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 23}},
    }

    const onEditOrCancel = () => {
        setEdit(edit => !edit)
    }

    const onFinish = values => {
        if (values.status !== order.status) {
            order.status = values.status 
        }
        setEdit(false)
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