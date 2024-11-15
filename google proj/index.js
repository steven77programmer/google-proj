// const textarea = document.getElementById("auto-growing-textarea");

// textarea.addEventListener("input", function() {
//     this.style.height = "auto"; // Reset height
//     this.style.height = this.scrollHeight + "px"; // Set height based on content
// });
// console.log("hi");
// const textarea = document.getElementById("text-input");
// const clearIcon = document.getElementById("clear-icon");

const textarea = document.getElementById("text-input");
const clearIcon = document.getElementById("clear-icon");


// Show or hide the clear icon based on textarea content
textarea.addEventListener("input", () => {
console.log("working...");
if (textarea.value.trim().length > 0) {
    clearIcon.style.display = "flex";
} else {
    clearIcon.style.display = "none";
}
});

// Clear the textarea content when the clear icon is clicked
clearIcon.addEventListener("click", () => {
textarea.value = "";
clearIcon.style.display = "none";
textarea.focus(); // Optional: bring focus back to the textarea
});



document.getElementById("apps-icon").addEventListener("click", (event) => {
    const menu = document.getElementById("apps-menu");
    event.preventDefault();
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

// Optional: Close menu when clicking outside
document.addEventListener("click", function (event) {
    const menu = document.getElementById("apps-menu");
    const icon = document.getElementById("apps-icon");
    if (!menu.contains(event.target) && event.target !== icon) {
        menu.style.display = "none";
    }
});






document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const googleSearchButton = document.getElementById("google-search");
   




    // Function to perform the search
    function performSearch() {
        const query = textInput.value.trim();
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = searchUrl;
        }
    }

    // Event listener for "Google Search" button click
    googleSearchButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        performSearch();
    });

    // Event listener for Enter key press
    textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent newline in textarea
            performSearch();
        }
    });
});
