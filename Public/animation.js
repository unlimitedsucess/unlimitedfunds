document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const preloader = document.querySelector(".preloader");
  const mainContent = document.querySelector(".main-content"); 

  // Only execute preloader logic if it exists on the page
  if (preloader && mainContent) {
    const pageLoadTime = performance.now();

    window.addEventListener("load", function () {
      const timeElapsed = performance.now() - pageLoadTime;
      const minLoadTime = 2000; // 2s minimum load time
      const delay = Math.max(minLoadTime - timeElapsed, 0);

      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
          mainContent.style.display = "block"; // Only show if it exists
        }, 500);
      }, delay);
    });
  }

  // Only add IntersectionObserver if sections exist
  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = index * 0.3;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
            entry.target.style.transitionDelay = `0s`;
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
