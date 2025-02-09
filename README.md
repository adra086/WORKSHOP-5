# WORKSHOP 5 
## Data Self-Portrait: My Listening Habits Visualization
### Link: https://github.com/adra086/WORKSHOP-5/

## Overview
This project is a data-driven self-portrait that visualizes my listening habits using a pie chart where each slice represents the time I’ve spent listening to different music genres and podcasts. The chart is dynamically enhanced with changing images and colorful slices, making it a visually rich and interactive experience.

## Learning Objectives

    Understand and load external data using a CSV file:
    Learn how to import and parse structured data to create dynamic visualizations.

    Work with arrays to manage genres and images:
    Use arrays to store listening data, map genres to images, and dynamically display content.

    Create dynamic and colorful pie charts:
    Generate pie chart slices with distinct colors proportional to listening time for each genre.

    Implement image swapping:
    Dynamically display genre-specific images that change every 2 seconds to enhance interactivity.

## Process Notes

### 1. Loading Listening Data

    The listening data is stored in a CSV file named FINEARTS2.csv, with rows containing time spent listening to various genres:

  Podcasts,Ska,Rap,RnB,Instrumental,Alternative,Rock
  120,35,45,12,42,22,15
  140,13,42,19,44,28,21
  200,45,63,7,63,34,26
  90,31,54,26,71,26,12

  The data is loaded using the loadTable() function in the preload() section:

``` javascript
    table = loadTable('FINEARTS2.csv', 'csv', 'header');
```

### 2. Managing Genre Images

    Each genre is associated with multiple images stored in an images array. These images are loaded using loadImage():

```javascript
    let images = {
      Podcasts: ['chapotraphouse.jpg', 'redscare.jpg', 'phil.jpg'],
      Ska: ['sublime.jpg', 'nodoubt.jpg', 'streetlightmanifesto.jpg'],
      Rap: ['mfdoom.jpg', 'homebrew.jpg', 'mobbdeep.jpg'],
      RnB: ['avantdalebowlingclub.jpg', 'mosdef.jpg', 'erykahbadu.jpg', 'andre3000.jpg'],
      // Other genres continue...
    };
```

### 3. Generating a Colorful Pie Chart

    Each pie slice represents a different genre, with its size proportional to the time spent on that genre.

    The pie slices are drawn using the arc() function:

```javascript
    arc(centerX, centerY, radius * 2, radius * 2, startAngle, startAngle + angle, PIE);

    Each slice is assigned a unique color using randomly generated RGB values:

    for (let i = 0; i < table.columns.length; i++) {
      colors.push(color(random(100, 255), random(100, 255), random(100, 255), 200));
    }
```

### 4. Implementing Dynamic Image Swapping

    Images associated with each genre are dynamically displayed next to their corresponding pie slice.
    The displayed image for each genre swaps every 2 seconds using a timer:

```javascript

    if (millis() - lastImageSwapTime > imageSwapInterval) {
      for (let genre of genres) {
        currentImages[genre] = random(loadedImages[genre]);  // Select a new random image
      }
      lastImageSwapTime = millis();  // Reset the timer
    }
```

### 5. Displaying Labels and Values

    Each pie slice is labeled with its corresponding genre and listening time:

   
```javascript 
    text(`${genre} (${genreSum})`, labelX, labelY);
```

    The labels and values are displayed outside the pie chart for better readability.

### Screenshots

    Complete Pie Chart View:
        A full screenshot of the pie chart with genre labels and images displayed.
![image](https://github.com/user-attachments/assets/b84190b7-4fd0-4b47-9c45-a0ba246c5b44)


    Dynamic Image Swapping:
        A different image for the same genres after a 1-second swap to highlight the dynamic effect.
![image](https://github.com/user-attachments/assets/2d5790fb-a6eb-4f12-8354-5f5ce5da8f8a)
        
### Potential Improvements 
    Animations: Add smooth animations for the pie chart slices and image transitions.
    User Input: Allow users to select different time intervals for image swapping.
    Interactive Hover Effects: Display additional information when the user hovers over a slice.

### Helpful Resources
- ChatGPT was helpful in fixing my issues with timing of image swapping as well as ensuring that I had correct pathways to my images folder.
    I also used it to help me format my Pie Chart so the lines met up as I had some of the measurements wrong
- Youtube Videos on how to ensure data pathways were legitimate
- Canvas Tutorials for Workshop 5 were very helpful 
