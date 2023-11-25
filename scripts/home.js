"use strict";

const loginModal= document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

/*
*Hàm hiển thị nội dung trên trang Home một cách hợp lý tùy vào trường hợp có người dùng đăng nhập và không đăng nhập
*/

function displayHome(){
//Nếu có người dùng đăng nhập thì ẩn "loginModal" và hiển thi "mainContent"
    if(userActive){
        loginModal.style.display = "none";
        mainContent.style.display = "block";
        //Thêm thông báo welcomemessage
        welcomeMessage.textContent = `Welcome ${userActive.firstname} ${userActive.lastname}`;
    }
//Nếu không có ai đăng nhập thì ẩn "mainContent" và hiển thị "loginModal"
    else {
        loginModal.style.display = "block";
        mainContent.style.display = "none";
    }
}

//Bật sự kiện ấn vào nút Logout
btnLogout.addEventListener("click", function (){
    const isLogout = confirm("Bạn chắc chắn muốn đăng xuất chứ?");
    if(isLogout)
    //gán giá trị userActive về null để biểu hiện không có  ai đang đăng nhập ứng dụng
    {
        userActive = null;
        //Lưu (cập nhật) dữ liệu xuống localStore
        saveToStorage("userActive", userActive);
        //Hiện thị trang Home ở dạng chưa có người dùng đăng nhập
        displayHome();
    }
})