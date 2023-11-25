"use strict";

//Để vào điều kiện IF để khi người dùng chưa đăng nhập thì không thể dùng 
if (userActive) {
    const newsContainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");
    
    //Tính số news tối đã trả về từ API
    let totalResults =  0;

    getDataNews("us", 1);

    //hàm lấy dữ liệu Data News từ API và hiển thị list news ra ứng dụng

    async function getDataNews(country, page){
        try {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=af1cfae6ce7a45bea771bb26a67c285d`
            );
            const data = await res.json();

            //Check lỗi quá 100 lần request/ ngày
            if (data.status==="error" && data.code==="rateLimited"){
                throw new Error(data.message);
            }
            //bắt lỗi khi chạy từ tập tinn không qua server
            if (data.status==="error" && data.code === "corsNotAllowed"){
                throw new Error(data.message);
            }

            //Gọi hàm để hiển thị List News
            displayNewList(data);
            
        }
        //Bắt lỗi
        catch (err){
            alert("Error: "+ err.message);
        }
    }

    //Hàm kiểm tra điều kiện ẩn và ấn nút Previous
    function checkBtnPrev(){
        //Nếu page number là 1 thì ẩn đi
        if (pageNum.textContent == 1){
            btnPrev.style.display = "none";
        }
        else{
            btnPrev.style.display = "block";
        }
    }

    //Hàm kiểm tra điều kiện và ấn nút Next

    function checkBtnNext(){
        //Nếu page number bằng với làm tròn lên (tổng số tin tức tối đa API trả về trên trang ứng dụng)
        if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)){
            //vd có tối đa 70 tin, 70/6 11.3333 ==>12: 6*11=66, trang thứ 12 có 4 tin
            btnNext.style.display = "none";
        }else {
            btnNext.style.display = "block";
        }
    }

    //Bật sự kiện click vào nút Previous
    btnPrev.addEventListener("click", function(){
        //Gọi hàm này để lấy dữ liệu và hiển thị danh sách các News trước đó
        getDataNews("us", --pageNum.textContent);
    });

    //Bật sự kiện click vào nút Next
    btnNext.addEventListener("click", function(){
        //Gọi hàm này để lấy dữ liệu và hiển thị danh sách các News trước đó
        getDataNews("us", ++pageNum.textContent);
    });


    //Hiển thị list news lên trang
    function displayNewList(data){
        //Lấy giá trị cho biến dataResults
        totalResults = data.totalResults;
        //Kiểm tra xem có ẩn các nút Next, Previous hay chưa và ẩn đi
        checkBtnPrev();
        checkBtnNext();

        let html = "";
        //Tạo các code HTML các News để hiển thị
        //no_image_available.jpg để thay thế cho một số ảnh có giá trị đường dẫn lỗi
        data.articles.forEach(function (article) {
            html += `
        <div class = "new-content">
            <div class="img-banner">
                <img src=${
                    article.urlToImage
                        ? article.urlToImage
                        : "../images/picture-not-available.png"
                } alt="img"/>
            </div>
            
            <div class="content">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <button><a href=${article.url} target="_blank">View</a></button>
            </div>
        </div>
        `;
        });
        newsContainer.innerHTML = html;
    }
}
//Nếu chưa đăng nhập thì thông báo người dùng đăng nhập để truy cập vào trang
else {
    alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
    window.location.assign("../index.html");
}
