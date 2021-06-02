const resolver = {
  resolve: function resolve(options) {
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
          element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  } };
const strings = ['Music Player'];
let counter = 0;
const options = {
  offset: 0,
  timeout: 15,
  iterations: 5,
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  resolveString: strings[counter],
  element: document.querySelector('[data-target-resolver]') };
function callback() {}
resolver.resolve(options);

window.onload = function() {
runOnload();
    }
    
    function runOnload(){
    setTimeout(transition, 1000);
    addcards();
    $("#cardlist0").css("background", "#501f3a");
    $("#pre").css("display" , "none");
    var songName=(data.find(x => x.id === songs[lastsong].name).title);
    var songArtist=(data.find(x => x.id === songs[lastsong].name).artist);
    $("#title").html(songName);
    $("#artist").html(songArtist);
    $(".footertitle").html(songName);
    $(".footerauthor").html(songArtist);
    var artSrc = (art.find(x => x.name === songs[lastsong].name+"_192").url);
    $("#artwork").attr("src",artSrc);
    aud.src=songs[0].url;
    setLyrics(0);
    duration();
    }