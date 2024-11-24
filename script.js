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
    // Initialize all draggable elements
    this.initDraggableElements();

    // Setup mutation observer to handle dynamically added elements
    this.observeDOMChanges();
  }

  initDraggableElements() {
    document.querySelectorAll(".draggable").forEach((element) => {
      this.setupDraggableElement(element);
    });
  }

  setupDraggableElement(element) {
    // Skip if already initialized
    if (element.dataset.draggableInitialized) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = (e) => {
      if (e.button !== 0) return; // Only left mouse button

      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target === element || element.contains(e.target)) {
        isDragging = true;
      }
    };

    const drag = (e) => {
      if (!isDragging) return;

      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, element);
    };

    const dragEnd = () => {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    };

    const setTranslate = (xPos, yPos, el) => {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    };

    // Add event listeners
    element.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    // Prevent default drag behavior
    element.addEventListener("dragstart", (e) => e.preventDefault());

    // Mark as initialized
    element.dataset.draggableInitialized = "true";
  }

  observeDOMChanges() {
    // Create an observer instance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList.contains("draggable")) {
            this.setupDraggableElement(node);
          }
        });
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

// Initialize the draggable manager when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DraggableManager();
});
