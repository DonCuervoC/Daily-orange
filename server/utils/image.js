function getFilePath(file) {

    const filePath = file.path;
    //const fileSplit = filePath.split("/");
    const fileSplit = filePath.replace(/\\/g, "/").split("/");

    //return filePath;
    return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
    getFilePath,
}