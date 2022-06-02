import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeftOutlined, WarningOutlined, UserOutlined } from "@ant-design/icons"
import { Row, Col, PageHeader, Form, Input, Button, Skeleton, Avatar, Tooltip } from "antd"

import "./Order.sass"
import { getUser } from "../auth/user"
import { fetchOrder, fetchComments, fetchAvailableEmployers, 
    saveComment, saveOrderStatus, saveOrderPerformer, deleteComment } from "../requests"
import OrderImages from "../components/OrderImages"
import OrderTimeline from "../components/OrderTimeline"
import OrderPerformer from "../components/OrderPerformer"
import OrderCustomer from "../components/OrderCustomer"
import OrderComments from "../components/OrderComments"
import OrderStatus from "../components/OrderStatus"


function Order() {
    const user = getUser()
    const { orderId } = useParams()

    const [order, setOrder] = useState({})
    const [comments, setComments] = useState([])
    const [availableEmployers, setAvailableEmployers] = useState([])

    

    const [edit, setEdit] = useState(false)
    const [warning, setWarning] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [commentsCreationError, setCommentsCreationError] = useState("")
   
    const orderFields = [
        {name: 'title', value: order.title},
        {name: 'status', value: order.status},
        {name: 'description', value: order.description},
        {name: 'performer', value: order.performer ? order.performer.id : -1},
        {name: 'customer', value: order.customer},
        {name: 'spec', value: order.perf_spec ? order.perf_spec.title : ''}
    ]

    const commentsFields = [
        {name: 'order', value: orderId},
        {name: 'text', value: ''},
    ]

    async function fetchAndSetOrder() {
        const { data } = await fetchOrder(orderId)
        setOrder(data)
    }

    async function fetchAndSetComments() {
        const { data } = await fetchComments(orderId)
        setComments(data)
    }

    async function fetchAndSetAvailableEmployers() {
        const { data } = await fetchAvailableEmployers(orderId)
        setAvailableEmployers(data)
    }

    useEffect(() => {
        fetchAndSetOrder()
        fetchAndSetComments()
        fetchAndSetAvailableEmployers()
    }, [orderId])

    const updateOrder = async values => {
        const diff = {}

        if (values.performer > 0) {

            const currentPerformer = order.performer ? order.performer.id : -1
            if ( currentPerformer !== values.performer) {
                const {data, err} = await saveOrderPerformer(order.id, values.performer)
                if (!err) {
                    diff.performer = availableEmployers.find(perf => perf.id === values.performer)
                    diff.status = 'appointed'
                }
                else
                    console.log(data)   
            }
            else if (values.status !== order.status) {
                const {data, err} = await saveOrderStatus(order.id, values.status)
                if (!err)
                    diff.status = data.status
                else
                    console.log(data)
            }
        }
        else {
            const {data, err} = await saveOrderPerformer(order.id, null)
            if (!err) {
                diff.performer = undefined
                diff.status = 'created'
            }
            else
                console.log(data)   
        }

        // trigger timeline render
        setRefresh(r => r + 1)
        setOrder({...order, ...diff})
        setWarning(w => !w)
        setEdit(false)
    }


    const createComment = async values => {
        setCommentsCreationError('')

        const { data, err } = await saveComment(values)
        data.user = user
        data.creation_datetime = new Date()

        if (err) {
            setCommentsCreationError('Ошибка при создании комментария')
            console.log(err)

            if (err.text)
                setCommentsCreationError('Текст комментария не может быть пустым')
            return
        }
        
        setComments(c => [...c, data])
    }

    const onCommentDelete = async commentId => {
        const { data, err } = await deleteComment(commentId)

        if (!err) {                              
            setComments(comments => {
                const result = []
                for (let c of comments) {
                    if (c.id !== commentId)
                        result.push(c)
                }    
                return result
            })
        }
        else
            console.log(data)
    }

    const onEditOrCancel = () => {
        setWarning(warning => !warning)
        setEdit(edit => !edit)
    }


    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 21}},
    }

    const formCommentLayout = {
        labelAlign: 'left',
        wrapperCol: {xs: {span: 24}},
    }

    const PerformerLabel = ({warning}) => {
        const hiddenStyle = warning ? {} : {display: 'none'}
        const title = 'При изменении исполнителя заявка' +
            ' автоматически перейдет в статус "Назначена"' +
            ' При удалении исполнителя заявка перейдет в статус "Создана"'
        
        return (
        <div style={{display: 'flex'}}>
            Исполнитель
            <div style={hiddenStyle} className="warning">
                <Tooltip
                    title={title}>
                    <WarningOutlined />
                </Tooltip>
            </div>
        </div>
        )
    }

    return (
        <div className="order">
        <Row>
            <Skeleton loading={!order.id} active>
            <Col xs={24} md={18} xxl={{span: 12, offset: 5}}>
                <PageHeader className="order-page-header back-color"
                    title={<div className="montserrat text-color">Заявка №{order.id}</div>}
                    backIcon={<ArrowLeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Form name="show-order" size="large" fields={orderFields} {...formItemLayout} onFinish={updateOrder}>
                    <Form.Item label="Проблема" name="title">
                        <Input disabled className="input-disabled"/>
                    </Form.Item>

                    <Form.Item label="Описание" name="description">
                        <Input.TextArea disabled className="input-disabled" rows={3}/>
                    </Form.Item>

                    <Form.Item label="Статус" name="status">
                        <OrderStatus disabled={!edit}/>
                    </Form.Item>

                    <Form.Item label="Заявитель" name="customer">
                        <OrderCustomer/>
                    </Form.Item>

                    <Form.Item label={<PerformerLabel warning={warning}/>} name="performer">
                        <OrderPerformer availablePerformers={availableEmployers} disabled={!edit}/>
                    </Form.Item>

                    <Form.Item label="Специализация" name="spec">
                        <Input disabled className="input-disabled"/>
                    </Form.Item>

                    <Form.Item label="Фото" name="images">
                        <OrderImages images={order.images}/>
                    </Form.Item>
                    
                    <Row justify="center">
                        <Col md={24} style={{textAlign: "end"}}>
                            <Button size="default" type="primary" htmlType="submit" className="button-margin" hidden={!edit}>
                                Сохранить  
                            </Button>
                            <Button size="default" type="dashed" className="button-back-color" onClick={onEditOrCancel}>
                                {edit ? 'Отмена' : 'Редактировать'}    
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            </Skeleton>
            <Col xs={24} md={{span: 5, offset: 1}} xxl={5}>
                <Row justify="center" style={{marginTop: '95px'}}>
                    <Col><OrderTimeline orderId={orderId} key={refresh}/></Col>
                </Row>
            </Col>
        </Row>
        <Row className="comments-block">
            <Col xs={24} md={18} xxl={{span: 12, offset: 5}}>
                <Row justify="center" className="comments-list-block">
                    <Col xs={24}><OrderComments comments={comments} onDelete={onCommentDelete}/></Col>
                </Row>
                <Row className="comments-new">
                    <Col xs={24}>
                        <Form name="comment" size="large" fields={commentsFields} {...formCommentLayout} onFinish={createComment}>

                            <Form.Item label="" name="text" rules={[{ required: true, message: 'Поле не может быть пустым'}]}>
                                <Input.TextArea className="input-disabled comments-input" rows={3} placeholder="Оставьте комменатарий"/>
                            </Form.Item>

                            <Form.Item label="" name="order" style={{display: 'none'}}>
                                <Input hidden={true}></Input>
                            </Form.Item>

                            <Row align="middle">
                                <Col xs={24} md={3}>
                                    <Button size="default" htmlType="submit" className="comments-button">
                                        Опубликовать
                                    </Button>
                                </Col>
                                <Col style={{display: 'flex'}}>
                                    <Avatar size={30} icon={<UserOutlined />} className="comments-avatar"/>
                                    <h1 style={{lineHeight: '30px', fontSize: '14px'}} className="montserrat">{`${user.first_name} ${user.last_name}`}</h1>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
    )
}

export default Order