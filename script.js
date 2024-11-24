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
