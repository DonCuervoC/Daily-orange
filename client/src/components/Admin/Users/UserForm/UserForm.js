import React from 'react';
import { Form } from 'semantic-ui-react';

export function UserForm(props) {
    const { close, onReload, user } = props;

    return (
        <Form className='user-form'>
           <div className='user-form__avatar'>
            <span>AVATAR</span>
           </div>

           <Form.Group widths="equal">
                <Form.Input  name="firstname" placeholder="First Name" />
                <Form.Input  name="lastname" placeholder="Last Name" />
           </Form.Group>

           <Form.Group widths="equal">
                <Form.Input  name="email" placeholder="E-mail" />
                <Form.Dropdown  placeholder='Select a role' options={roleOptions} selection />
           </Form.Group>

           <Form.Input  type='password' name="password" placeholder="Password"/>

            <Form.Button type='submit' primary fluid>
                {user ? "Update user" : "Create user"}
            </Form.Button>

        </Form>
    );
}


const roleOptions = [
    {
        key: "user",
        text:"User",
        values: "user",
    },
    {
        key: "admin",
        text:"Administrator",
        values: "admin",
    },
]