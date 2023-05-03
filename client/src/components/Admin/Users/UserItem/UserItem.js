import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { Images } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

const userController = new User();


export function UserItem(props) {
    const { user, onReload } = props;
    // console.log(user);
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateUSer = () => {
        setTitleModal(`Update ${user.email}`);
        onOpenCloseModal();
    }

    const onActivateDesactivate = async () => {
        // console.log("Activate or desactivate user");
        try {
            await userController.updateUser(accessToken, user._id, { active: !user.active, });
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active ? `Deactivate user ${user.email}` : `Activate user ${user.email}`);
        onOpenCloseConfirm();
    }

    return (
        <>
            <div className='user-item'>
                <div className='user-item__info'>
                    <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : Images.alienAvatar} />
                    <div>
                        <p>{user.firstName} {user.lastName} </p>
                        <p>email : {user.email}</p>
                    </div>
                </div>
                <div>
                    <Button icon primary onClick={openUpdateUSer}>
                        <Icon name='pencil' />
                    </Button>

                    <Button icon color={user.active ? "orange" : "teal"} onClick={openDesactivateActivateConfirm} >
                        <Icon name={user.active ? "ban" : "check"} />
                    </Button>

                    <Button icon color='red'>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>
            {/* show, close, title, size, children */}
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <UserForm close={onOpenCloseModal}
                    onReload={onReload}
                    user={user}
                />
            </BasicModal>
            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={isDelete ? () => console.log("Confirm delete") : onActivateDesactivate}
                content={confirmMessage}
                size='mini'
            />
        </>
    );
}
