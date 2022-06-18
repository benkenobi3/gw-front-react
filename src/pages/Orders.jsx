import "./Orders.sass"
import StatusTag from "../components/StatusTag"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Table, Row, Col, List } from "antd"
import { fetchOrders } from "../requests"

function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function F() {
            const {data} = await fetchOrders()
            setOrders(data)
        }
        F()
    }, [])

    return (
        <Row className="orders">
            <Col xs={0} lg={24}>
                <Table dataSource={orders} pagination={{ position: ['bottomCenter'] }}>
                    <Table.Column title={<div className="table-header montserrat">Проблема</div>} key='key' render={order => {
                        return <Link to={`/panel/orders/${order.key}`}>{order.title}</Link>
                    }}/>
                    <Table.Column title={<div className="table-header montserrat">Описание</div>} dataIndex='description' key='key' render={description => {
                        return <div className='truncate-text'>{description}</div>
                    }}/>
                    <Table.Column title={<div className="table-header montserrat">Заявитель</div>} dataIndex='customer' key='key' render={customer => {
                        return <Link to={`/panel/user/${customer.id}`}>{customer.first_name} {customer.last_name}</Link> 
                    }}/>
                    <Table.Column title={<div className="table-header montserrat">Исполнитель</div>} dataIndex='performer' key='key' render={performer => {
                        return performer ? <Link to={`/panel/user/${performer.id}`}>{performer.first_name} {performer.last_name}</Link> : 'Не назначен'
                    }}/>
                    <Table.Column title={<div className="table-header montserrat">Статус</div>} key='key' render={order => { 
                        return <StatusTag status={order.status} status_locale={order.status_locale}/>
                    }}/>
                </Table>
            </Col>
            <Col xs={24} lg={0}>
                <List dataSource={orders} renderItem={item => (
                    <List.Item key={item.id} actions={[<StatusTag status={item.status} status_locale={item.status_locale}/>]}>
                        <List.Item.Meta
                            title={item.title}
                            description={
                                <div className='truncate-text-container'>
                                    <div className='truncate-text-list'>
                                        {item.description}
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}/>
            </Col>
        </Row>
    )
}

export default Orders