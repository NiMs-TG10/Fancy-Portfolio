const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var timeline = gsap.timeline();
  timeline.from(".line h1", {
    y: 150,
    duration: 1,
    stagger: 0.2,
  });

  locoScroll.stop()
  timeline.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      let h5_timer = document.querySelector("#line1-part1 h5");
      let count = 0;
      setInterval(() => {
        if (count < 100) {
          h5_timer.innerHTML = count++;
        } else {
          h5_timer.innerHTML = count;
          locoScroll.start()
        }
      }, 30);
    },
  });
  timeline.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });
  timeline.to("#loader", {
    opacity: 0,
    duration: 0.5,
    delay: 2,
  });

  timeline.from("#page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });

  timeline.to("#loader", {
    display: "none",
  });
  timeline.from("#nav", {
    opacity: 0,
  });
  timeline.from(".hero h1", {
    y: 120,
    stagger: 0.2,
  });
  timeline.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}

function mouse_animation() {
  document.querySelector("body").style.cursor = "none";
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav-part2 h4");

  let videocontainer = document.querySelector("#video-container");
  let video = document.querySelector("#video-container video");

  videocontainer.addEventListener("mouseenter", function () {
    videocontainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        display: "none",
        opacity: "0",
      });
      gsap.to("#video-cursor", {
        left: dets.x - 570,
        top: dets.y - 300,
      });
    });
  });
  videocontainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      display: "initial",
      opacity: "1",
    });
    gsap.to("#video-cursor", {
      left: "80%",
      top: "-10%",
    });
  });

  let flag = 0;
  videocontainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      let icon = document.querySelector("#video-cursor");
      icon.innerHTML = '<i class="ri-pause-large-fill"></i>';
      flag = 1;
    } else {
      flag = 0;
      video.pause();
      video.style.opacity = 0;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      let icon = document.querySelector("#video-cursor");
      icon.innerHTML = '<i class="ri-play-fill"></i>';
      flag = 0;
    }
  });
}

function gooeyEffect() {
  Shery.imageEffect(".image-div1 ,.image-div2 , .image-div3 , .image-div4", {
    style: 5,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8000000317891439 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.61, range: [0, 10] },
      metaball: { value: 0.5, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 7.63, range: [0, 100] },
    },
  });
}
function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y,
    });
  });

  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to(".mousefollower", {
      display: "none",
      opacity: "0",
    });
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      display: "initial",
      opacity: "1",
    });
    gsap.to("#flag", {
      opacity: 0,
    });
  });
}

flagAnimation();
mouse_animation();
locomotive();
loadingAnimation();
gooeyEffect();

// gsap.from("#footer h1", {
//   opacity: 0,
//   delay: 3,
//   duration: 1,
//   onStart: function () {
//     $("#footer h1").textillate({ in: { effect: "fadeIn" } });
//   },
// });

// gsap.from(".underline", {
//   opacity: 0,
//   x: 1000,
//   duration: 0.5,
//   scrollTrigger: {
//     trigger: "#page3",
//     start: "top center", // Adjust as needed
//     end: "bottom top", // Adjust as needed
//     markers: true, // Enable markers
//   }
// });
