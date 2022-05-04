import { Menu, Dropdown } from "antd"
import { Link } from "react-router-dom"
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import { logout } from "../auth/auth"

const dropdownContent = (uid) => {
    return (
        <Menu>
            <Menu.Item>
                <Link to={"/user/" + uid} className="dropdown-item">Профиль</Link>
            </Menu.Item>
            <Menu.Item danger>
                <a onClick={e => {
                    e.preventDefault()
                    logout()
                }}>
                    Выйти
                </a>
            </Menu.Item>
        </Menu>
    )
}

function DropdownUser(props) {
    return (
        <Dropdown overlay={dropdownContent(props.user.uid)} placement="bottomLeft" arrow={{ pointAtCenter: true }} className={props.className}>
            <div className="username">
                <UserOutlined/> {props.user.username} <DownOutlined />
            </div>
        </Dropdown>
    )
}

export default DropdownUser