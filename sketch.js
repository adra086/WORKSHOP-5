let table;
let genres = [];
let values = [];
let totalByGenre = [];
let images = {
  Podcasts: ['chapotraphouse.jpg', 'redscare.jpg', 'phil.jpg'],
  Ska: ['sublime.jpg', 'nodoubt.jpg', 'streetlightmanifesto.jpg'],
  Rap: ['mfdoom.jpg', 'homebrew.jpg', 'mobbdeep.jpg'],
  RnB: ['avantdalebowlingclub.jpg', 'mosdef.jpg', 'erykahbadu.jpg', 'andre3000.jpg'],
  Alternative: ['lanadelrey.jpg', 'fionaapple.jpg', 'gabriels.jpg'],
  Instrumental: ['khurangbin.jpg', 'knxwledge.jpg'],
  Rock: ['rhcp.jpg', 'pearljam.jpg', 'velvet.jpg', 'took.jpg']
};
let loadedImages = {};
let currentImages = {};  // Track the current displayed image for each genre
let lastImageSwapTime = 0;
let imageSwapInterval = 1000;  // Swap images every 2 seconds
let colors = [];  // Store different colors for each slice

function preload() {
  // Load all images and store them in an object
  for (let genre in images) {
    loadedImages[genre] = images[genre].map(img => loadImage('images/' + img));
    currentImages[genre] = random(loadedImages[genre]);  // Start with a random image
  }

  // Load the CSV file
  table = loadTable('FINEARTS2.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);
  textFont('Arial');

  // Generate unique colors for each genre
  for (let i = 0; i < table.columns.length; i++) {
    colors.push(color(random(100, 255), random(100, 255), random(100, 255), 200));
  }

  // Get column headers (genres)
  genres = table.columns;

  // Calculate total listening time by genre
  totalByGenre = Array(genres.length).fill(0);
  for (let i = 0; i < table.getRowCount(); i++) {
    for (let j = 0; j < genres.length; j++) {
      totalByGenre[j] += table.getNum(i, genres[j]);
    }
  }
}

function draw() {
  background(30);
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("My Listening Habits - Pie Chart", width / 2, 40);  // Centered title

  let totalSum = totalByGenre.reduce((a, b) => a + b, 0);  // Sum of all listening times
  let startAngle = 0;
  let centerX = width / 2;
  let centerY = height / 2 + 20;
  let radius = 250;

  // Check if it's time to swap images
  if (millis() - lastImageSwapTime > imageSwapInterval) {
    for (let genre of genres) {
      currentImages[genre] = random(loadedImages[genre]);  // Select a new random image
    }
    lastImageSwapTime = millis();  // Reset the timer
  }

  // Draw the pie chart
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let genreSum = totalByGenre[i];
    let angle = map(genreSum, 0, totalSum, 0, TWO_PI);  // Calculate the angle for the slice

    // Draw the pie slice with unique color
    fill(colors[i]);
    stroke(255);
    strokeWeight(1);
    arc(centerX, centerY, radius * 2, radius * 2, startAngle, startAngle + angle, PIE);

    // Calculate label position and draw the genre label
    let midAngle = startAngle + angle / 2;
    let labelX = centerX + cos(midAngle) * (radius + 50);
    let labelY = centerY + sin(midAngle) * (radius + 50);

    fill(255);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(`${genre} (${genreSum})`, labelX, labelY);

    // Display the current image for the genre
    imageMode(CENTER);
    image(currentImages[genre], labelX, labelY + 35, 50, 50);

    // Update the start angle for the next slice
    startAngle += angle;
  }
}
