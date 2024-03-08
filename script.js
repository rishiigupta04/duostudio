function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

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
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
init();

function heroTextAnimation() {
  gsap.from("#page1 h1,#page1 h2", {
    y: -100,
    rotate: 6,
    opacity: 0,
    delay: 0.3,
    duration: 0.4,
  });

  gsap.from("#nav", {
    y: -100,
    opacity: 0,
    delay: 0.1,
    duration: 0.4,
  });

  gsap.from("#herovid", {
    y: -100,
    opacity: 0,
    delay: 0.1,
    duration: 0.4,
  });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      // markers: true,
      start: "top 20%",
      end: "top -30%",
      scrub: 2,
    },
  });
  tl.to(
    "#page1 h1:nth-child(1)",
    {
      x: -170,
    },
    "anim"
  );
  tl.to(
    "#page1 h1:nth-child(2)",
    {
      x: 170,
    },
    "anim"
  );
  tl.to(
    "#page1 video",
    {
      width: "100%",
    },
    "anim"
  );

  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      // markers: true,
      start: "top -120%",
      end: "top -130%",
      scrub: 2,
    },
  });

  tl2.to("#main", {
    backgroundColor: "#fff",
  });

  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1 h1",
      scroller: "#main",
      // markers: true,
      start: "top -340%",
      end: "top -350%",
      scrub: 2,
    },
  });

  tl3.to("#main", {
    backgroundColor: "#111",
  });
}
heroTextAnimation();

var crsr = document.querySelector("#cursor");
var main = document.querySelector("#main");
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + 0 + "px";
  crsr.style.top = dets.y + 0 + "px";
});

document.addEventListener("mouseenter", () => {
  gsap.to("#cursor", {
    opacity: 1,
    scale: 1,
  });
});

document.addEventListener("mouseleave", () => {
  gsap.to("#cursor", {
    opacity: 0,
    scale: 0,
  });
});

var vid = document.querySelector("#page1 video");
vid.addEventListener("mouseenter", () => {
  gsap.to("#cursor", {
    padding: "50px 50px",
  });
});

vid.addEventListener("mouseleave", () => {
  gsap.to("#cursor", {
    padding: "0",
  });
});

// var boxes = document.querySelectorAll(".box");
// boxes.forEach(function (elem) {
//   elem.addEventListener("mouseenter", function () {
//     var att = elem.getAttribute("data-image");
//     crsr.style.width = "320px";
//     crsr.style.height = "270px";
//     crsr.style.borderRadius = "0";
//     crsr.style.backgroundImage = `url(${att})`;
//   });
//   elem.addEventListener("mouseleave", function () {
//     elem.style.backgroundColor = "transparent";
//     crsr.style.width = "20px";
//     crsr.style.height = "20px";
//     crsr.style.borderRadius = "50%";
//     crsr.style.backgroundImage = ``;
//   });
// });

document.querySelectorAll(".box").forEach(function (box) {
  var rotate = 0;
  var diffrot = 0;

  box.addEventListener("mouseleave", function (dets) {
  gsap.to(box.querySelector("img"), {
    opacity: 0,
    ease: Power3,
    duration: 0.2,
  });
});
  box.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - box.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(box.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});


