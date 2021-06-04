const videoForm = document.getElementById("video-form");
const videoInput = videoForm.querySelector("input");
const videoList = document.getElementById("video-list");
const videoButton = document.querySelector(".video-button");

const VIDEOS_KEY = "Videos";
let Videos = [];

// 로컬 저장소에 저장하는 함수
function saveVideos(){
    localStorage.setItem("Videos", JSON.stringify(Videos));
}

// Iframe에 들어가는 유튜브 주소는 embed 주소로 변환되어 들어가야 실제로 적용가능
function convertToEmbeddedURL(videoURL) {
    // 주소를 정규표현식으로 쪼갬
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = videoURL.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoURL;
}

function paintVideo(newVideo){
    const section = document.createElement("section");
    section.setAttribute("class", "video");
    section.id = newVideo.id;
    const div = document.createElement("div");
    div.setAttribute("class","video-player");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("class", "video-frame");
    iframe.setAttribute("src", convertToEmbeddedURL(newVideo.text));
    const button = document.createElement("button");
    button.setAttribute("class","video-button");
    button.innerText = "❌";
    button.addEventListener("click", deleteVideo);

    div.appendChild(iframe);
    div.appendChild(button);
    section.appendChild(div);
    videoList.appendChild(section); // div.video-list에 삽입
}

function handleVideoSubmit(event){
    event.preventDefault();
    const videoURL = videoInput.value;
    videoInput.value = "";
    const newVideoObj = { // id를 오브젝트에 저장해서 지울 위치를 지정
        text: videoURL,
        id: Date.now(), 
    }
    Videos.push(newVideoObj);
    paintVideo(newVideoObj);
    saveVideos(); 
}

function deleteVideo(event){
    const section = event.target.parentElement.parentElement;
    section.remove();
    // 삭제하는 오브젝트 위치와 같은 id를 가진 요소를 삭제
    Videos = Videos.filter((video)=> video.id !== parseInt(section.id)); 
    saveVideos(Videos);
}

videoForm.addEventListener("submit", handleVideoSubmit);


const savedVideos = localStorage.getItem(VIDEOS_KEY);

if(savedVideos){
    const parsedVideos = JSON.parse(savedVideos);
    Videos = parsedVideos;
    parsedVideos.forEach((item)=> paintVideo(item));
}