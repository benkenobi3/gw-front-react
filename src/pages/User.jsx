import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Form, Row, Col, PageHeader, Input, Skeleton } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

import "./User.sass"
import { getUser } from "../auth/user"
import { fetchUserProfile } from "../requests"


function User() {

    const params = useParams()
    const [currentUser, setCurrentUser] = useState({spec: {id: -1, title: ""}})

    async function fetchAndSetUser() {
        const { data, error } = await fetchUserProfile(params.userId)

        if (!error)
            setCurrentUser(data)
    }

    useEffect(() => {
        fetchAndSetUser()
    }, [])

    const loggedUser = getUser()

    if (!loggedUser)
        return <h1>401 Доступ запрещен</h1>

    const userFields = [
        {name: "name", value: currentUser ? currentUser.first_name + " " + currentUser.last_name : ""},
        {name: "spec", value: currentUser.spec.id == 1 ? "Проживающий" : currentUser.spec.title},
    ]

    const formItemLayout = {
        labelAlign: 'left',
        labelCol: {xs: {span: 24}, sm: {span: 4}, xxl: {span: 3}},
        wrapperCol: {xs: {span: 24}, sm: {span: 20}, xxl: {span: 21}},
    }

    if (currentUser === undefined)
        return <></>

    return (
        <Row className="user">
            <Skeleton loading={!currentUser.id} active>
            <Col xs={24} md={18} xxl={{span: 12, offset: 5}}>
                <PageHeader className="user-page-header back-color"
                    title={<div className="montserrat text-color">Пользователь #{currentUser.id}</div>}
                    backIcon={<ArrowLeftOutlined className="text-color"/>}
                    onBack={() => window.history.back()}
                />
                <Form name="show-user" size="large" fields={userFields} {...formItemLayout}>

                    <Form.Item label="ФИО" name="name">
                        <Input disabled className="input-disabled"/>
                    </Form.Item>

                    <Form.Item label="Специальность" name="spec">
                        <Input disabled className="input-disabled"/>
                    </Form.Item>
                    
                </Form>
            </Col>
            </Skeleton>
        </Row>
    )
}

export default User