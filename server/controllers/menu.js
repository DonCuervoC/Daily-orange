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
    const { active } = req.query;

    let response = null;

    if (active === undefined) {
        response = await Menu.find().sort({ order: "asc" });
    } else {
        response = await Menu.find({ active }).sort({ order: "asc" });
    }
    if (!response.length) {
        res.status(400).send({ msg: "No menus were found" });
    } else {
        res.status(200).send(response);
    }
}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;

    try {
        const updatedMenu = await Menu.findByIdAndUpdate({ _id: id }, menuData, { new: true }).exec();
        res.status(200).send({ msg: "Update OK", menu: updatedMenu });
    } catch (error) {
        res.status(400).send({ msg: "Error while updating menu" });
    }
}


async function deleteMenu(req, res) {
    const { id } = req.params;
  
    try {
      const deletedMenu = await Menu.findByIdAndDelete(id).exec();
      if (!deletedMenu) {
        res.status(404).send({ msg: "Menu not found" });
        return;
      }
      res.status(200).send({ msg: "Deleted OK", menu: deletedMenu });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error while deleting menu" });
    }
  }


module.exports = {

    createMenu,
    getMenus,
    updateMenu,
    deleteMenu

};



