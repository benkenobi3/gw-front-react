import './Panel.sass';

import {
  CarryOutOutlined,
  FileOutlined,
  TeamOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { PageHeader, Button, Layout, Menu } from 'antd';
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';

import { DropdownUser } from "../components/DropdownUser"
import { getUser } from '../auth/user';

import { Tasks } from "../pages/Tasks"

const { Content, Footer, Sider } = Layout;


function Panel() {

    const user = getUser()

    const [collapsed, setCollapsed] = useState(false)
   
    return (
        <Layout className="panel">
            <Sider trigger={null} collapsible collapsed={collapsed} className="panel-slider">
                <Link to="/panel">
                    <img 
                        alt=""
                        className="logo-image" 
                        src="http://localhost:3000/logo.png" 
                        style={{paddingLeft: collapsed * 16}}
                    />
                </Link>
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                    <Menu.Item key="0" icon={<CarryOutOutlined />}>
                        <Link to="/panel/tasks">Задачи</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<TeamOutlined />}>
                        <Link to="/panel/employers">Сотрудники</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileOutlined />}>
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
                        <DropdownUser className="text-color" user={user}/>
                    ]}
                />
                <Content className="panel-content">
                    
                    <Routes>
                        <Route index path="tasks" element={<Tasks />}/>
                        <Route path="employers" element={<div></div>}/>
                        <Route path="reports" element={<div></div>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Panel