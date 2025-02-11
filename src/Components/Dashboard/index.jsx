import React, { useContext, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IoHomeOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { BsBoxSeam } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { LuChartLine } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Input,
  Layout,
  Menu,
  Modal,
  Segmented,
  Select,
  theme,
} from "antd";

import { CgAdd } from "react-icons/cg";
import { DataUserContext } from "../../context/sortingcontext";
import axios from "axios";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const { state, dispatch } = useContext(DataUserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    address: "",
    age: "",
    status: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newUser = {
      name: inputValue.name,
      address: inputValue.address,
      age: inputValue.age,
      status: inputValue.status,
    };

    axios
      .post("https://67a74d5e203008941f673347.mockapi.io/userdata", newUser)
      .then((response) => {
        // Formani tozalash
        document.getElementById("ageInput").value = "";
        document.getElementById("statusSelect").selectedIndex = 0;

        setInputValue({
          name: "",
          address: "",
          age: "",
          status: "",
        });
        window.location.reload();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleTheUserInfo = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [collapsed, setCollapsed] = useState(false);

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
              <Button shape="circle" icon={<UserOutlined />} />
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
            options={["all", "active", "draft", "archived"]}
            onChange={(value) => dispatch({ type: "FILTER", payload: value })}
          />
          <Button
            color="default"
            variant="solid"
            className="mx-[20px]"
            onClick={showModal}
            icon={<CgAdd className="text-xl" />}>
            Add Product
          </Button>
          <Modal
            title="Antd Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Submit">
            <Input
              name="name"
              value={inputValue.name}
              onChange={(e) => handleTheUserInfo(e)}
              placeholder="Name"
              style={{ marginBottom: 8 }}
            />
            <Input
              name="address"
              id="ageInput"
              value={inputValue.address}
              onChange={(e) => handleTheUserInfo(e)}
              placeholder="Address"
              style={{ marginBottom: 8 }}
            />
            <Input
              name="age"
              onChange={(e) => handleTheUserInfo(e)}
              placeholder="Age"
              type="number"
              style={{ marginBottom: 8 }}
            />
            <Select
              id="statusSelect"
              onChange={(value) =>
                setInputValue({ ...inputValue, status: value })
              }
              placeholder="Status"
              style={{ width: "100%" }}>
              <Select.Option value="active">active</Select.Option>
              <Select.Option value="draft">draft</Select.Option>
              <Select.Option value="archived">archived</Select.Option>
            </Select>
          </Modal>
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
