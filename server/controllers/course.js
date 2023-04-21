
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
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) => {

        if (error) {
            res.status(400).send({ msg: "Error while getting courses" })
        } else {
            res.status(200).send(courses);
        }
    })

    /*
        try {
        const courses = await Course.find();
        res.status(200).send(courses);
    } catch (error) {
        res.status(400).send({ msg: "Error while getting courses" });
    }
*/
}

async function updateCourse(req, res) {

    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    try {
        await Course.findByIdAndUpdate({ _id: id }, courseData);
        res.status(200).send({ msg: "Course updated" });
    } catch (error) {
        res.status(400).send({ msg: "Error while updating course" });
    }

}

async function deleteCourse(req, res) {

    const { id } = req.params;

    try {
        await Course.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Course deleted" });
    } catch (error) {
        res.status(400).send({ msg: "Error while deleting course" });
    }
}


module.exports = {

    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,

};