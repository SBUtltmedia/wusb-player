/*
	When the bandcamp link is pressed, stop all propagation so AmplitudeJS doesn't
	play the song.
*/
let bandcampLinks = document.getElementsByClassName('bandcamp-link');

for( var i = 0; i < bandcampLinks.length; i++ ){
	bandcampLinks[i].addEventListener('click', function(e){
		e.stopPropagation();
	});
}


let songElements = document.getElementsByClassName('song');

for( var i = 0; i < songElements.length; i++ ){
	/*
		Ensure that on mouseover, CSS styles don't get messed up for active songs.
	*/
	songElements[i].addEventListener('mouseover', function(){
		this.style.backgroundColor = '#00A0FF';

		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';

		if( !this.classList.contains('amplitude-active-song-container') ){
			this.querySelectorAll('.play-button-container')[0].style.display = 'block';
		}


		this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
	});

	/*
		Ensure that on mouseout, CSS styles don't get messed up for active songs.
	*/
	songElements[i].addEventListener('mouseout', function(){
		this.style.backgroundColor = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
		this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'block';
		this.querySelectorAll('img.bandcamp-white')[0].style.display = 'none';
		this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
	});

	/*
		Show and hide the play button container on the song when the song is clicked.
	*/
	songElements[i].addEventListener('click', function(){
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
	});
}

/*
	Initializes AmplitudeJS
*/
Amplitude.init({
    "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause'
    },
    "songs": [
    ]
});

function updateVisualEffect(songToAdd) {
	var container = document.createElement("div");
	var rightPlayer = document.getElementById("amplitude-right");
        
	container.className = "song amplitude-song-container amplitude-play-pause";
	container.setAttribute('data-amplitude-song-index', Amplitude.getActiveIndex());

	container.innerHTML = `
	<div class="song-now-playing-icon-container">
    <div class="play-button-container">
	</div>
	<img class="now-playing" src="./img/now-playing.svg"/>
	</div>
	<div class="song-meta-data">
	<span class="song-title">${songToAdd["name"]}</span>
	<span class="song-artist">${songToAdd["artist"]}</span>
	</div>
	`;
	rightPlayer.appendChild(container);
	var songs = rightPlayer.getElementsByClassName("song amplitude-song-container amplitude-play-pause");

	for(i = 0; i < songs.length - 1; i++) {
		console.log(i);
		songs[i].classList.remove('song-now-playing-icon-container');
	}
}

window.addEventListener("load", (e)=>{
	window.localStorage.setItem("player", true);
	loadSongs();
})

window.addEventListener("beforeunload", (event) => {
    window.localStorage.clear();
});

window.addEventListener("storage", loadSongs)

function loadSongs() { 
    var songsToAdd = JSON.parse(window.localStorage.getItem("songs"));
	console.log(songsToAdd)
	songsToAdd.forEach(song => {
		console.log(song)
		Amplitude.addSong(song);
		Amplitude.bindNewElements()
		Amplitude.next( playlistKey = null)
		updateVisualEffect(song);	
	});
	if (Amplitude.getActiveIndex() == 0) {
		Amplitude.playSongAtIndex( 0 )
	} 
 
}
