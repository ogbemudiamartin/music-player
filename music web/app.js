

const name = document.getElementById('title');
const Artist = document.getElementById('sub-title');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const sync = document.getElementById('sync');
const audio = document.querySelector('audio');
const songImg = document.getElementById('songImg');
const header = document.querySelector('.head')
const endTime = document.querySelector('.endTime')
const current_time = document.querySelector('.current_time')
const seek_slider = document.querySelector('.seek_slider')
const volume = document.querySelector('#volume')
const musicContainer = document.querySelector('.music-container')


const autoplay = 0

const song = [
  'Demon__slayer',
  'Dont-Wake_me_up',
  'Fivio Foreign',
  'flora cash - You are Somebody Else',
  'Future - WAIT FOR U (Official) ft. Drake, Tems',
  'Glass Animals - Sometimes all I think about is you (Heat Waves)',
  'Harry Styles - As It Was',
  'Jack Harlow - Already Best Friends feat. Chris Brown'

];
let songIndex = 1;



loadSong(song[songIndex])


function loadSong(song) {
 
  title.innerText = song
  Artist.innerText = 'Uknown'
  audio.src = `music/${song}.mp3`
  songImg.src = `./img/${song}.jpg`
  header.src = `./img/${song}.jpg`
  


}


function playsong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pausesong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}


function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = song.length - 1
  }
  song.lenght + 1

  loadSong(song[songIndex])

  playsong()
}

function nextSong() {
  songIndex++
  if (songIndex > song.lenght - 1 ) {
    songIndex = 0
  }
  loadSong(song[songIndex])
  playsong()
}

function reset(){
  current_time.textContent = "00:00";
  endTime.textContent = "00:00";
  seek_slider.value = 0;
}

function seekTo(){
  let seekto = audio.duration * (seek_slider.value / 100);
  audio.currentTime = seekto;
}

function repeatTrack(){
  let current_index = songIndex;
  loadTrack(current_index);
  playsong();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pausesong()
  }
  else {
    playsong()
  }
})



const menu = document.querySelector('.fa-bars');

menu.addEventListener('click', () => {
  menu.classList.toggle('fa-xmark');
  const playlistMenu = document.querySelector('.playlist-menu')

 if(menu.classList.contains('fa-xmark')){
  playlistMenu.classList.add('action')
 }else{
 
  playlistMenu.classList.remove('action')
 }

})

//audio sound
function volume_sound(e) {
  audio = audio.muted = !audio.muted
 }
//audio sound icon mute
volume.addEventListener('click',function(){
   volume.classList.toggle('fa-volume-xmark')
})

function change_duration() {

}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	current_time.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	endTime.innerHTML = min_d +':'+ sec_d;
		
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);