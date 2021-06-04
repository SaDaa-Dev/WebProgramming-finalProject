const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

// 현재 시각을 불러오는 함수
function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // 삼항 연산자를 이용해서 0이 안붙을 때 0을 삽입해주는 부분
    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${minutes<10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;

}

function init() {
    // 1초마다 현시간 갱신
    setInterval(getTime, 1000); 
}

init()