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



// document.getElementById("apps-icon").addEventListener("click", (event) => {
//     const menu = document.getElementById("apps-menu");
//     event.preventDefault();
//     if (menu.style.display === "block") {
//         menu.style.display = "none";
//     } else {
//         menu.style.display = "block";
//     }
// });


// // Optional: Close menu when clicking outside
// document.addEventListener("click", function (event) {
//     const menu = document.getElementById("apps-menu");
//     const icon = document.getElementById("apps-icon");
//     if (!menu.contains(event.target) && event.target !== icon) {
//         menu.style.display = "none";
//     }
// });

/*
//voice search fucntionality
// Check browser compatibility for Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Recognition settings
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Return final results only
    recognition.maxAlternatives = 1; // Limit to one alternative result

    // Elements
    const micIcon = document.getElementById('mic-icon');
    const searchBox = document.getElementById('text-input'); // Your search text box
    const googleSearchBtn = document.querySelector('.btn-cont button'); // Google Search button

    // Start recognition on mic click
    micIcon.addEventListener('click', () => {
        micIcon.classList.add('active');
        recognition.start();
        console.log('Listening...');
    });

    // On recognition success
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('You said:', transcript);
        searchBox.value = transcript; // Populate the text box with the recognized speech
    });

    // On recognition error
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
        alert('Sorry, voice recognition failed. Please try again.');
    });

    // Optional: Trigger search after speech recognition
    recognition.addEventListener('end', () => {
        micIcon.classList.remove('active');
        if (searchBox.value.trim() !== '') {
            googleSearchBtn.click(); // Simulate a button click
        } else {
            console.log('No input detected.');
        }
    });
} else {
    alert('Your browser does not support voice search.');
}
*/

const micIcon = document.querySelector('.mic-icon');
const voiceStatus = document.getElementById('voice-status');
const statusText = document.getElementById('status-text');

const searchBox = document.getElementById('text-input'); // Your search text box
const googleSearchBtn = document.querySelector('.btn-cont button'); // Google Search button

// Function to show the voice status module
function showVoiceStatus(message) {
    statusText.textContent = message || "Listening...";
    voiceStatus.style.display = 'flex';
}

// Function to hide the voice status module
function hideVoiceStatus() {
    voiceStatus.style.display = 'none';
}

// Event listener for the microphone icon
micIcon.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    // Show the voice status module when recognition starts
    recognition.onstart = () => {
        showVoiceStatus("Listening...");
    };

    // Update status with recognition progress
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        showVoiceStatus(`You said: "${transcript}"`);

        const transcriptt = event.results[0][0].transcript;
        console.log('You said:', transcriptt);
        searchBox.value = transcriptt; // Populate the text box with the recognized speech
    };

    // Hide the voice status module when recognition ends
    recognition.onend = () => {
        hideVoiceStatus();
        if (searchBox.value.trim() !== '') {
            googleSearchBtn.click(); // Simulate a button click
            searchBox.value ="";
        } else {
            console.log('No input detected.');
        }
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        showVoiceStatus("Error: Could not recognize speech.");
        setTimeout(hideVoiceStatus, 2000);
    };

    recognition.start();
});



//sound effects
const startSound = document.getElementById('start-sound'); // Start sound
const endSound = document.getElementById('end-sound'); // End sound

let isListening = false; // To track the recording state

micIcon.addEventListener('click', () => {
    if (!isListening) {
        // Start recording
        startSound.play(); // Play start sound
        voiceStatus.style.display = 'block'; // Show listening animation
        document.getElementById('status-text').innerText = 'Listening...';
        isListening = true;

        // Simulate voice search process for demo purposes
        setTimeout(() => {
            endRecording(); // End recording after 5 seconds (demo)
        }, 5000);
    }
});

function endRecording() {
    if (isListening) {
        endSound.play(); // Play end sound
        voiceStatus.style.display = 'none'; // Hide listening animation
        document.getElementById('status-text').innerText = 'Stopped.';
        isListening = false;
    }
}






// image search

const lensIcon = document.getElementById('lense-icon');
const imageInput = document.getElementById('image-input');

// On clicking the lens icon, open the file input dialog
lensIcon.addEventListener('click', () => {
    imageInput.click();
});

// When an image is selected
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        // Convert the image to a Data URL
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;

            // Redirect to Google Images Search by Image
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://www.google.com/searchbyimage/upload';
            form.enctype = 'multipart/form-data';
            form.target = '_blank';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'encoded_image';
            input.value = base64Image.split(',')[1]; // Get only the base64 data

            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        };

        reader.readAsDataURL(file);
    } else {
        alert('No image selected!');
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
