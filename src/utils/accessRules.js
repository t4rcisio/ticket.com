const mRules = {
    "User_create": false,
    "User_update": false,
    "User_get": false,
    "User_delete": false,
    "Session_update": false,
    "Session_create": false,
    "Session_get": false,
    "Session_delete": false,
    "Movie_create": false,
    "Movie_update": false,
    "Movie_get": false,
    "Movie_delete": false,
    "Room_create": false,
    "Room_update": false,
    "Room_get": false,
    "Room_delete": false,
}





class Rules {

    defineRules(userType) {

        switch (userType) {

            case "USER":
                this.USER_rules()
            case "EDITOR":
                this.EDITOR_rules()
            case "ADMIN":
                this.ADMIN_rules()
        }
    }


    USER_rules() {

        const accessRule = mRules
        accessRule.User_update = "self"
        accessRule.User_delete = "self"
        accessRule.Movie_get = true
        accessRule.Session_get = true

        return accessRule

    }

    EDITOR_rules() {
        const accessRule = mRules
        accessRule.User_update = "self"
        accessRule.User_delete = "self"
        accessRule.Movie_get = true
        accessRule.Session_get = true
        accessRule.Session_create = true
        accessRule.Session_delete = true
        accessRule.Session_update = true
        accessRule.Movie_create = true
        accessRule.Movie_update = true
        accessRule.Movie_update = true

        return accessRule

    }


    ADMIN_rules() {

        const accessRule = mRules
        accessRule.User_create = true
        accessRule.User_update = true
        accessRule.User_get = true
        accessRule.User_delete = true
        accessRule.Session_update = true
        accessRule.Session_create = true
        accessRule.Session_get = true
        accessRule.Session_delete = true
        accessRule.Movie_create = true
        accessRule.Movie_update = true
        accessRule.Movie_get = true
        accessRule.Movie_delete = true
        accessRule.Room_create = true
        accessRule.Room_update = true
        accessRule.Room_get = true
        accessRule.Room_delete = true

        return accessRule
    }


}

export default Rules