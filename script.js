const now = new Date();

// Extract individual components
const optionsWeekday = { weekday: "short" };
const optionsDay = { day: "2-digit" };
const optionsMonth = { month: "short" };
const optionsHour = { hour: "2-digit", hour12: false };
const optionsMinute = { minute: "2-digit" };

// Format each component individually
const weekday = new Intl.DateTimeFormat("en-GB", optionsWeekday).format(now); // e.g., Sun
const day = new Intl.DateTimeFormat("en-GB", optionsDay).format(now); // e.g., 24
const month = new Intl.DateTimeFormat("en-GB", optionsMonth).format(now); // e.g., Nov
const hour = new Intl.DateTimeFormat("en-GB", optionsHour).format(now); // e.g., 07
const minute = new Intl.DateTimeFormat("en-GB", optionsMinute).format(now); // e.g., 49

// Assemble manually with desired spacing
const formatted = `${weekday}, ${hour}:${minute}`;

const datespan = document.querySelector(".datetime");
datespan.innerHTML = formatted;

// Initialize draggable functionality for elements with 'draggable' class
class DraggableManager {
  constructor() {
    this.initDraggableElements();
    this.observeDOMChanges();
  }

  initDraggableElements() {
    document.querySelectorAll(".draggable").forEach((element) => {
      this.setupDraggableElement(element);
    });
  }

  setupDraggableElement(element) {
    if (element.dataset.draggableInitialized) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    const getConstrainedPosition = (x, y) => {
      const container = element.closest(".maincontainer");
      if (!container) return { x, y };

      // Get container and element dimensions
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Calculate the maximum positions
      const maxX = containerRect.width - elementRect.width;
      const maxY = containerRect.height - elementRect.height;

      // Constrain the position
      return {
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY),
      };
    };

    const dragStart = (e) => {
      if (e.button !== 0) return;

      const rect = element.getBoundingClientRect();
      const containerRect = element
        .closest(".maincontainer")
        .getBoundingClientRect();

      // Calculate the initial position relative to the container
      xOffset = rect.left - containerRect.left;
      yOffset = rect.top - containerRect.top;

      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target === element || element.contains(e.target)) {
        isDragging = true;
      }
    };

    const drag = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      // Calculate new position relative to mouse movement
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // Get constrained position
      const constrainedPos = getConstrainedPosition(currentX, currentY);
      currentX = constrainedPos.x;
      currentY = constrainedPos.y;

      // Update position
      setTranslate(currentX, currentY, element);
    };

    const dragEnd = () => {
      isDragging = false;
    };

    const setTranslate = (xPos, yPos, el) => {
      el.style.left = `${xPos}px`;
      el.style.top = `${yPos}px`;
    };

    // Add event listeners
    element.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    // Prevent default drag behavior
    element.addEventListener("dragstart", (e) => e.preventDefault());

    // Store cleanup function
    element.draggableCleanup = () => {
      element.removeEventListener("mousedown", dragStart);
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", dragEnd);
      element.removeEventListener("dragstart", (e) => e.preventDefault());
    };

    // Mark as initialized
    element.dataset.draggableInitialized = "true";
  }

  observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList.contains("draggable")) {
              this.setupDraggableElement(node);
            }
            node.querySelectorAll(".draggable").forEach((element) => {
              this.setupDraggableElement(element);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DraggableManager();
});

// making links to open on double click
// Select all links with the 'link' class
const links = document.querySelectorAll(".link");

// Prevent default single-click behavior
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent navigation on single click
  });

  // Open the link on double-click
  link.addEventListener("dblclick", () => {
    window.open(link.href, link.target); // Navigate to the URL in the target specified
  });
});

// For opening the aboutme.html file
document.querySelector(".txtfile").addEventListener("dblclick", function () {
  loadIframeContent("/assets/iframeitems/aboutme/aboutme.html");
});

// For opening the photos.html file
document
  .querySelector(".photofolder")
  .addEventListener("dblclick", function () {
    loadIframeContent("/assets/iframeitems/photos/photos.html");
  });

// For opening resume pdf
document.querySelector(".pdfile").addEventListener("dblclick", function () {
  loadIframeContent("/assets/iframeitems/resume/resume.html");
});

// For opening resume pdf
document.querySelector(".notes").addEventListener("dblclick", function () {
  loadIframeContent("/assets/iframeitems/notes/notes.html");
});

// for opening the projects files
document
  .querySelector(".dupezfolder")
  .addEventListener("dblclick", function () {
    loadIframeContent(
      "https://tanaybhomia.github.io/MockWebsites/DopezStudio/index.html",
    );
    const modalwrapper = document.querySelector(".modal-wrapper");
    modalwrapper.style.width = "90%";
    modalwrapper.style.height = "90%";
  });

document.querySelector(".iammac").addEventListener("dblclick", function () {
  loadIframeContent(
    "https://tanaybhomia.github.io/MockWebsites/IamMac/public/index.html",
  );
  const modalwrapper = document.querySelector(".modal-wrapper");
  modalwrapper.style.width = "90%";
  modalwrapper.style.height = "90%";
});

// Your existing loadIframeContent function should remain the same
function loadIframeContent(url) {
  const iframe = document.querySelector("#contentFrame");
  iframe.src = url;
  document.querySelector(".iframeContainer").style.display = "flex";
}
function closeIframe() {
  const container = document.querySelector(".iframeContainer");
  const iframe = document.getElementById("contentFrame");
  iframe.src = "";
  container.style.display = "none";
  const modalwrapper = document.querySelector(".modal-wrapper");
  modalwrapper.style.width = "60%";
  modalwrapper.style.height = "60%";
}

// For Loading Animation
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector("#mac-loader");

  // Hide loader and trigger animations after the page fully loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";

      setTimeout(() => {
        loader.remove(); // Optionally remove loader from the DOM

        // Trigger GSAP animations
        startAnimations();
      }, 500); // Matches the CSS transition duration
    }, 2000); // Delay before hiding loader
  });

  function startAnimations() {
    const timeline = gsap.timeline();

    // Animate all app icons with a staggered effect
    timeline
      .to(".appicon", {
        opacity: 1, // Fade in
        scale: 1, // Restore scale to normal
        y: 0, // Move to original position
        stagger: 0.1, // Stagger animations by 0.1 seconds
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        ".musicplayer",
        {
          opacity: 1, // Fade in
          scale: 1, // Restore scale
          y: 0, // Move to original position
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5", // Overlap with previous animation
      );
  }
});
