import React, { useState } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import {BasicModal } from "../../../components/Shared"
import { ListMenu, MenuForm} from "../../../components/Admin/Menu";
import "./Menu.scss";


export function Menu() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Active menus",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={true} reload={reload} />

        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive menus",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={false}  reload={reload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {/* <h2>We are in /pages/admin/Menu/menu.js</h2> */}
      <div className='menu-page'>
        <Button className='menu-page__add' primary onClick={onOpenCloseModal}>
          New Menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Create new menu" >
        <MenuForm close={onOpenCloseModal} onReload={setReload} />
      </BasicModal>

    </>
  );
}


