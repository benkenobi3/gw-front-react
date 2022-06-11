import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input, Button } from "antd"

import "./CreateOrder.sass"
import { getUser } from "../auth/user"
import { saveOrder } from "../requests"
import OrderCustomer from "../components/OrderCustomer"
import OrderSpecs from "../components/OrderSpecs"

function CreateOrder() {
    const user = getUser()

    const navigate = useNavigate()

    const orderFields = [
        {name: 'title', value: ''},
        {name: 'description', value: ''},
        {name: 'customer', value: user},
        {name: 'perf_spec', value: 1},
        {name: 'images', value: []}
    ]

    const createOrder = async values => {
        values.images = values.images.map(el => {return {'url': el}})
        const {data, err} = saveOrder(values)
        navigate('../orders', {replace: true})
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

    const formRequiredField = {
        rules: [
            {
              required: true,
              message: 'Это поле не может быть пустым!',
            },
        ]
    }

    const formSpecRequiredfield = {
        rules: [{
            validator: async (_, value) => {
                if (!value || value < 2) {
                    return Promise.reject(new Error("Требуется указать специализацию"))
                }
            },
        }]
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
                    <Form.Item label="Проблема" name="title" {...formRequiredField}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Описание" name="description" {...formRequiredField}>
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item label="Заявитель" name="customer">
                        <OrderCustomer/>
                    </Form.Item>

                    <Form.Item label="Специализация" name="perf_spec" required={true} {...formSpecRequiredfield}>
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
                                        placeholder="url фотографии"
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
                    <Row>
                        <Col xs={24} style={{textAlign: "end"}}>
                            <Button type="primary" htmlType="submit">
                                Создать заявку
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        </div>
    )
}

export default CreateOrder