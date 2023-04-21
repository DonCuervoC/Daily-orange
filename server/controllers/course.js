const course = require("../models/course");
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

async function getCourses(req, res) {

    // /courses?page=2&limit=1
    const { page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) =>{

        if (error) {
            res.status(400).send({ msg: "Error while getting courses" })
        } else {
            res.status(200).send(courses);
        }
    })

}


    // try {
    //     const courses = await Course.find();
    //     res.status(200).send(courses);
    // } catch (error) {
    //     res.status(400).send({ msg: "Error while getting courses" });
    // }

module.exports = {

    createCourse,
    getCourses,

};