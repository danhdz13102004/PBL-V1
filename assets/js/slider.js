const list = document.querySelector(`.slider .slider-list`);
const items = document.querySelectorAll(`.slider .slider-item`);
const dots = document.querySelectorAll(`.slider .slider-dot`);
let prev = document.querySelector(`.slider .btnPrev`);
let next = document.querySelector(`.slider .btnNext`);
console.log(prev);
console.log(next);
let active = 0;
let lengthItems = items.length - 1;
const reloadSlider = () => {
  let checkLeft = items[active].offsetLeft;
  console.log(checkLeft);
  list.style.left = -checkLeft + `px`;

  let lastActiveDot = document.querySelector(
    `.slider .slider-dots .slider-dot.active`
  );
  console.log(lastActiveDot);
  dots[active].classList.add("active");
  lastActiveDot.classList.remove("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
};
let refreshSlider = setInterval(() => {
  next.click();
}, 5000);
next.onclick = () => {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active += 1;
  }
  reloadSlider();
};
prev.onclick = () => {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active -= 1;
  }
  reloadSlider();
};
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    active = index;
    reloadSlider();
  });
});

const sliderTemplate = document.createElement(`template`);
sliderTemplate.innerHTML = `
  
`;
class Slider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  
  }
}
