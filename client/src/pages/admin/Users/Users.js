import React, { useState } from 'react';
import "./Users.scss";
import { Button, Tab } from 'semantic-ui-react';
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from '../../../components/Admin/Users';

export function Users() {
  const [showModal,setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Active Users",
      render: () => (
        <Tab.Pane attached={false}>
           {/* <h2>Active Users</h2>  */}
          <ListUsers usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive Users",
      render: () => (
        <Tab.Pane attached={false}>
          {/* <h2>Inactive Users</h2> */}
          <ListUsers usersActive={false} reload={reload} onReload={onReload} />
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
        {/* <h2>Form to create new users</h2> */}
        {/* close, onReload, user  */}
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>

    </>
  );
}
