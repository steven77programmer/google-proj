// const textarea = document.getElementById("auto-growing-textarea");

// textarea.addEventListener("input", function() {
//     this.style.height = "auto"; // Reset height
//     this.style.height = this.scrollHeight + "px"; // Set height based on content
// });
// console.log("hi");
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
