const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res) {
    const course = new Course(req.body);
    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;
  
    try {
      const courseStored = await course.save();
      res.status(201).send(courseStored);
    } catch (error) {
      res.status(400).send({ msg: "Error while creating course" });
    }
  }





module.exports = {

    createCourse,

};