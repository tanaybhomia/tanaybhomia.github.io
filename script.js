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
const info = document.getElementById("textHome");
const social = document.getElementById("textSocial");
const project = document.getElementById("textProject");

info.addEventListener("click",showinfo);
social.addEventListener("click",showsocial);
project.addEventListener("click",showproject);

function dark()
{
	
}

function light()
{

}

function showinfo()
{
	// Removing the Hidden from Info
	const infocontent = document.getElementById("infoing");
	infocontent.classList.remove("hidden")
	const profile = document.querySelector(".profile");
	profile.classList.remove("hidden");

	// Adding Hidden class to other fields 
	const slowText = document.getElementById("slowText");
	slowText.classList.add("hidden");
	const socials = document.querySelector(".socials");
	socials.classList.add("hidden");
	const projects = document.querySelector(".projects");
	projects.classList.add("hidden");
}
function showsocial()
{
	// removing the hidden from socials
	const socials = document.querySelector(".socials");
	socials.classList.remove("hidden");

	// Adding the hidden to other fields
	const slowText = document.getElementById("slowText");
	slowText.classList.add("hidden");
	const projects = document.querySelector(".projects");
	projects.classList.add("hidden");
	const infocontent = document.getElementById("infoing");
	infocontent.classList.add("hidden")
	const profile = document.querySelector(".profile");
	profile.classList.add("hidden");
}
function showproject()
{
	// removing hidden from Projects
	const projects = document.querySelector(".projects");
	projects.classList.remove("hidden");

	// adding hidden from other fields 
	const slowText = document.getElementById("slowText");
	slowText.classList.add("hidden");
	const infocontent = document.getElementById("infoing");
	infocontent.classList.add("hidden")
	const profile = document.querySelector(".profile");
	profile.classList.add("hidden");
	const socials = document.querySelector(".socials");
	socials.classList.add("hidden");
}
function createGrains() {
            const grainContainer = document.body;

            for (let i = 0; i < 100; i++) {
                const grain = document.createElement('div');
                grain.className = 'grain';
                grain.style.left = `${Math.random() * window.innerWidth}px`;
                grain.style.top = `${Math.random() * window.innerHeight}px`;
                grain.style.animationDuration = `${Math.random() * 2 + 1}s`; // Vary the animation duration
                grainContainer.appendChild(grain);
            }
        }

        createGrains();