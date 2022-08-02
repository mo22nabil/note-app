const { userRole } = require("../middlewear/auth");



const endPoint = {
    addNote:[userRole.Admin,userRole.user],
    updateNote: [userRole.Admin,userRole.user,userRole.hr]
}

module.exports = endPoint