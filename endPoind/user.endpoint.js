const { userRole } = require("../middlewear/auth");



const userEndPoint = {
    profile:[userRole.Admin,userRole.user]
}

module.exports = userEndPoint