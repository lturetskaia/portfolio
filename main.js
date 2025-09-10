const buttons = document.querySelectorAll(".btn");
const html = document.getElementsByTagName("html");

// button glow animation on hover
buttons.forEach((btn) => {
  let gradMotion;

  btn.addEventListener("mouseover", () => {
    let angle = 90;
    gradMotion = setInterval(() => {
      angle = (angle + 1) % 360;
      html[0].style.setProperty("--gradient-angle", `${angle}deg`);
    }, 10);
  });

  btn.addEventListener("mouseout", () => {
    clearInterval(gradMotion);
  });
});
