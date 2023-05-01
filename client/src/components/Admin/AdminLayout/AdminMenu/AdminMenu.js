import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom"
import "./AdminMenu.scss";

export function AdminMenu() {
    // const data = useLocation();
    // console.log(data);
    const { pathname } = useLocation();
    console.log(pathname);

    const isCurrentPath = (path) => {

        if (path === pathname) return true;
        return false;
    };

    return (
        <Menu fluid vertical icon text className='admin-menu'>
            {/* <h2>Admin MEnu</h2> */}
            <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")} >
                <Icon name='user outline' />
                Users
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}  >
                <Icon name='bars' />
                Menu
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}  >
                <Icon name='computer' />
                Courses
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}  >
                <Icon name='mail' />
                Newsletter
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")} >
                <Icon name='comment alternate outline' />
                Blog
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/news" active={isCurrentPath("/admin/news")} >
                <Icon name='newspaper outline' />
                News
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/exchange" active={isCurrentPath("/admin/exchange")} >
                <Icon name='money bill alternate outline' />
                Exchange
            </Menu.Item>

        </Menu>
    )
}
