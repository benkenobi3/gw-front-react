import { Menu, Dropdown } from "antd"
import { Link } from "react-router-dom"
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import { forgetToken } from "../auth/auth"

const dropdownContent = (uid) => {
    return (
        <Menu>
            <Menu.Item key={"/panel/user/" + uid}>
                <Link to={"/panel/user/" + uid} className="dropdown-item">Профиль</Link>
            </Menu.Item>
            <Menu.Item danger key="forgetToken">
                <a onClick={e => {
                    e.preventDefault()
                    forgetToken()
                }}>
                    Выйти
                </a>
            </Menu.Item>
        </Menu>
    )
}

function DropdownUser(props) {
    return (
        <Dropdown overlay={dropdownContent(props.user.id)} placement="bottomLeft" arrow={{ pointAtCenter: true }} className={props.className}>
            <div className="username">
                <UserOutlined/> {`${props.user.first_name} ${props.user.last_name}`} <DownOutlined />
            </div>
        </Dropdown>
    )
}

export default DropdownUser