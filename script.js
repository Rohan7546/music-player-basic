rightBox = document.getElementById('rightBox');
let audioElement = new Audio('songs/song1.mp3');
let rangeBar = document.getElementById('rangeBar');
let bannerImage = document.getElementById('bannerImage');
let bottomSongImage = document.getElementById('bottomSongImage');
let bottomSongName = document.getElementById('bottomSongName');
let songIndex = 1;
for (let i=1; i<=13;i++) {
    let div = document.createElement('div');
    div.innerHTML = `<div id = "" class="songList">
                    <span ><img id="songImg${i}" class="songImage" alt="songImage"></span>
                    <span id="song${i}" class="songIcon"><img class="play-pause" src="assets/play.svg" id="play-pause-${i}"></span>
                    <span id="songName${i}" class="songName"></span>
                    <span id="songDuration${i}" class="songDuration"></span>
                    
                    </div>`
    rightBox.append(div);
}
const songObj = [

]

 
 for(let i=1; i<=14; i++) {
    songObj.push({
        imageSrc : `songImage/image${i}.jpg`,
        songSrc : `songs/song${i}.mp3`,
        songName : `song${i}`,
        duration : 0
    })
};
songImageList = Array.from(document.getElementsByClassName('songImage'));
songName = Array.from(document.getElementsByClassName('songName'));
songIcon = Array.from(document.getElementsByClassName('songIcon'));
songDuration = Array.from(document.getElementsByClassName('songDuration'));
songImageList.forEach((element, index) => {
    element.src = songObj[index].imageSrc;
});
const durationarr= []
songName.forEach((element, index)=>{
    element.innerHTML = songObj[index].songName;
     
    
    let songAudio = new Audio(songObj[index].songSrc);
    let i = index;
    songAudio.onloadedmetadata =  function() {
        
        const timeInMin = Math.floor(songAudio.duration/60);
        const timeInSec = Math.floor(songAudio.duration - timeInMin * 60)
        if(timeInSec < 10) {
            songObj[i].duration = (timeInMin + ':0' + timeInSec);
        songDuration[i].innerHTML = (timeInMin + ':0' + timeInSec);
        }
        else {
            
        songObj[i].duration = (timeInMin + ':' + timeInSec);
        songDuration[i].innerHTML = (timeInMin + ':' + timeInSec);
        }
    }
      
})
let prevClick = document.getElementById('play-pause-1');
songIcon.forEach((element, index)=>{   
    element.addEventListener('click',(e)=>{
        let bottomPlayIcon = document.getElementById('bottom-play-icon');
        if(e.target.src.substr(-9)==="pause.svg"){
            e.target.src="assets/play.svg";
            audioElement.pause();            
            bottomPlayIcon.src="assets/play.svg";
            bannerImage.removeAttribute('src');
            bannerImage.removeAttribute('class');
            bottomSongImage.src = songObj[index].imageSrc;
            bottomSongName.innerHTML = songObj[index].songName
        }
        else {
            e.target.src="assets/pause.svg";
            audioElement.src = (`songs/${element.id}.mp3`);
            audioElement.play();
            let leftElement= document.getElementById('leftBoxImage');
            leftElement.src=songObj[index].imageSrc;
            bottomPlayIcon.src="assets/pause.svg";
            bannerImage.src = "assets/playing.gif";
            bannerImage.setAttribute('class','banner-Image');
            bottomSongImage.src = songObj[index].imageSrc;
            bottomSongName.innerHTML = songObj[index].songName
        }
        
        if(prevClick && prevClick!=e.target) {
            prevClick.src="assets/play.svg";
        } 
        prevClick = e.target;      
        
         songId = e.target.id;
         songIndex = index + 1;
        console.log("index",songIndex)
    })
    
})
let bottomPlaypause = document.getElementById('bottom-play-icon');
bottomPlaypause.addEventListener('click',(e)=>{
    if(audioElement.paused) {
        audioElement.play();
        bottomPlaypause.src="assets/pause.svg";
        prevClick.src="assets/pause.svg";
        bannerImage.src="assets/playing.gif";
        bannerImage.setAttribute('class','banner-Image');
        
    }
    else {
        audioElement.pause();
        bottomPlaypause.src="assets/play.svg"
        prevClick.src="assets/play.svg";
        bannerImage.removeAttribute('src');
        bannerImage.removeAttribute('class');
    }
})

audioElement.addEventListener("timeupdate",()=>{
    timeSeeked = parseInt((audioElement.currentTime/audioElement.duration)*100);
    rangeBar.value = timeSeeked;

})
rangeBar.addEventListener('change',()=>{
    audioElement.currentTime = (rangeBar.value*audioElement.duration)/100;
})

let next = document.getElementById('bottom-next-icon');
next.addEventListener('click',(e)=>{
    if(songIndex < 13) {
        songIndex += 1
    }
    else {
        songIndex = 1;
    }
    audioElement.src=`songs/song${songIndex}.mp3`;
    audioElement.play();
    let leftElement= document.getElementById('leftBoxImage');
    leftElement.src=`songImage/image${songIndex}.jpg`;
    bottomSongImage.src=`songImage/image${songIndex}.jpg`;
    bottomSongName.innerHTML=`song${songIndex}`;
    let playPauseChangeOnClick = document.getElementById(`play-pause-${songIndex}`);
    playPauseChangeOnClick.src="assets/pause.svg";
    prevClick.src="assets/play.svg";
    bottomPlaypause.src = "assets/pause.svg";
    prevClick = playPauseChangeOnClick;

})

let prev = document.getElementById('bottom-prev-icon');
prev.addEventListener('click',(e)=>{
    if(songIndex == 1) {
        songIndex =1;
    }
    else {
        songIndex-=1;
    }
    audioElement.src=`songs/song${songIndex}.mp3`;
    audioElement.play();
    let leftElement= document.getElementById('leftBoxImage');
    leftElement.src=`songImage/image${songIndex}.jpg`;
    bottomSongImage.src=`songImage/image${songIndex}.jpg`;
    bottomSongName.innerHTML=`song${songIndex}`;
    let playPauseChangeOnClick = document.getElementById(`play-pause-${songIndex}`);
    playPauseChangeOnClick.src="assets/pause.svg";
    bottomPlaypause.src = "assets/pause.svg"
    prevClick.src="assets/play.svg";
    prevClick = playPauseChangeOnClick;
})

document.getElementById('homeNavigator').addEventListener('click',()=>{
    window.location.reload();
});
document.getElementById('aboutUsLink').addEventListener('click',()=>{
    alert("Basic-Music-Player : developed by Rohan Prakash. ")
})
 