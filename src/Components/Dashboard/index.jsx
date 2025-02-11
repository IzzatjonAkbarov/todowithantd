import React, { useContext, useState } from "react";
import {
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IoHomeOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { BsBoxSeam } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { LuChartLine } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Button, Input, Layout, Menu, Segmented, theme } from "antd";

import { CgAdd } from "react-icons/cg";
import { DataUserContext } from "../../context/sortingcontext";

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const { dispatch } = useContext(DataUserContext);
  const [collapsed, setCollapsed] = useState(false);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className=" h-screen w-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="!h-[100vh] "
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}>
          <Menu.Item
            key={"home"}
            icon={<IoHomeOutline className="!text-2xl !font-bold" />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key={"cart"}
            icon={<SlBasket className="!text-2xl !font-bold" />}>
            <Link to="/shop">Shop</Link>
          </Menu.Item>
          <Menu.Item
            key={"products"}
            icon={<BsBoxSeam className="!text-2xl !font-bold" />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item
            key={"customers"}
            icon={<GoPeople className="!text-2xl !font-bold" />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key={"analytics"}
            icon={<LuChartLine className="!text-2xl !font-bold" />}>
            <Link to="/analytics">Analytics</Link>
          </Menu.Item>
          <Menu.Item
            key={"settings"}
            icon={<CiSettings className="!text-2xl !font-bold" />}
            style={{ position: "absolute", bottom: 30, width: "100%" }}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>

            <div className="flex items-center ml-auto mr-4">
              <Input
                placeholder="Search"
                style={{ width: 200, marginRight: 8 }}
                onPressEnter={(e) => onSearch(e.target.value)}
              />
              <Button
                shape="circle"
                icon={<UserOutlined />}
                onClick={() => console.log("User icon clicked")}
              />
            </div>
          </div>
        </Header>
        <section className="flex items-center justify-between">
          <Segmented
            style={{
              margin: "10px 10px",
              padding: 10,

              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="px-5"
            options={["all", "active", "draft", "archieved"]}
            onChange={(value) => dispatch({ type: "sorted", payload: value })}
          />
          <Button
            color="default"
            variant="solid"
            className="mx-[20px]"
            icon={<CgAdd className="text-xl" />}>
            Add Product
          </Button>
        </section>

        <Content
          style={{
            margin: "15px 15px",
            padding: 15,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
