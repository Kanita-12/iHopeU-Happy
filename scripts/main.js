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
    title: "This Website Going To Play Music In The Background, Don't Leave Page Until The End Because Masih Banyak Bug :)",
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
    setTimeout(() => typeEffect(el, texts, i, j, del), del ? 1000 : 200);
    return;
  }

  const speed = del ? 40 : 110;
  setTimeout(() => typeEffect(el, texts, i, j, del), speed);
}

// ANIMATION TIMELINE

const animationTimeline = () => {
const tl = new TimelineMax();
  const says = document.querySelector(".says");
  const textStep1 = [
  "Hai Chery :)",
  "Gimana kabarnya?",
  "Semoga kamu sehat selalu",
  "Jadi...",
  "Aku cuma mau bilang...",
  ".....",
  "Selamat ulang tahun, Chery",
  "Semoga harapanmu tercapai",
  "Dan Selamat menonton :D"
  ];

  const startGift = document.querySelector(".img-start");
  const videoGift = startGift.querySelector("video");
  const music = document.querySelector(".music");
  const poppet = document.querySelectorAll("audio")[1]

  const lanjut = videoGift.addEventListener("click", () => {
  videoGift.style.pointerEvents = "none";
  videoGift.removeAttribute("loop");
  videoGift.src = "/elementVideo/open.mp4";
  setTimeout(() => {
    poppet.play();
    setTimeout(()=> {
      music.play()
      tl.play("waitClick");
    },1000);
  }, 2000);
});


//   TIMELINE

  tl.to(".container", { visibility: "visible" })
    .call(()=> typeEffect(says, textStep1))
    .from(".step1", { duration: 33 })
    .to(".step1", { duration: 1, opacity: 0}, "+=1")
    .to(".step1",{visibility:"hidden"},"+=0.3")
    .staggerFromTo(
      ".baloons img",
      2.3,
      { y: 1400, opacity: 0.9 },
      { y: -1000, opacity: 1 },
      0.3,
      "-=13"
    )
    .call(()=>{
    music.pause()
    })
    .from(".step3", {duration: 1, opacity: 0 },"+=1")
    .to(".step3", {visibility:"visible",duration: 1, opacity: 1 },"-=1")
    .addPause("waitClick")
    .to(".step3", { duration: 0.5, opacity: 0},"+=1")
    .to(".step3", { visibility:"hidden"},"+=0.3")
    .from(".step4",{visibility:"visible"},"-=1")
    .to(".step4",{duration:0.5, opacity:1},"+=1")
};
