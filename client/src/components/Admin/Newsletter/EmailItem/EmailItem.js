import React, { useState } from 'react';
import "./EmailItem.scss";
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { NewsLetter } from "../../../../api";
import { useAuth } from "../../../../hooks";

const newsLetterController = new NewsLetter();

export function EmailItem(props) {

  const { email, onReload } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {

    try {
      await newsLetterController.deleteEmail(accessToken, email._id);
      //Reload
      onReload();
      //CloseModal
      onOpenCloseConfirm();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='email-item'>

        <span>{email.email}</span>

        <div>
          <Button icon color='red' onClick={onOpenCloseConfirm}>
            <Icon name='trash' />
          </Button>
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Delete  ${email.email}`}
        size='mini'
      />
    </>
  )
}
