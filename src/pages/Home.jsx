import React, {useState, useEffect} from 'react'
import {Row, Col, Button} from "antd"
import {Link} from "react-router-dom"

import "./Home.sass"
import Header from "../components/Header"
import { getUser } from '../auth/user'


function Home() {
    const user = getUser()

    const specs = ['сантехник', 'плотник', 'электрик']
    const [spec_id, setSpecId] = useState(0)

    useEffect(() => {
       
        const interval = setInterval(() => {
            setSpecId((spec_id) => spec_id >= specs.length - 1 ? 0: spec_id + 1)
        }, 2000)

        return () => clearInterval(interval)
    }, [specs.length])

    const MainButton = () => {
        if (user && user.role && (user.role === 'admin' || user.role === 'performer')) {
            return (
                <Link to="/panel">
                    <Button type="primary" size="large" style={{fontSize: '1.8em', height: '100%'}}>
                        Войти в панель
                    </Button>
                </Link>
            )
        }
        return (
            <Link to="/panel/create">
                <Button type="primary" size="large" style={{fontSize: '1.8em', height: '100%'}}>
                    Подать заявку
                </Button>
            </Link>
        )
    }

    return (
        <div className="home">
            <Header/>
            <Row align="bottom" className="text">
                <Col span={24} md={0} align="middle">
                    <h1 style={{marginTop: '10vh'}}>Вам нужен</h1>
                </Col>
                <Col span={0} md={12} align="right">
                    <h1>Вам нужен</h1>
                </Col>
                <Col span={24} md={0} align="middle">
                    <h1><span>{specs[spec_id]}?</span></h1>
                </Col>
                <Col span={0} md={12} align="left">
                    <h1>{"\u00A0"}<span>{specs[spec_id]}?</span></h1>
                </Col>
            </Row>
            <Row justify="space-around" align="middle">
                <Col>
                    <MainButton />
                </Col>
            </Row>
            <div className="wave"></div>
        </div>
    )
}

export default Home