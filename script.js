document.addEventListener('DOMContentLoaded', function() {

    // Function to apply slow text display
    function displaySlowly(element, text, delay) {
        var index = 0;
        var intervalId = setInterval(function() {
            element.innerHTML += text[index];
            index++;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, delay);
    }

	const name = "TANAY  BHOMIA";	
	var text = document.getElementById("slowText");
	// Call the function for each target element
    displaySlowly(slowText, name, 120);
});
