// API address
const baseURL = "https://jsonplaceholder.typicode.com/posts/";

// Cache the DOM
var countdown = document.querySelector("#dataCountDown");
var background = document.querySelector("#dataDiv");
var title = document.querySelector("#dataTitle");
var content = document.querySelector("#dataContent");

// Function executes itself without user action or other events
window.onload = function() {
    let cntSecs = 5;
    countdown.innerHTML =`New data in: ${cntSecs}s`;

    setInterval(() => {
        cntSecs--;
        countdown.innerHTML =`New data in: ${cntSecs}s`;
        if(cntSecs === 0) {
            cntSecs = 5;
            countdown.innerHTML =`New data in: ${cntSecs}s`;
            updateStyle();
            updateData();
        }
    }, 1000);
}

// Updates the colors of elements at each countdown reset
function updateStyle() {
    // container color
    var newColor = getRandomColor();
    // title and content color
    var textColor = isLight(newColor)? "black" : "white";
    // updating the colors
    background.style.setProperty("background-color", newColor);
    setTextColor(textColor);
}

// Updates data at each countdown reset
async function updateData() {
    // Generates a random number between 1 and 100
    let dataPicker = Math.floor(Math.random() * 100) + 1;
    // Gets the JSON object with the ID equal to the random number
    let response = await fetch(`${baseURL}${dataPicker}`);
    let data = await response.json();
    // Finally changes the text as required
    title.innerHTML = `${data.id}. ${data.title}`;
    content.innerHTML = data.body;
}

// Sets the text color
// Used to reduce code duplication
function setTextColor(textColor) {
    title.style.setProperty("color", textColor);
    content.style.setProperty("color", textColor);
}

// Function that returns a random hexa color when called
// e.g. calling myColor = getRandomColor() will store a 
// random hexadecimal color in myColor (i.e. myColor = '#12AC56')
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    // Generate 6 random values from letters array
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function that checks the luminosity of a hexadecimal color
// Returns true if a color is light and false if a color is dark
// e.g. isLight("#FFFFFF") returns true 
//      isLight("#000000") returns false
function isLight(color) {
    var color = color.substring(1);     // Strip #
    var rgb = parseInt(color, 16);      // Convert RRGGBB to decimal
    var red = (rgb >> 16) & 0xff;       // Extract red
    var green = (rgb >> 8) & 0xff;      // Extract green
    var blue = (rgb >> 0) & 0xff;       // Extract blue

    var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709

    if (luminance > 128) {
        return true;        // Color is light
    }
    else {
        return false;       // Color is dark
    }
}