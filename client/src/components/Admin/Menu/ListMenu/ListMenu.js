import React, { useEffect, useState } from 'react';
import { size, map } from "lodash";
import { Menu } from "../../../../api";
import { Loader } from 'semantic-ui-react';
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu(props) {
    const { active, reload } = props;

    const [menus, setMenus] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setMenus(null);
                const response = await menuController.getMenu(active);
                setMenus(response);
                // console.log(response);

            } catch (error) {
                console.error(error);
            }
        })()
    }, [active,reload])

    if (!menus) return <Loader active inline="centered" />
    if (size(menus) === 0) return "there is no menu";

    return map(menus, (menu) => (<MenuItem key={menu._id} menu={menu} />));
}
