import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useAuth } from "../../../../hooks";
import { useNavigate } from 'react-router-dom';


export function Logout() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/admin");
        console.log("End session");
    }

    return (

        <Button icon basic color="red" onClick={onLogout}>
            <Icon name='power off' />Logout
        </Button>

    );
}
