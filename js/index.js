const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const imgDescription = document.getElementById("imgDescription");

function openFullImg(pic, description) {
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
    imgDescription.textContent = description; 
}

function closeFullImg() {
    fullImgBox.style.display = "none";
}
