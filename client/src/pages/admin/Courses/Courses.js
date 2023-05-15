import React, { useState } from 'react';
import { BasicModal } from "../../../components/Shared";
import { Button, Tab } from 'semantic-ui-react';
import { ListCourses } from "../../../components/Admin/Course";
import "./Courses.scss";

export function Courses() {

  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='courses-page'>
        {/* <h2>We are in /pages/admin/courses/courses.js</h2> */}
        <div className='courses-page__add'>

          <Button primary onClick={onOpenCloseModal}>
            New Course
          </Button>
        </div>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Create course">
        <p>Form to create new course</p>
      </BasicModal>
    </>
  )
}
