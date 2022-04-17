import {useState} from "react"
import {Row, Col, Button, Form, Input} from "antd"

import "./Login.sass"
import {login} from "../auth/login"

function Login() {

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

    const [authError, setAuthError] = useState('')

    const handleFinish = values => {
        setAuthError('')
        login(values.username, values.password).then((_)=> {
            console.log('auth success')
        }).catch(()=>{
            console.log('auth failed')
            setAuthError('Неправильный логин или пароль!')
        })
    }

    return (
        <div className="login">
            <Row justify="center" align="middle" className="content">
                <Col lg={{push: 5}}>
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
                            <span className="error">{authError != '' && authError}</span>
                        </Form.Item>
                        
                    </Form>
                </Col>
            </Row>
            <div className="wave"></div>
        </div>
    );
}

export default Login