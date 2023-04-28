import React, { useState } from 'react';
import {Tab} from "semantic-ui-react";
import { LoginForm, RegisterForm } from '../../../components/Admin/Auth';
import { Icon } from "../../../assets";
import "./Auth.scss";



export  function Auth() {

  const [activeIndex, setActiveIndex] = useState(0);
  
  const openLogin =()=> setActiveIndex(0);

const panes = [
  {
    menuItem: "Get in",
    render: () =>(
      <Tab.Pane>
        <LoginForm />
      </Tab.Pane>
    ),
  },

  {
    menuItem: "New user",
    render: () =>(
      <Tab.Pane>
        {/* <h2>Register FORM</h2> */}
        <RegisterForm openLogin={openLogin}/>
      </Tab.Pane>
    ),
  },
];

  return (
    <div className='auth'>
      <Icon.LogOrange className='logo'/>
      <h1>We are in pages/admin/AUTH</h1>
      <Tab panes={panes} className="auth_forms" activeIndex={activeIndex} onTabChange={(_,data)=> setActiveIndex(data.activeIndex)} />
    </div>
  )
}
