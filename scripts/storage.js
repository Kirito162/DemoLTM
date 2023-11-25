"use strict";
////////
// Hàm lấy dữ liệu
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// Hàm lưu dữ liệu
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ Localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
// sẽ trả về 1 mảng chứa các instance của class User

// Lấy dữ liệu user đang đăng nhập 
let userActive = getFromStorage("userActive") 
    ? parseUser(getFromStorage("userActive"))
    : null;



// Hàm chuyển từ JS Object sang Class Instance 
function parseUser(userData) {
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
// thêm 2 thuộc tỉnh này ch0o setting
        userData.pageSize,
        userData.category
    );
    return user;
}

