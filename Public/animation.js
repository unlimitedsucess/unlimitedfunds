document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Set a delay dynamically based on the section's index
        const delay = index * 0.9; // Adjust delay multiplier (e.g., 0.3s)
        entry.target.style.transitionDelay = `${delay}s`;

        // Add the 'visible' class to start the animation
        entry.target.classList.add("visible");
      } else {
        // Remove the 'visible' class and reset the delay when out of view
        entry.target.classList.remove("visible");
        entry.target.style.transitionDelay = `0s`;
      }
    });
  });

  // Observe all section elements
  sections.forEach((section) => {
    observer.observe(section);
  });
});

// for swiper section