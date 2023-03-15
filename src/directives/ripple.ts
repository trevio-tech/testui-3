// https://codesandbox.io/s/v-ripple-vue-3-joji0?file=/src/directives/vRipple.js:0-1467

const handleRipple = (element: any, binding: any, ev: any) => {
  const rippleElement = document.createElement("span");
  let currentDiameter = 1;
  let currentOpacity = 0.65;
  let animationHandler = setInterval(animateRippleSpread, 7);
  applyRippleStyle();

  function applyRippleStyle() {
    const elementCoordinates = element.getBoundingClientRect();
    const offsetY = ev.clientY - elementCoordinates.y;
    const offsetX = ev.clientX - elementCoordinates.x;

    rippleElement.style.position = "absolute";
    rippleElement.style.height = "5px";
    rippleElement.style.width = "5px";
    rippleElement.style.borderRadius = "100%";
    rippleElement.style.backgroundColor = "#f2f2f2";
    rippleElement.style.left = `${offsetX}px`;
    rippleElement.style.top = `${offsetY}px`;
    ev.target.appendChild(rippleElement);
  }

  function animateRippleSpread() {
    const maximalDiameter = +binding.value || 50;
    if (currentDiameter <= maximalDiameter) {
      currentDiameter++;
      currentOpacity -= 0.65 / maximalDiameter;
      rippleElement.style.transform = `scale(${currentDiameter})`;
      rippleElement.style.opacity = `${currentOpacity}`;
    } else {
      rippleElement.remove();
      clearInterval(animationHandler);
    }
  }
};

const vRipple = {
  mounted: (el: any, binding: any) => {
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.addEventListener("click", (ev: any) => handleRipple(el, binding, ev));
  }
};

export default vRipple;
