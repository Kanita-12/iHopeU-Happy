// MUSIC
const FADE_IN_TIME = 1000;
const MAX_VOLUME = 0.5;
const INTERVAL = 10;

const steps = FADE_IN_TIME / INTERVAL;
const volumeStep = MAX_VOLUME / steps;

function fadeInMusic(musicElement) {
  musicElement.volume = 0;
  musicElement
    .play()
    .then(() => {
      let currentVolume = 0;

      const fadeInInterval = setInterval(() => {
        if (currentVolume < MAX_VOLUME) {
          currentVolume += volumeStep;
          musicElement.volume = Math.min(currentVolume, MAX_VOLUME);
        } else {
          clearInterval(fadeInInterval);
          musicElement.volume = MAX_VOLUME;
        }
      }, INTERVAL);
    })
    .catch((error) => {
      console.error("Music EROR!!", error);
    });
}

// ALERTT

window.addEventListener("load", () => {
  Swal.fire({
    title: "This Website Going To Play Music In The Background",
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  }).then(() => {
    setTimeout(() => {
      const music = document.querySelector(".music");
      fadeInMusic(music);
      animationTimeline();
    }, 1000);
  });
});

// TYPE EFFECT

function typeEffect(el, texts, i = 0, j = 0, del = false) {
  const text = texts[i];
  el.textContent = text.slice(0, j);

  if (!del && j < text.length) j++;
  else if (del && j > 0) j--;
  else {
    if (i === texts.length - 1 && !del) return;
    del = !del;
    if (!del) i = i + 1;
    setTimeout(() => typeEffect(el, texts, i, j, del), del ? 2000 : 300);
    return;
  }

  const speed = del ? 50 : 100;
  setTimeout(() => typeEffect(el, texts, i, j, del), speed);
}

// ANIMATION TIMELINE

const animationTimeline = () => {
  const says = document.querySelector(".says");
  const textStep1 = [
    "ini kalimat ke satu",
    "ini kalimat ke dua",
    "ini kalimat ke tiga",
    "ini kalimat ke empat",
    "ini kalimat ke lima",
  ];

  const present = document.querySelector(".textPresent");
  const textStep2 = ["Kalimat1"];

  const startGift = document.querySelector(".img-start");
  const videoGift = startGift.querySelector("video");
  const music = document.querySelector(".music");
  const poppet = document.querySelectorAll("audio")[1]

  videoGift.addEventListener("click", () => {
  videoGift.removeAttribute("loop");
  videoGift.src = "/elementVideo/open.mp4";
  setTimeout(() => {
    poppet.play();
    setTimeout(()=> {
      music.play()
    },1000);
  }, 2000);
});


//   TIMELINE
  const tl = new TimelineMax();

  tl.to(".container", { visibility: "visible" })
    .call(()=> typeEffect(says, textStep1))
    .from(".step1", { duration: 23 })
    .to(".step1", { duration: 2, opacity: 0 }, "+=1")
    .staggerFromTo(
      ".baloons img",
      2.3,
      { y: 1400, opacity: 0.9 },
      { y: -1000, opacity: 1 },
      0.3,
      "-=2.7"
    )
    .call(()=>{
    music.pause()
    })
    .from(".step3", {opacity: 0 },"+=1")
    .call(()=> typeEffect(present,textStep2,))
    .to(".step3", { duration: 0.5, opacity: 1 })
};
