import "./Employers.sass"
import { Row, Col, Table, List} from "antd"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BusyTag from "../components/BusyTag"
import { fetchEmployers } from "../requests"

function Employers() {
    const [employers, setEmployers] = useState([])

    useEffect(async () => {
        const data = await fetchEmployers();
        setEmployers(data)
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