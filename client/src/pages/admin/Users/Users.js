import React from 'react';
import "./Users.scss";
import { Button, Tab } from 'semantic-ui-react';

export function Users() {

  const panes = [
    {
      menuItem: "Active Users",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Active Users</h2>
        </Tab.Pane>

      ),
    },
    {
      menuItem: "Inactive Users",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Inactive Users</h2>
        </Tab.Pane>

      ),
    },
  ];


  return (
    <>
      {/* <h1>We are in pages/admin/users/Users.js</h1> */}
      <div className='user-pages'>
        <Button className='user-pages__add' primary onClick={() => console.log("Open form")}>
          New User
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

    </>
  );
}
