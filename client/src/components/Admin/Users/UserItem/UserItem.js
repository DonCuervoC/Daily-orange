import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { Images } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

export function UserItem(props) {
    const { user } = props;
    // console.log(user);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    const openUpdateUSer = () => {

        setTitleModal(`Update ${user.email}`);
        onOpenCloseModal();
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

                    <Button icon color={user.active ? "orange" : "teal"}>
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
                    onReload={() => console.log("RELOAD")}
                    user={user}
                />
            </BasicModal>
        </>
    );
}
