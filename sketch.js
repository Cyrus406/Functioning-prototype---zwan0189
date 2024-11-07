// Creating 3D vision using WEBGL patterns is a technique that is not covered in this class
/* This technique is from
https://p5js.org/zh-Hans/reference/p5/WEBGL/
https://p5js.org/zh-Hans/reference/p5/webglVersion/
https://www.youtube.com/watch?v=nqiKWXUX-o8&list=PLRqwX-V7Uu6bPhi8sS1hHJ77n3zRO9FR_
*/
// Scene class represents the main 3D scene containing various elements
class Scene {
  constructor() {
    // Define the colors used in the scene
    this.colors = {
      background: '#F1F2ED', // Light background color
      red: '#A03225',        // Red color for plates
      blue: '#486FBE',       // Blue color for plates
      grey: '#D8D6C7',       // Grey color for plates
      yellow: '#EBD42B',     // Yellow color for plates
      line: '#606060'        // Color for vertical support lines
    };

    // Define the configurations for the flat plates in the scene
    this.plateConfigs = [
      // Long grey plates
      { x: -200, y: -130, z: -40, w: 200, h: 10, d: 80, color: this.colors.grey },
      { x: -50, y: 200, z: -20, w: 200, h: 10, d: 80, color: this.colors.grey },

      // Colorful blocks； , blue * 1, red *2 , yellow *3
      { x: 100, y: 0, z: -15, w: 120, h: 10, d: 100, color: this.colors.blue },
      { x: -150, y: 50, z: -30, w: 80, h: 10, d: 80, color: this.colors.red },
      { x: -10, y: -50, z: -25, w: 80, h: 10, d: 80, color: this.colors.red },
      { x: 200, y: 100, z: -10, w: 80, h: 10, d: 180, color: this.colors.yellow },
      { x: -250, y: 30, z: -20, w: 80, h: 10, d: 200, color: this.colors.yellow },
      { x: 130, y: -150, z: 0, w: 200, h: 10, d: 80, color: this.colors.yellow },
    ];

    // Initialize components
    this.verticalLines = [];
    this.plates = [];
    this.randomBoxes = [];

    this.initializeVerticalLines();
    this.initializePlates();
    this.initializeRandomBoxes();

    // Track cycle count
    this.cycleCount = 0;
  }

  // Initialize vertical lines based on plate configurations
  initializeVerticalLines() {
    // Iterate over each plate configuration in plateConfigs array
    for (let index = 0; index < this.plateConfigs.length; index++) {
      const plate = this.plateConfigs[index];

      // Define the two corners for placing vertical lines
      const corners = [
        { x: plate.x - plate.w / 2, y: plate.y - plate.d / 2 },
        { x: plate.x + plate.w / 2, y: plate.y + plate.d / 2 }
      ];

      // Loop through each corner to create a vertical line with staggered delay
      for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
        const corner = corners[cornerIndex];
        this.verticalLines.push(new VerticalLine(
          corner.x, corner.y, plate.z, 300, 5, this.colors.line, index * 300 // Delay increases with index, creating a staggered effect
        ));
      }
    }
  }

  // Initializes Plate objects from plateConfigs, each with a unique display delay
  initializePlates() {
    //index is used to calculate a delay for each plate based on its position in the array.
    this.plates = this.plateConfigs.map((config, index) =>
      new Plate(config.x, config.y, config.z, config.w, config.h, config.d, config.color, index * 300) // Delay increases with index
    );
  }

  // Generates random boxes in the scene with unique positions and delays
  initializeRandomBoxes() {
    let boxCount = 20; // Number of random boxes to create
    for (let i = 0; i < boxCount; i++) {
      let boxColor = random([this.colors.red, this.colors.blue, this.colors.grey, this.colors.yellow]); // Random color
      let boxSize = random(10, 30); // Random box size
      let baseLine = random(this.verticalLines); // Select a random vertical line as base for positioning
      let boxX = baseLine.x + random(-10, 10);   // Randomize box position slightly around the base
      let boxY = baseLine.y + random(-10, 10);
      let boxZ = random(-40, -300);              // Random Z position within a limited range

      // Create the box with a delay based on its index
      this.randomBoxes.push(new Plate(boxX, boxY, boxZ, boxSize, boxSize, boxSize, boxColor, i * 150)); // Delay increases with index
    }
  }

  // Draws the scene with cascading reveal effect and smooth movement for each element type

  draw() {
    background(this.colors.background); // Set background color

    let time = millis() % 9000; // Reset main cycle every 9 seconds https://p5js.org/reference/p5/millis/

    // Increment cycle count every time we complete a 9-second loop
    if (time < 100) { // Check if a new cycle has started
      if (this.cycleCount < 3) this.cycleCount++;
    }

    // Gradual reveal based on cycle count
    if (this.cycleCount >= 1) { // First cycle reveal plates
      let offset = sin(time / 300) * 20; // Use sine function to express animation effect
      for (let i = 0; i < this.plates.length; i++) {
        this.plates[i].drawWithOffset(offset, 0, 0, time);
      }
    }

    if (this.cycleCount >= 2) { // Second cycle reveal vertical lines
      let offset = cos((time - 3000) / 300) * 15; // Use cosine function to express animation effect
      for (let i = 0; i < this.verticalLines.length; i++) {
        this.verticalLines[i].drawWithOffset(0, offset, 0, time - 3000);
      }
    }

    if (this.cycleCount >= 3) { // Third cycle reveal random boxes
      let offset = sin((time - 6000) / 300) * 50; // Use sine function to express animation effect
      for (let i = 0; i < this.randomBoxes.length; i++) {
        this.randomBoxes[i].drawWithOffset(0, 0, offset, time - 6000);
      }
    }
  }

}

// Plate class represents plate in 3D scene
class Plate {
  constructor(x, y, z, width, height, depth, color, delay) {
    this.x = x; // X position of the plate
    this.y = y; // Y position of the plate
    this.z = z;  // Z position of the plate
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.delay = delay; // Individual delay for cascading reveal effect
  }

  // Draws the plate with a specified offset and applies gradual fade-in with alpha
  drawWithOffset(offsetX, offsetY, offsetZ, time) {
    if (time > this.delay) { // Only draw after the delay
      push();
      translate(this.x + offsetX, this.y + offsetY, this.z + offsetZ);

      // Calculate alpha based on time https://p5js.org/reference/p5.Color/setAlpha/
      let alpha = map(time - this.delay, 0, 1000, 0, 255); // 1-second fade-in https://p5js.org/reference/p5/map/
      alpha = constrain(alpha, 0, 255); // Constrain alpha between 0 and 255

      fill(red(this.color), green(this.color), blue(this.color), alpha);
      noStroke();
      box(this.width, this.depth, this.height);
      pop();
    }
  }
}

// VerticalLine class represents a vertical line in 3D space
class VerticalLine {
  constructor(x, y, z, height, width, color, delay) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = height;
    this.width = width;
    this.color = color;
    this.delay = delay; // Individual delay for cascading reveal effect
  }

  // Draws the vertical line with a specified offset and applies gradual fade-in with alpha
  drawWithOffset(offsetX, offsetY, offsetZ, time) {
    if (time > this.delay) { // Only draw after the delay
      push();
      translate(this.x + offsetX, this.y + offsetY, this.z + offsetZ - this.height / 2);

      // Calculate alpha based on time https://p5js.org/reference/p5.Color/setAlpha/
      let alpha = map(time - this.delay, 0, 1000, 0, 255); // 1-second fade-in https://p5js.org/reference/p5/map/
      alpha = constrain(alpha, 0, 255); // Constrain alpha between 0 and 255

      fill(red(this.color), green(this.color), blue(this.color), alpha);
      noStroke();
      box(this.width, this.width, this.height);
      pop();
    }
  }
}


// Global variable for the scene instance
let scene;

// p5.js setup function initializes the canvas and creates the scene
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);  // 3D canvas https://p5js.org/reference/p5/WEBGL/
  camera(-800, 800, 600, 0, 0, 0, 0, 0, -1);       // Set camera position and orientation
  scene = new Scene();                             // Create a new Scene instance
}

// p5.js draw function continuously updates the scene
function draw() {
  scene.draw(); // Draws the scene with gradual reveal and smooth movement
  orbitControl(); // Allow user to control camera with mouse
}

// Resizes the canvas if the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size
}
