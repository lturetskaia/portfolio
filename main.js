const buttons = document.querySelectorAll(".btn");
const html = document.getElementsByTagName("html");
const contactForm = document.getElementById("contact-form");

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

contactForm.addEventListener("submit", handleSubmit);

async function handleSubmit(formEvent) {
  formEvent.preventDefault();
  const status = document.getElementById("status");
  const message = document.getElementById("message");
  const statusImage = document.getElementById("status-image");
  const info = document.getElementById("info");
  const formData = new FormData(contactForm);
  const emailData = Object.fromEntries(formData);
  console.log(emailData);
  const response = await fetch("https://formspree.io/f/mandzoga", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    info.innerHTML = "";
    
    if(status.classList.contains('error')) {
      status.className = '';
      message.className = '';
    }

    status.innerHTML = "Thank you!";
    message.innerHTML =
      "Your message has been successfully submitted. We'll contact you shortly.";
    statusImage.setAttribute("src", "/images/blue-tick.png");
    statusImage.setAttribute("alt", "A blue tick sign");
  } else {
    info.innerHTML = "";
    status.className += "error";
    status.innerHTML = "Ooops!";
    message.className += "error";
    message.innerHTML =
      "There was a problem submitting your form. Please, try again later!";
    statusImage.setAttribute("src", "/images/error.png");
  }

  formEvent.target.reset();
}
