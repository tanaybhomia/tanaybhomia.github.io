document.addEventListener("DOMContentLoaded", function () {
    const typingAnimation = document.querySelector(".typing-text");
    const mainContent = document.querySelector(".main");
    const initialText = "I am Tanay"; // The text to be typed
    const typingDelay = 50; // Delay in milliseconds between typing each character
    const fadeInDuration = 1000; // Duration in milliseconds for fading in the main content

    // Function to simulate typing animation
    const typeText = () => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < initialText.length) {
                typingAnimation.textContent += initialText.charAt(charIndex);
                charIndex++;
            } else {
                // Typing animation complete
                clearInterval(typeInterval);

                // Fade in the main content
                setTimeout(() => {
                    mainContent.style.transition = `opacity ${fadeInDuration}ms ease-in-out`;
                    mainContent.style.opacity = 1;
                }, fadeInDuration);
            }
        }, typingDelay);
    };

    // Start the typing animation
    typeText();
});
