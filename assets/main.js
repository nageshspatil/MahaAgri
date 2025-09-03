// Fade-in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

const menu = document.getElementById("menu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    if (!menu.classList.contains("sticky")) {
      menu.classList.add("sticky");
    }
  } else {
    menu.classList.remove("sticky");
  }
});

//background images animation

// Select all the .image-row elements
let imageRows = document.querySelectorAll(".hero-background-image-row");

// Initialize an array to keep track of the current image index for each row
let rowIndexes = Array.from(imageRows, () => 0);

// Variable to keep track of the number of images loaded
let imagesLoaded = 0;
// Total number of images
let totalImages = document.querySelectorAll(".backgroundImage").length;

// Function to start the slideshow
function startSlideshow() {
  // Start the interval for changing background images
  setInterval(changeBackground, 3000);
}

// Function to handle image loading
function imageLoaded() {
  imagesLoaded++;
  // If all images are loaded, start the slideshow
  if (imagesLoaded === totalImages) {
    startSlideshow();
  }
}

// Function to change the background images
function changeBackground() {
  // Loop through each image row
  imageRows.forEach((row, rowIndex) => {
    let images = row.querySelectorAll(".backgroundImage");
    let currentImageIndex = rowIndexes[rowIndex];

    // Remove showing-img class from the current image
    images[currentImageIndex].classList.remove("showing-img");

    // Increment the image index for this row
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Update the index in the rowIndexes array
    rowIndexes[rowIndex] = currentImageIndex;

    // Add the showing-img class to the new current image
    images[currentImageIndex].classList.add("showing-img");
  });
}

// Add load event listeners to each image
document.querySelectorAll(".backgroundImage").forEach((img) => {
  if (img.complete) {
    // If the image is already loaded (from cache), count it as loaded
    imageLoaded();
  } else {
    // Otherwise, add an event listener for the load event
    img.addEventListener("load", imageLoaded);
  }
});

// Form validation
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Name validation
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (name.value.trim() === "") {
      nameError.style.display = "block";
      isValid = false;
    } else {
      nameError.style.display = "none";
    }

    // Email validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    // Message validation
    const message = document.getElementById("message");
    const messageError = document.getElementById("messageError");
    if (message.value.trim() === "") {
      messageError.style.display = "block";
      isValid = false;
    } else {
      messageError.style.display = "none";
    }

    // If all good
    if (isValid) {
      alert("✅ Thank you! Your message has been sent.");
      document.getElementById("contactForm").reset();
    }
  });
