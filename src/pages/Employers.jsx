import "./Employers.sass"
import axios from "axios"
import { EMPLOYERS_ALL_URL } from "../settings"
import { Row, Col, Table, List} from "antd"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BusyTag from "../components/BusyTag"

function Employers() {
    const [employers, setEmployers] = useState([])

    const fetchEmployers = async () => {
        const { data } = await axios.get(EMPLOYERS_ALL_URL)
        data.forEach((order) => order.key = order.id)
        const employers = data
        setEmployers(employers)
        console.log(employers)
    }

    useEffect(() => {
        fetchEmployers();
    }, [])

    const specNames = {
        'plumber': 'Сантехник',
        'carpenter': 'Плотник',
        'electrician': 'Электрик'
    }

    return (
        <Row className="employers">
            <Col xs={0} lg={24}>
                <Table dataSource={employers} pagination={{ position: ['bottomCenter'] }}>
                    <Table.Column title={<div className="table-header">Имя, Фамилия</div>} key='key' render={employer => {
                        return <Link to={`/user/${employer.key}`}>{employer.first_name} {employer.last_name}</Link>
                    }}/>
                    <Table.Column title={<div className="table-header">Специальность</div>} dataIndex='spec' key='key' render={spec => {
                        return <div className='truncate-text'>{specNames[spec.name]}</div>
                    }}/>
                    <Table.Column title={<div className="table-header">Занятость</div>} dataIndex='is_busy' key='key' render={BusyTag}/>
                </Table>
            </Col>
            <Col xs={24} lg={0}>
                <List dataSource={employers} renderItem={employer => (
                    <List.Item actions={[BusyTag(employer.is_busy)]}>
                        <List.Item.Meta
                            title={`${employer.first_name} ${employer.last_name}`}
                            description={
                                <div className='truncate-text-container'>
                                    <div className='truncate-text-list'>
                                        {employer.spec.name}
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

export default Employers 