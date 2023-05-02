import React, { useState } from 'react';
import "./Users.scss";
import { Button, Tab } from 'semantic-ui-react';
import { BasicModal } from "../../../components/Shared";

export function Users() {

  const [showModal,setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState)

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
        <Button className='user-pages__add' primary onClick={onOpenCloseModal}>
          New User
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      {/* show, close, title, size, children */}
      <BasicModal show={showModal} close={onOpenCloseModal} title="Create new user"  >
        <h2>Form to create new users</h2>
      </BasicModal>

    </>
  );
}
