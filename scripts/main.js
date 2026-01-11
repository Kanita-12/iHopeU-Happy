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
    title:
      "This Website Going To Play Music In The Background, Don't Leave Page Until The End Because Masih Banyak Bug :)",
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

function typeEffect(el, texts) {
  return new Promise((resolve) => {
    function run(i = 0, j = 0, del = false) {
      const text = texts[i];
      el.textContent = text.slice(0, j);

      if (!del && j < text.length) j++;
      else if (del && j > 0) j--;
      else {
        if (i === texts.length - 1 && !del) {
          resolve();
          return;
        }
        del = !del;
        if (!del) i++;
        setTimeout(() => run(i, j, del), del ? 1000 : 200);
        return;
      }

      setTimeout(() => run(i, j, del), del ? 40 : 110);
    }
    run();
  });
}

// Another Type effect

function typeEffectt(el, texts) {
  return new Promise((resolve) => {
    function run(i = 0, j = 0, del = false) {
      const text = texts[i];
      el.textContent = text.slice(0, j);

      if (!del && j < text.length) j++;
      else if (del && j > 0) j--;
      else {
        if (i === texts.length - 1 && !del) {
          resolve();
          return;
        }
        del = !del;
        if (!del) i++;
        setTimeout(() => run(i, j, del), del ? 1000 : 200);
        return;
      }

      setTimeout(() => run(i, j, del), del ? 40 : 85);
    }
    run();
  });
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
    "Dan selamat menonton :D",
  ];

  const startGift = document.querySelector(".img-start");
  const videoGift = startGift.querySelector("video");
  const music = document.querySelector(".music");
  const poppet = document.querySelectorAll("audio")[1];
  const accept = document.querySelectorAll("p")[0];

  videoGift.addEventListener("click", () => {
    videoGift.style.pointerEvents = "none";
    videoGift.removeAttribute("loop");
    videoGift.src = "elementVideo/open.mp4";
    accept.style.color = "green";
    accept.innerText = "Okey, Let Start :D";
    setTimeout(() => {
      poppet.play();
      setTimeout(() => {
        music.play();
        tl.play("waitClick");
      }, 1000);
    }, 2000);
  });

  const happyBirthDay = document.querySelector(".step4");
  const happyBirthDayTitle = happyBirthDay.querySelector(".titleBirthDay");
  happyBirthDayTitle.innerHTML = happyBirthDayTitle.textContent
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  const card = document.querySelector(".card");
  const cardText = card.querySelector(".card-text");
  const textCard = [
    "Wishing you joy, laughter, and endless happiness today 🎂💖",
  ];

  const step6 = document.querySelector(".step6");
  const textStep6 = step6.querySelector("h1");
  const greetingTextStep6 = [
    "Jadi...",
    "Selamat ulang tahun, Chery",
    "Semoga harimu selalu cerah",
    "Penuh tawa dan senyum tulus",
    "Dan di hari yang spesial ini",
    "Semoga dipenuhi senyum hangatmu",
    "Aku harap kamu sempat melihat ucapan ini",
    "Walau terlihat sederhana",
    "Semoga kamu menyukainya",
    "Dan...",
  ];

  const step7 = document.querySelector(".step7");
  const happyBirthDay7 = step7.querySelector(".happyBirthday");
  happyBirthDay7.innerHTML = happyBirthDay7.textContent
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  const letter = step7.querySelector("p");

  // End Button
  const btn = document.querySelector(".magic-btn");

  //   TIMELINE

  tl.to(".container", { visibility: "visible" })
    .call(() => typeEffect(says, textStep1))
    .from(".step1", { duration: 33 })
    .to(".step1", { duration: 1, opacity: 0 }, "+=1")
    .to(".step1", { visibility: "hidden" }, "+=0.3")
    .staggerFromTo(
      ".baloons img",
      2.3,
      { y: 1400, opacity: 0.9 },
      { y: -1000, opacity: 1 },
      0.3,
      "-=13"
    )
    .call(() => {
      music.pause();
    })
    .from(".step3", { duration: 1, opacity: 0 }, "+=1")
    .to(".step3", { visibility: "visible", duration: 1, opacity: 1 }, "-=1")
    .addPause("waitClick")
    .to(".step3", { duration: 0.5, opacity: 0 }, "+=1")
    .to(".step3", { visibility: "hidden" }, "+=0.3")
    .to(".step4", { visibility: "visible", opacity: 0 }, "-=1")
    .from(
      ".step4",
      { duration: 0.7, opacity: 0, y: 30, ease: "power2.out" },
      "-=0.5"
    )

    .staggerFromTo(
      ".picture-wrap",
      1.2,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: "elastic.out(1, 0.6)" },
      0.2
    )
    .staggerFrom(
      ".titleBirthDay span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1,
      "-=1"
    )

    .staggerFromTo(
      ".titleBirthDay span",
      0.7,
      { scale: 1.4, rotationY: 150 },
      { scale: 1, rotationY: 0, color: "pink", ease: Expo.easeOut },
      0.1
    )
    .to(".titleBirthDay span", {
      y: 10,
      opacity: 0.6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
      color: "#77c0ff",
    })
    .from(
      ".number",
      { duration: 0.8, opacity: 0, y: 40, ease: "back.out(1.7)" },
      "-=2"
    )
    .staggerTo(
      ".step5 svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .from(
      ".card",
      {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        y: 20,
        ease: "elastic.out(1, 0.4)",
      },
      "-=1"
    )
    .call(() => typeEffect(cardText, textCard))
    .staggerFromTo(
      ".baloons img",
      2.3,
      { y: 1400, opacity: 0.9 },
      { y: -1000, opacity: 1 },
      0.3
    )
    .to(".step4", 0.5, { opacity: 0 })
    .to(".step4", 0.5, { visibility: "hidden" })
    .to("body", {
      backgroundColor: "#1a1a2e",
      duration: 2,
      ease: "power2.inOut",
    })
    .to(".step6", { visibility: "visible", opacity: 0 })

    .call(async () => {
      await typeEffectt(textStep6, greetingTextStep6);
    })
    .to(".step6", { opacity: 1, duration: 0.5 })
    .to(".step6", { duration: 40 })
    .to(".step6", { opacity: 0, duration: 0.5, delay: 1 }, "+=1")
    .to(".step6", { visibility: "hidden" }, "+=1")
    .to(".step7", { visibility: "visible", opacity: 0 })
    .to(".step7", { opacity: 1 })
    .set(".step5", { visibility: "visible" })
    .set(".step5 svg", {
      scale: 0,
      opacity: 1,
      visibility: "visible",
    })
    .staggerTo(
      ".step5 svg",
      1.5,
      {
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(
      "body",
      {
        backgroundColor: "#dedef8ff",
        duration: 2,
        ease: "power2.inOut",
      },
      "-=3.6"
    )
    .staggerFrom(
      ".happyBirthday span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".happyBirthday span",
      0.7,
      { scale: 1.4, rotationY: 150 },
      { scale: 1, rotationY: 0, color: "pink", ease: Expo.easeOut },
      0.1
    )
    .fromTo(
      letter,
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    )

    .to(".happyBirthday span", {
      y: 10,
      opacity: 0.6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
      color: "#ff2323ff",
    })
    .staggerFromTo(
      ".baloons img",
      2.3,
      { y: 1400, opacity: 0.9 },
      { y: -1000, opacity: 1 },
      0.3,
      "=-3"
    )
    .to(".baloons img", { visibility: "hidden" })
    .to(".step8", { visibility: "visible", opacity: 0 })
    .to(".step8", { opacity: 1 })
    .fromTo(
      ".step8 .magic-btn",
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

  gsap.set(btn, { scale: 1 });

  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.08,
      boxShadow: "0 0 30px rgba(255,122,217,0.8)",
      duration: 0.3,
      ease: "power3.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      duration: 0.3,
      ease: "power3.out",
    });
  });

  btn.addEventListener("mousedown", () => {
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
    });
  });

  btn.addEventListener("mouseup", () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.15,
    });
  });
  btn.addEventListener("click", () => {
  gsap.to("body", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      window.location.href = window.location.href;
    }
  });
});
 
};
