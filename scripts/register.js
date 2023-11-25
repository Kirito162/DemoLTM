"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
console.log(userArr);
console.log(userArr.length);
// Bắt sự kiện ấn vào nút Register
btnSubmit.addEventListener("click", function(){
    //Lấy dữ liệu nhập vào từ người dùng
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value
    );
    console.log(userArr.length);
    // Check validate
    const isValidate = validate(user);

    if(isValidate){
        //thêm user vào mảng userArr
        userArr.push(user);
        //lưu dữ liệu lại (update dữ liệu) xuống localStorage
        saveToStorage("userArr",userArr);
        // console.log("userArray được lưu sau khi đkí",userArr);
        alert("Đăng ký thành công !");
        //điều hướng sang trang login
        window.location.assign("../pages/login.html");
    }
});

//////////////////
// Hàm: validate thông tin đăng ký của người dùng nhập vào form
// Hàm này trả về true nếu hợp lệ và false nếu không hợp lệ
function validate(user){
    let isValidate = true;

    // 1. Không có trường nào bị bỏ trống.
    if (user.firstname.trim().length === 0){
        alert("Vui lòng nhập First Name !");
        isValidate = false;
    }

    if (user.lastname.trim().length === 0){
        alert("Vui lòng nhập Last Name !");
        isValidate = false;
    }

    if (user.username.trim().length === 0){
        alert("Vui lòng nhập UserName !");
        isValidate = false;
    } 

    // ====> Không dùng phương thức .trim().lenght === 0 như các input trên 
    //      vì: yêu cầu Password phải có nhìu hơn 8 ký tự.
    //  nên dấu cách cũng là 1 ký tự thỏa yêu cầu
    if(user.password ===""){
        alert("Vui lòng nhập Password !");
        isValidate = false;
    }

    if(inputPasswordConfirm.value ===""){
        alert("Vui lòng nhập Confirm Password !");
        isValidate = false;
    }

    // // 2. Usernam không được trùng với Username của các người dùng trc đó.
    // if (
    //     //nếu tồn tại 1 username nào đó trùng với username người dùng nhập thì
    //     !userArr.every((item)=> (item.username !== user.username ? true: false))
    //     ){
    //             alert("User Name đã tồn tại !");
    //             isValidate = false;
    //     }
        
    for (let i=0; i < userArr.length;i++){
        if (userArr[i].username ===user.username){
            alert("User Name đã tồn tại !");
            isValidate =false;
            break;
        }
    }
           
    // 3. Password và Confirm Password phải giống nhau.
    if (user.password!== inputPasswordConfirm.value){
        alert("Password và Confirm Password phải giống nhau !");
        isValidate = false;
    }
    // 4. Password phải có nhìu hơn 8 ký tự 
    if(user.password.length <8){
        alert("Password phải từ 8 ký tự trở lên !");
        isValidate= false;
    }

    return isValidate;
}