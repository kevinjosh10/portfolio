// Select the button and the "B" in Know About Me
const knowBtn = document.getElementById('know-btn');
const zoomLetter = document.querySelector('.zoom-letter');

// Select all sections that are hidden
const hiddenSections = document.querySelectorAll('section.hidden');

// Function to reveal sections  with a smooth staggered animation
function revealSections() {
    hiddenSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.remove('hidden');
        }, index * 300); // 300ms delay between each section
    });
}

// Add click event to the button
knowBtn.addEventListener('click', () => {
    // Zoom into the "B" in Know About Me
    zoomLetter.style.transform = 'scale(8) translate(50px, -100px)';
    zoomLetter.style.transition = 'transform 1.2s ease-in-out';

    // Reveal all hidden sections after zoom finishes
    setTimeout(() => {
        revealSections();
    }, 1200); // Wait 1.2s for the zoom animation
});
