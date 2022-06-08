import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input, Button } from "antd"

import "./CreateOrder.sass"
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

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24}, 
            sm: {span: 20, offset: 4}, 
            xxl: {span: 21, offset: 3}
        },
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

                    <Form.List
                        label="Фото" 
                        name="images"
                        rules={[
                        {
                            validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('Требуется хотя бы одно фото'));
                            }
                            },
                        },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Фото' : ''}
                                required={false}
                                key={field.key}
                            >
                            <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "Введите url фото или удалите это поле",
                                    },
                                ]}
                                noStyle
                            >
                                <Input
                                    placeholder="Url фотографии"
                                    style={{
                                    width: '60%',
                                    }}
                                />
                                </Form.Item>
                                {fields.length > 1 ? (
                                <MinusOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                                ) : null}
                            </Form.Item>
                            ))}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{
                                        width: '100%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Добавить фото
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>

                </Form>
            </Col>
        </Row>
        </div>
    )
}

export default CreateOrder