import React, { useState } from 'react';
import "./CourseItem.scss";
import { Button, Confirm, Icon, Image } from 'semantic-ui-react';
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { CourseForm } from "../CourseForm";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";

const courseController = new Course();

export function CourseItem(props) {
    const { course, onReload } = props;
    const { accessToken } = useAuth();
    //console.log(course);

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateCourse = () => {
        setTitleModal(`Update ${course.title}`);
        onOpenCloseModal();
    };

    const onDelete = async () => {
        // console.log("DELETE COIURSE");
        try {
            await courseController.deleteCourse(accessToken, course._id);
            onReload();
            onOpenCloseConfirm();

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <div className='course-item'>
                <div className='course-item__info'>
                    <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                    <div>
                        <p>{course.title}</p>
                    </div>
                </div>

                <div>
                    <Button icon as="a" href={course.url} target="_blank">
                        <Icon name='eye' />
                    </Button>
                    <Button icon primary>
                        <Icon name='pencil' onClick={openUpdateCourse} />
                    </Button>
                    <Button icon color='red' onClick={onOpenCloseConfirm}>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <CourseForm
                    onClose={onOpenCloseModal}
                    onReload={onReload}
                    course={course}
                />
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Delete course ${course.title}`}
                size='mini'
            />
        </>
    )
}
