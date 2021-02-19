function itemClick(e) {
  //e.preventDefault();

  //var elm = e.target;
  var audio = document.getElementById('audio');

  var source = document.getElementById('audioSource');
  source.src = "http://87.98.130.255:" + e.getAttribute('port') + "/stream?type=http&amp;nocache=355";

  var st = e.getAttribute('x').toUpperCase();
  audio.load(); //call this to just preload the audio without playing
  //audio.play(); //call this to play the song right away
  audio.play()
    .then(_ => {

      if ('mediaSession' in navigator) {

        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'RPN ' + st,
          artist: 'RPN Radio',
          artwork: [{
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'http://rpnradio.com/tunein/images/thumbnails/ronda-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          ]
        });

        navigator.mediaSession.setActionHandler('play', function () {
          audio.play();
        });
        navigator.mediaSession.setActionHandler('pause', function () {
          audio.stop();
        });
      }

    })
    .catch(error => {
      console.log(error)
    });

  //Get and Set Image Url String
  var urlString = 'url(/images/' + e.getAttribute('x') + '.jpg';

  //Station Cover Photo
  var imgcontainer = document.getElementById('img-container');
  imgcontainer.style.backgroundImage = urlString;
  imgcontainer.style.height = '30vh';
  imgcontainer.style.width = '768px';
  imgcontainer.style.display = "block";

  //Show Audio Controls
  var player = document.getElementById('player');
  player.style.display = "table";


};

var isNavOpen = false;

//Navigations
function closeNav() {
  document.getElementById('mobile-nav').classList.remove('show');
  isNavOpen = false;
};

function openNav() {
  document.getElementById('mobile-nav').classList.add('show');
  document.getElementById('mobile-nav').classList.add('show');
  isNavOpen = true;
};

function goBack() {
  if (isNavOpen) {
    closeNav();
  }
  else if (document.referrer == "") {
    window.location.href = "https://tunein.rpnradio.com/";
  }
  else {
    window.history.back()
  }
};

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}