document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    // Select all sections to animate
    const sections = document.querySelectorAll('.workflow-section');
    sections.forEach((section, index) => {
        // Stagger the transition delay based on index
        section.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(section);
    });
});
