import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom"
import "./AdminMenu.scss";

export  function AdminMenu() {
  return (
    <Menu fluid vertical icon text className='admin-menu'>
      {/* <h2>Admin MEnu</h2> */}
      <Menu.Item as={Link} to="/admin/users" >
        <Icon name='user outline'/>
        Users
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/menu" >
        <Icon name='bars'/>
        Menu
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/courses" >
        <Icon name='computer'/>
        Courses
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/newsletter" >
        <Icon name='mail'/>
        Newsletter
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/blog" >
        <Icon name='comment alternate outline'/>
        Blog
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/news" >
        <Icon name='newspaper outline'/>
        News
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/exchange" >
        <Icon name='money bill alternate outline'/>
        Exchange
      </Menu.Item>

    </Menu>
  )
}
