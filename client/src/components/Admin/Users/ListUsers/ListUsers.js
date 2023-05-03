import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {

    const { usersActive, reload } = props;
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

    }, [usersActive,reload])

     if (!users) return <Loader active inline="centered" />
     if (size(users) === 0) return "there is no user";

    return map(users, (user) => (
        <>
        <UserItem key={user._id} user={user} />
        </>


    ))
}
