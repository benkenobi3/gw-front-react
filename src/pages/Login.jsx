import {useState} from "react"
import {Row, Col, Button, Form, Input} from "antd"

import "./Login.sass"
import {login} from "../auth/auth"
import {getUser} from "../auth/user"
import Header from "../components/Header"
import {useNavigate, useSearchParams} from "react-router-dom"


function Login() {
    const user = getUser()

    const wrapperLayout = {
        wrapperCol: {
            xs: {span: 24, offset: 0}, 
            sm: {span: 16, offset: 8}
        }
    }

    const formItemLayout = {
        labelCol: {xs: {span: 24}, sm: {span: 8}},
        wrapperCol: {xs: {span: 24}, sm: {span: 16}},
    }

    const navigate = useNavigate()
    const [authError, setAuthError] = useState('')
    const [params, _] = useSearchParams()
    
    const handleFinish = values => {
        setAuthError('')
        login(values.username, values.password).then((_)=> {
            console.log('auth success')
            params.get('next') ? navigate('../' + params.get('next'), {replace: true}) : navigate(-1)
        }).catch(()=>{
            console.log('auth failed')
            setAuthError('Неправильный логин или пароль!')
        })
    }

    return (
        <div className="login">
            <Header />
            <Row justify="space-around" align="middle" className="content">
                <Col xs={0} sm={1}></Col>
                <Col sm={{pull: 1}} style={user ? {display: "none"} : {}}>
                    <Form name="basic" size="large" {...formItemLayout}
                        onFinish={handleFinish}>

                        <Form.Item label="Логин" name="username"
                            rules={[{ required: true, message: 'Пожалуйста, введите логин!'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Пароль" name="password"
                            rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}>
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...wrapperLayout}>
                            <Button type="primary" htmlType="submit" className="submit">
                                Войти
                            </Button>
                        </Form.Item>

                        <Form.Item {...wrapperLayout}>
                            <span className="error">{authError !== '' && authError}</span>
                        </Form.Item>

                    </Form>
                </Col>
                <Col style={user ? {} : {display: "none"}}>
                    <h1>Вы уже вошли</h1>
                </Col>
            </Row>
            <div className="wave"></div>
        </div>
    )
}

export default Login