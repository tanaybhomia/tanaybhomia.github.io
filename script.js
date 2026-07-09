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
    
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateIcon(savedTheme);
    } else {
        // If no saved theme, check system preference to set initial icon
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        updateIcon(prefersDark ? "dark" : "light");
    }

    if(themeToggle) {
        themeToggle.addEventListener("click", () => {
            let currentTheme = htmlElement.getAttribute("data-theme");
            
            if (!currentTheme) {
                // If not explicitly set, determine based on OS preference
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                currentTheme = prefersDark ? "dark" : "light";
            }
            
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateIcon(newTheme);
        });
    }
});
