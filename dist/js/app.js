Amplitude.init({
    "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause'
    },
    "songs": [
        {
            "name": "Risin' High (feat Raashan Ahmad)",
            "artist": "Ancient Astronauts",
            "album": "We Are to Answer",
            "url": "https://521dimensions.com/song/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
            "cover_art_url": "https://cdn.mos.cms.futurecdn.net/n5kbqxzYJR6pgmxTxJUSTh.jpg"
        },
        {
            "name": "SBU Music",
            "artist": "WUSB",
            "album": "SBU",
            "url": "https://stream.wusb.stonybrook.edu/content/3Wed-0300.1.mp3",
            "cover_art_url": "https://www.suny.edu/media/suny/content-assets/images/campus-profiles/logos/binghamton.jpg"
        }
    ]
});

var songsToAdd = [
    {
      "name": "SBU Music",
      "artist": "WUSB",
      "album": "SBU",
      "url": "https://stream.wusb.stonybrook.edu/content/3Wed-0300.1.mp3",
      "cover_art_url": "https://www.suny.edu/media/suny/content-assets/images/campus-profiles/logos/binghamton.jpg"
    }
]

window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};



window.addEventListener("message", (e)=>{ 
    var songToAdd = JSON.parse(window.localStorage.getItem("songToAdd"));
    var index = Amplitude.addSong(songToAdd);
    Amplitude.playPlaylistSongAtIndex(index,  playlistKey = null)
})

/*
    Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});