import {Row, Col, Button} from "antd"
import {Link} from "react-router-dom"

import DropdownUser from "./DropdownUser"
import { getUser } from "../auth/user"
import "./Header.sass"


function Header() {
    const user = getUser()
    
    return (
        <Row justify="space-around" align="middle" className="header">
            <Col>
                <Link to="/">
                    <img className="logo-image" src="/logo-text.png"/>
                </Link>
            </Col>
            <Col>
                {user ? (
                    <DropdownUser user={user} key="dropdown-user"/>    
                    ) : (
                    <Link to="/panel">
                        <Button type="primary" size="large" className="login-btn">
                            Войти
                        </Button>
                    </Link>
                    )
                }
            </Col>
        </Row>
    )
}

export default Header
