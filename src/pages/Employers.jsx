import "./Employers.sass"
import { ORDERS_ALL_URL } from "../settings"

function Employers() {
    const [employers, setEmployers] = useState([])

    const fetchEmployers = async () => {
        const { data } = await axios.get(ORDERS_ALL_URL)
        data.forEach((order) => order.key = order.id)
        const employers = data
        setEmployers(employers)
        console.log(employers)
    }

    useEffect(() => {
        fetchEmployers();
    }, [])

    return (
        <Row className="employers">
            <Col xs={0} lg={24}>
                <Table dataSource={orders}>
                    <Table.Column title={<div className="table-header">Заголовок</div>} key='key' render={order => {
                        return <Link to={`/panel/orders/${order.key}`}>{order.title}</Link>
                    }}/>
                    <Table.Column title={<div className="table-header">Описание</div>} dataIndex='description' key='key' render={description => {
                        return <div className='truncate-text'>{description}</div>
                    }}/>
                    <Table.Column title={<div className="table-header">Заявитель</div>} dataIndex='customer' key='key' render={customer => {
                        return <Link to={`/user/${customer.id}`}>{customer.first_name} {customer.last_name}</Link> 
                    }}/>
                    <Table.Column title={<div className="table-header">Исполнитель</div>} dataIndex='performer' key='key' render={performer => {
                        return performer ? <Link to={`/user/${performer.id}`}>{performer.first_name} {performer.last_name}</Link> : 'Не назначен'
                    }}/>
                    <Table.Column title={<div className="table-header">Статус</div>} dataIndex='status' key='key' render={StatusTag}/>
                </Table>
            </Col>
            <Col xs={24} lg={0}>
                <List dataSource={orders} renderItem={item => (
                    <List.Item actions={[StatusTag(item.status)]}>
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

export { Employers }