document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const htmlElement = document.documentElement;

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    function updateIcon(theme) {
        if(themeIcon) {
            // Sun for dark mode (to switch to light), Moon for light mode (to switch to dark)
            themeIcon.innerHTML = theme === "dark" ? sunIcon : moonIcon;
        }
    }

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateIcon(savedTheme);
    } else {
        // If no saved theme, check system preference to set initial icon
        updateIcon(mediaQuery.matches ? "dark" : "light");
    }

    // Listen for OS theme changes to update the icon automatically
    mediaQuery.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            updateIcon(e.matches ? "dark" : "light");
        }
    });

    if(themeToggle) {
        themeToggle.addEventListener("click", () => {
            let currentTheme = htmlElement.getAttribute("data-theme");
            
            if (!currentTheme) {
                // If not explicitly set, determine based on OS preference
                currentTheme = mediaQuery.matches ? "dark" : "light";
            }
            
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            const osTheme = mediaQuery.matches ? "dark" : "light";

            // If the user toggles back to the current OS theme, clear the override
            // so the website can follow automatic OS changes again.
            if (newTheme === osTheme) {
                htmlElement.removeAttribute("data-theme");
                localStorage.removeItem("theme");
            } else {
                htmlElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
            }
            
            updateIcon(newTheme);
        });
    }

    // Lightbox logic
    const masonryItems = document.querySelectorAll('.masonry-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxDownload = document.getElementById('lightbox-download');

    if (lightbox) {
        masonryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                
                // Get filename for download
                const filename = img.src.split('/').pop();
                lightboxDownload.href = img.src;
                lightboxDownload.setAttribute('download', filename);

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close on click close button
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on click outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
