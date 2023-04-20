const Menu = require("../models/menu");


async function createMenu(req, res) {
    const menuData = req.body;

    try {
        const menu = await Menu.create(menuData);
        res.status(200).send(menu);
    } catch (error) {
        res.status(400).send({ msg: "Error while creating menu" });
    }
}

module.exports = {

    createMenu,
};



