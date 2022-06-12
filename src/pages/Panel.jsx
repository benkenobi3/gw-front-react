import './Panel.sass'

import {
  CarryOutOutlined,
  FileOutlined,
  TeamOutlined,
  DoubleLeftOutlined,
  AreaChartOutlined,
  PlusSquareOutlined
} from '@ant-design/icons';
import { PageHeader, Layout, Menu, Button, Row, Col } from 'antd';
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';

import DropdownUser from "../components/DropdownUser"
import { getUser } from '../auth/user';

import  Reports  from "./Reports"
import  Order  from "./Order"
import  Orders  from "./Orders"
import  Overview  from "./Overview"
import  Employers  from "./Employers"
import  CreateOrder from "./CreateOrder"
import User from './User';

const { Content, Sider } = Layout;


function Panel() {

    const user = getUser()

    const loc = window.location

    const titles = {
        "/panel": <div className='montserrat'><AreaChartOutlined /> Обзор</div>,
        "/panel/orders": <div className='montserrat'><CarryOutOutlined /> Заявки</div>,
        "/panel/employers": <div className='montserrat'><TeamOutlined /> Сотрудники</div>,
        "/panel/reports": <div className='montserrat'><FileOutlined /> Отчеты</div>
    }

    const [collapsed, setCollapsed] = useState(false)
    const [contentTitle, setContentTitle] = useState(titles[loc.pathname])
    const [selectedKeys, setSelectedKeys] = useState([])

    return (
        <Layout className="panel">
            <Sider trigger={null} collapsible collapsed={collapsed} className="panel-slider">
                <Link
                    to="/panel" 
                    onClick={() => {setContentTitle(titles['/panel']); setSelectedKeys([])}}>
                    <img
                        alt=""
                        className="logo-image" 
                        src="http://localhost:3000/logo.png" 
                        style={{paddingLeft: collapsed * 16}}
                    />
                </Link>
                <Menu
                    theme="dark"
                    selectedKeys={selectedKeys}
                    defaultSelectedKeys={[loc.pathname]} 
                    mode="inline"
                    onClick={({key}) => setContentTitle(titles[key])}
                    onSelect={({selectedKeys}) => setSelectedKeys(selectedKeys)}
                >
                    <Menu.Item key="/panel/orders" icon={<CarryOutOutlined />}>
                        <Link to="/panel/orders">Заявки</Link>
                    </Menu.Item>
                    <Menu.Item key="/panel/employers" icon={<TeamOutlined />}>
                        <Link to="/panel/employers">Сотрудники</Link>
                    </Menu.Item>
                    <Menu.Item key="/panel/reports" icon={<FileOutlined />}>
                        <Link to="/panel/reports">Отчеты</Link>
                    </Menu.Item>
                </Menu>
                <div className='d'></div>
                <Link to="/panel/create" className='create-button-link' style={{paddingLeft: collapsed * 8}}>
                    { !collapsed ? <Button type="primary">Создать заявку</Button> : <PlusSquareOutlined/>}
                </Link>
            </Sider>
            <Layout className="site-layout">
                <PageHeader className="panel-header back-color"
                    ghost={true}
                    onBack={() => setCollapsed((c) => !c)}
                    backIcon={<DoubleLeftOutlined className="text-color"/>}
                    extra={[
                        <DropdownUser className="text-color" user={user} key="dropdown-user"/>
                    ]}
                />
                <Content className="panel-content">
                    <div className='content-title'>
                        {contentTitle}
                    </div>
                    <div className='content-routes'>
                        <Routes>
                            <Route path="" index element={<Overview />}/>
                            <Route path="create" index element={<CreateOrder />}/>
                            <Route path="orders" element={<Orders />}/>
                            <Route path="orders/:orderId" element={<Order />}/>
                            <Route path="employers" element={<Employers />}/>
                            {/* <Route path="reports" element={<Reports />}/> */}
                            <Route path="user/:userId" element={<User />}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Panel