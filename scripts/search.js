"use strict";
if (userActive) {
    const navPageNum = document.getElementById("nav-page-num"); 
    const inputQuery = document.getElementById("input-query"); 
    const btnSubmit= document.getElementById("btn-submit");
    
    const newsContainer = document.getElementById("news-container"); 
    const btnPrev = document.getElementById("btn-prev"); 
    const pageNum = document.getElementById("page-num"); 
    const btnNext = document.getElementById("btn-next");
    let totalResults = 0; 
    let keywords = "";
    navPageNum.style.display = "none";


    btnSubmit.addEventListener("click", function () {
        pageNum.textContent = "1";
        newsContainer.innerHTML = "";
        // Kiểm tra xem người dùng đã nhập keywords chưa ?
         if (inputQuery.value.trim().length === 0) {
            // ẩn các nút chuyển trang nếu chưa nhập keywords 
            navPageNum.style.display = "none";
            alert("Vui lòng nhập keywords để tìm kiếm !");
        } else {
            keywords = inputQuery.value;
// gọi hàm này để hiển thị list News lên trang ứng dụng 
            getDataNewsByKeywords (keywords, 1);
        }
    });
    async function getDataNewsByKeywords(keywords, page){
        try {
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=af1cfae6ce7a45bea771bb26a67c285d`
            );

            const data = await res.json();

            //Check lỗi quá 100 lần request/ngày
            if (data.status==="error" && data.code==="rateLimited"){
                //ẩn các nút chuyển trang nếu có lỗi
                navPageNum.style.display = "none";
                throw new Error(data.message);
            }

            //Nếu không có bài viết nào thì thông báo
            if (data.totalResults == 0)
            {
                //ẩn các nút chuyển trang nếu có lỗi
                navPageNum.style.display = "none";
                throw new Error("Không có bài báo nào hợp với từ khóa bạn tìm kiếm, vui lòng thử lại bằng cách nhập từ khóa mới!!!");
            }

            if(data.code ==="corsNotAllowed"){
                throw new Error(data.message);
            }

            //Hiển thị các nút chuyển trang nếu dữ liệu trả về thành công và không phát sinh lỗi
            navPageNum.style.display = "block";

            //Hiển thị list các News
            displayNewList(data);
            //Bắt lỗi và thông báo cho người dùng
        }
        catch(err)
        {
            alert(err.message);
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
        getDataNewsByKeywords(keywords, --pageNum.textContent);
    });

    //Bật sự kiện click vào nút Next
    btnNext.addEventListener("click", function(){
        //Gọi hàm này để lấy dữ liệu và hiển thị danh sách các News trước đó
        getDataNewsByKeywords(keywords, ++pageNum.textContent);
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
            html +=`
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

