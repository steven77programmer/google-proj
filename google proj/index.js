const textarea = document.getElementById("auto-growing-textarea");

textarea.addEventListener("input", function() {
    this.style.height = "auto"; // Reset height
    this.style.height = this.scrollHeight + "px"; // Set height based on content
});