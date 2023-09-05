document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.querySelector(".main");

    // Add the transition class to the main container
    mainContainer.classList.add("page-transition");

    // Remove the transition class after a short delay to complete the transition
    setTimeout(function () {
        mainContainer.classList.remove("page-transition");
    }, 1000); // Adjust the delay as needed (300ms in this example)
});
// When a link with a specific class (e.g., "page-link") is clicked
document.querySelector("a.page-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior (page reload)

    const targetUrl = this.href; // Get the target URL from the link

    // Add the transition class to the main container
    mainContainer.classList.add("page-transition");

    // Wait for the transition to complete (adjust the delay as needed)
    setTimeout(function () {
        // Redirect to the new page
        window.location.href = targetUrl;
    }, 300); // Adjust the delay as needed
});

