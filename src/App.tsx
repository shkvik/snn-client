import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined
} from '@ant-design/icons';

import Dashboard from './pages/dashboard/Dashboard';

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { title } from 'process';
import { Routes } from 'react-router-dom';
import Modbus from './pages/modbus/Modbus';
const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: any,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
) : MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}


const Home = () => {
  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>Это страница "О нас"</h1>
    </div>
  );
};


const items: MenuItem[] = [
  {
    label: <Link to="/">Dashboard</Link>,
    key: '228',
    icon: <DashboardOutlined />,
  },
  {
    label: <Link to="/about">About</Link>,
    key: '0',
    icon: <PieChartOutlined />,
  },
  
];




const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              Bill is a cat.

              <Routes>
                <Route path="/about" Component={About}/>
                <Route path="/" Component={Dashboard}/>
                <Route path="/modbus/:id" Component={Modbus}/>
              </Routes>

            </div>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};




export default App;