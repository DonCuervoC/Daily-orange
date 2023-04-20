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

async function getMenus(req, res) {

    const { active } = req.params;

    let response = null;

    if (active === undefined) {
        response = await Menu.find().sort({ order: "asc"});
    } else {
        response = await Menu.find({ active }).sort({ order: "asc"});
    }

    if (!response.length) {
        res.status(400).send({msg: "No menus were found"});
    } else {
        res.status(200).send(response);
    }
}



module.exports = {

    createMenu,
    getMenus,

};



