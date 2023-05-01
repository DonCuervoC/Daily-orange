import React from 'react';
import { Icon } from "../../assets";
import { AdminMenu } from "../../components/Admin/AdminLayout";
import "./AdminLayout.scss";


export function AdminLayout(props) {

  const { children } = props;
  return (
    <div className='admin-layout'>
      {/* <h2>We are using Admin Layout</h2>
      {children} */}
      <div className='admin-layout__left'>
        {/* <div className='logo' >LOGO</div> */}
        <Icon.LogOrange className='logo' />
        {/* <span>ADMIN MENU</span> */}
        <AdminMenu />
      </div>

      <div className='admin-layout__right'>

        <div className='admin-layout__right-header'>
          <span>LOGOUT</span>
        </div>
        <div className='admin-layout__right-content' >
          {children}
        </div>
      </div>
    </div>
  )
}
