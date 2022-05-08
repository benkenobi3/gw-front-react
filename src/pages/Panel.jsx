import './Panel.sass';

import {
  CarryOutOutlined,
  FileOutlined,
  TeamOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { PageHeader, Layout, Menu } from 'antd';
import { useState } from 'react'
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import DropdownUser from "../components/DropdownUser"
import { getUser } from '../auth/user';

import  Reports  from "./Reports"
import  Order  from "../pages/Order"
import  Orders  from "../pages/Orders"
import  Employers  from "../pages/Employers"

const { Content, Sider } = Layout;


function Panel() {

    const user = getUser()

    const location = useLocation()

    const titles = {
        "/panal/orders": <><CarryOutOutlined /> Заявки</>,
        "/panel/employers": <><TeamOutlined /> Сотрудники</>,
        "/panel/reports": <><FileOutlined /> Отчеты</>
    }

    const [collapsed, setCollapsed] = useState(false)
    const [contentTitle, setContentTitle] = useState(titles[location.pathname])

    return (
        <Layout className="panel">
            <Sider trigger={null} collapsible collapsed={collapsed} className="panel-slider">
                <img
                    alt=""
                    className="logo-image" 
                    src="http://localhost:3000/logo.png" 
                    style={{paddingLeft: collapsed * 16}}
                />
                <Menu
                    theme="dark" 
                    defaultSelectedKeys={[location.pathname]} 
                    mode="inline"
                    onClick={({key}) => setContentTitle(titles[key])}
                >
                    <Menu.Item key="/panal/orders" icon={<CarryOutOutlined />}>
                        <Link to="/panel/orders">Заявки</Link>
                    </Menu.Item>
                    <Menu.Item key="/panel/employers" icon={<TeamOutlined />}>
                        <Link to="/panel/employers">Сотрудники</Link>
                    </Menu.Item>
                    <Menu.Item key="/panel/reports" icon={<FileOutlined />}>
                        <Link to="/panel/reports">Отчеты</Link>
                    </Menu.Item>
                </Menu>
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
                            <Route path="" element={<Navigate to="/panel/orders" replace />}/>
                            <Route path="orders" index element={<Orders />}/>
                            <Route path="orders/:orderId" index element={<Order />}/>
                            <Route path="employers" element={<Employers />}/>
                            <Route path="reports" element={<Reports />}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Panel