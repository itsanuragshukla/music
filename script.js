var lastsong = 0;
var aud = new Audio();
var status = "paused";
var content = document.getElementById("content");
var songs= songsHi44;
var data =dataHi;
var art = artHi;
var quality=44;
var currentCategory="hindi";
var list = function(id, name, author) {
var artSrc = (art.find(x => x.name === songs[id].name+"_96").url);

    return `    
       <div class="cardlist" id ="cardlist${id}" onclick="playselected(${id})"> 
       <div  class ="art"><img class="art" alt ="artwork" src="${artSrc}" loading="lazy"/></div>
       <div class ="details">
       <div class="titlelist">${name}</div>        
      <div class="authorlist">${author}</div>
       </div>  
       </div>

        `;

};


function addcards(){
var i = 0;
var aHTML = [];
while (i<songs.length) {
var p = songs[i].name;

var songName=(data.find(x => x.id === p).title);
var songArtist=(data.find(x => x.id === p).artist);
aHTML.push(list(i, songName, songArtist));
  i++
  
}

var sHTML = aHTML.join('');
var domElmt = $(sHTML);
$('#content').prepend(domElmt);

}


function openSearch() {
    $("#name").toggleClass("searchActive");
    $("#searchBar").toggleClass("searchActive")
    $("#searchBar").val("");
    if(!$("#searchBar").hasClass("searchActive")){
        $("#searchBar").focus();	
    }
    else{
    	    $("#searchBar").blur();
    }

    $(".cardlist").each(function() {
        $(this).css('display', "")
    });
}

function openSideNav() {
    $("#sideNav").toggleClass("navActive");
    $("#navdiv").toggleClass("navdivActive");
}

function transition() {
    $("#player").css("transition", "0.5s");
}

function slideUp(e) {
    var slideUp = document.getElementById("player").classList.contains("slideUp");
    if (slideUp == true) {
        $(e).css("border-width", "0px")
        $(e).css('height', "0vh");
        $(e).toggleClass("slideUp");
        $("#up").css("transform", "rotate(0deg)");
    }
    if (slideUp == false) {
        $(e).css("height", "70vmin");
        $(e).css("border-width", "2px")
        $(e).toggleClass("slideUp");
        $("#up").css("transform", "rotate(180deg)");
    }
}



function search() {
    var m = $(".content>.cardlist");
    var inp = $("#searchBar").val().toUpperCase();
    for (var i = 0; i <= m.length - 1; i++) {
        if (m[i].innerHTML.toUpperCase().indexOf(inp) != -1) {
            m[i].style.display = "";
        } else {
            m[i].style.display = "none";
        }
    }
}



var isPlaying = aud.currentTime > 0 && !aud.paused && !aud.ended && aud.readyState > 2;


function playselected(id) {

var songName=(data.find(x => x.id === songs[id].name).title);
var songArtist=(data.find(x => x.id === songs[id].name).artist);
    aud.src = songs[id].url;
    $(`#cardlist${lastsong}`).css("background", "");
    lastsong = id;
    $(`#cardlist${lastsong}`).css("background", "#501f3a");
    $("#title").html(songName);
    $("#artist").html(songArtist);
    var artSrc = (art.find(x => x.name === songs[lastsong].name+"_192").url);
    $("#artwork").attr("src",artSrc);
    $(".footertitle").html(songName);
    $(".footerauthor").html(songArtist);
    if (isPlaying) {
        play();
    }
  setLyrics(id);
    duration();
    play();
}

function next() {
    if (isPlaying) {
        play();
    }
    $(`#cardlist${lastsong}`).css("background", "");
    lastsong += 1;
    $(`#cardlist${lastsong}`).css("background", "#501f3a");
    if (lastsong > (songs.length - 1)) {
        $(`#cardlist${lastsong}`).css("background", "");
        lastsong = 0;
        $(`#cardlist${lastsong}`).css("background", "#501f3a");
    }
var songName=(data.find(x => x.id === songs[lastsong].name).title);
var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
    aud.src = songs[lastsong].url;
    status = "playing";
    setNots(songName, songArtist, status,songs[lastsong].name);
    
    $("#title").html(songName);
    $("#artist").html(songArtist);
    var artSrc = (art.find(x => x.name === songs[lastsong].name+"_192").url);
    $("#artwork").attr("src",artSrc);
    $(".footertitle").html(songName);
    $(".footerauthor").html(songArtist);
    setLyrics(lastsong);
    play();
}

function prev() {
    if (isPlaying) {
        play();
    }
    $(`#cardlist${lastsong}`).css("background", "");
    lastsong -= 1;
    $(`#cardlist${lastsong}`).css("background", "#501f3a");
    if (lastsong < 0) {
        $(`#cardlist${lastsong}`).css("background", "");
        lastsong = (songs.length - 1);
        $(`#cardlist${lastsong}`).css("background", "#501f3a");
    }
var songName=(data.find(x => x.id === songs[lastsong].name).title);
var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
    aud.src = songs[lastsong].url;
    $("#title").html(songName);
    $("#artist").html(songArtist);
    $(".footertitle").html(songName);var artSrc = (art.find(x => x.name === songs[lastsong].name+"_192").url);
    $("#artwork").attr("src",artSrc);
    status = "playing";
    setNots(songName, songArtist, status,songs[lastsong].name);
    
    $(".footerauthor").html(songArtist);
    setLyrics(lastsong);
    play();
}

function play() {
    var isPlaying = aud.currentTime > 0 && !aud.paused && !aud.ended && aud.readyState > 2;
    if (isPlaying == false) {
        aud.play();
        status = "playing";
        $("#playbtn").html("<path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z'>");
        $("#footerplaybtn").html("<path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z'>");
var songName=(data.find(x => x.id === songs[lastsong].name).title);
var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
        setNots(songName, songArtist, status,songs[lastsong].name);
    } else {
        aud.pause();
        status = "paused";
        $("#playbtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
        $("#footerplaybtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
var songName=(data.find(x => x.id === songs[lastsong].name).title);
var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
        setNots(songName, songArtist, status ,songs[lastsong].name);
    }
}

function mint() {
    var isPlaying = aud.currentTime > 0 && !aud.paused && !aud.ended && aud.readyState > 2;
    if (isPlaying) {
        aud.currentTime = aud.currentTime - 10;
    }
}

function maxt() {
    var isPlaying = aud.currentTime > 0 && !aud.paused && !aud.ended && aud.readyState > 2;
    aud.currentTime = aud.currentTime + 10;

}

function duration() {
    aud.onloadedmetadata = function() {
        let duration = aud.duration;
        let current = aud.currentTime;
        let currentMinutes = Math.floor(current / 60);
        let currentSeconds = Math.floor(current - currentMinutes * 60);
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration - durationMinutes * 60);
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        $("#curr").text(currentMinutes + ":" + currentSeconds);
        $("#dur").text(durationMinutes + ":" + durationSeconds);
        $("#footercurr").text(currentMinutes + ":" + currentSeconds);
        $("#footerdur").text(durationMinutes + ":" + durationSeconds);

    }
};

function stop() {
    aud.pause();
    $("#playbtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
    $("#footerplaybtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
  var songName=(data.find(x => x.id === songs[lastsong].name).title);
  var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
        status = "paused";
    setNots(songName, songArtist, status,songs[lastsong].name);
    aud.currentTime = 0;
}

function seekTo(e) {
    seekto = aud.duration * (e.value / 100);
    aud.currentTime = seekto;
    let current = aud.currentTime;
    let currentMinutes = Math.floor(current / 60);
    let currentSeconds = Math.floor(current - currentMinutes * 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
        $("#curr").text(currentMinutes + ":" + currentSeconds);
    }


}

function curr() {
    let curr = aud.currentTime;
    let currentMinutes = Math.floor(curr / 60);
    let currentSeconds = Math.floor(curr - currentMinutes * 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
        $("#curr").text(currentMinutes + ":" + currentSeconds);
        $("#footercurr").text(currentMinutes + ":" + currentSeconds);
        $(".seek_slider").value = aud.currentTime * ("100") / aud.duration;
        $(".footer_seek_slider").value = aud.currentTime * ("100") / aud.duration;

    };
}
setInterval(seekUpdate, 1000)



function seekUpdate() {
    let seekPosition = 0;
    seekPosition = aud.currentTime * (100 / aud.duration);
    let seek_slider = document.querySelector(".seek_slider");
    seek_slider.value = seekPosition;
    let footer_seek_slider = document.querySelector(".footer_seek_slider");
    footer_seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(aud.currentTime / 60);
    let currentSeconds = Math.floor(aud.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(aud.duration / 60);
    let durationSeconds = Math.floor(aud.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
    }
    $("#curr").text(currentMinutes + ":" + currentSeconds);
    $("#dur").text(durationMinutes + ":" + durationSeconds);
    $("#footercurr").text(currentMinutes + ":" + currentSeconds);
    $("#footerdur").text(durationMinutes + ":" + durationSeconds);

}

aud.onended = function() {
    aud.currentTime = 0;
    $("#playbtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
    $("#footerplaybtn").html("<path d='M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>");
    next();

};

const actionHandlers = [
    ['play', () => {
        play()
    }],
    ['pause', () => {
        play()
    }],
    ['previoustrack', () => {
        prev()
    }],
    ['nexttrack', () => {
        next()
    }],
    ['stop', () => {
        stop()
    }],
    ['seekbackward', () => {
        mint()
    }],
    ['seekforward', () => {
        maxt()
    }],
    ['seekto', (details) => {
        /* ... */ }],
];

for (const [action, handler] of actionHandlers) {
    try {
        navigator.mediaSession.setActionHandler(action, handler);
    } catch (error) {
        console.log(`The media session action "${action}" is not supported yet.`);
    }
}

function setNots(title, artist, status,name) {

    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
            //   album: 'Songs',
            artwork: [{
                    src: (art.find(x => x.name === name+"_96").url),
                    sizes: '96x96',
                    type: 'image/jpg'
                },
                {
                    src: (art.find(x => x.name === name+"_128").url),
                    sizes: '128x128',
                    type: 'image/jpg'
                },
                {
                    src: (art.find(x => x.name === name+"_192").url),
                    sizes: '192x192',
                    type: 'image/jpg'
                },
                {
                    src: (art.find(x => x.name === name+"_256").url),
                    sizes: '256x256',
                    type: 'image/jpg'
                },
                {
                    src: (art.find(x => x.name === name+"_384").url),
                    sizes: '384x384',
                    type: 'image/jpg'
                },
                {
                    src: (art.find(x => x.name === name+"_512").url),
                    sizes: '512x512',
                    type: 'image/jpg'
                },
            ]
        });
        navigator.mediaSession.playbackState = status;
    }

}

function getIndex(i) {
    var index = data.map(function(name) {
        return name.name;
    }).indexOf(i);
    return index;
}

function getArtIndex(i,arr) {
    var index = arr.map(function (obj) { return obj.name;}).indexOf(i);
    return index;
   
}

function switchCategory(e){
lastsong=0;
Array.from(document.querySelectorAll('.activeCategory')).forEach((el) => el.classList.remove('activeCategory'));
e.classList.add("activeCategory");
content.innerHTML='';
currentCategory=e.id;
if(e.id=="hindi"){
songs=window[(`songsHi${quality}`)];
data=dataHi;
art=artHi;
}
if(e.id=="english"){
songs=window[(`songsEn${quality}`)];
data=dataEn;
art=artEng;
}
addcards();
}

function setLyrics(e){
if("lyrics" in data[e]==true){
var lyrics=data.find(x => x.id === songs[e].name).lyrics;
if(lyrics=="null"){
$("#sideNav").text("Sorry, Lyrics for this song is not available yet");            
}
else{
$("#sideNav").text(" ");            
document.getElementById("sideNav").innerText=(lyrics);
}
}else{
$("#sideNav").text("You don't need the lyrics for this song. I know that");            
}
}


function qChange(e){
quality=e.value;
content.innerHTML='';
var songId = songs[lastsong].name;
var prevCurr= aud.currentTime;
if(currentCategory=="hindi"){
songs=window[(`songsHi${quality}`)];
data=dataHi;
art=artHi;
}
if(currentCategory=="english"){
songs=window[(`songsEn${quality}`)];
data=dataEn;
art=artEng;
}
play();
lastsong = songs.findIndex(x => x.name === songId);
playselected(lastsong);
aud.currentTime=prevCurr;
addcards();
}