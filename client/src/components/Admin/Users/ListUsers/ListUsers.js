import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { size } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";


const userController = new User();

export function ListUsers(props) {

    const { usersActive } = props;
    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

    //console.log(users);

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const response = await userController.getUsers(accessToken, usersActive);
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        })()

    }, [usersActive])

     if (!users) return <Loader active inline="centered" />
     if (size(users) === 0) return "there is no user";

    return (
        <div>
            <h2>We are displaying users</h2>
            <p>{usersActive ? "Active" : "Inactive"}</p>
        </div>
    );
}
