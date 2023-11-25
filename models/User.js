"use strict";

//Class User để đại diện thông tin người dùng
class User{
    constructor(
        firstname,
        lastname,
        username,
        password,
        //
        pageSize = 10,
        category = "general"
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;

        //2 tham số cho setting
        this.pageSize = pageSize;
        this.category = category;
    }
}

