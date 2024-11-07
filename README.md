# Individual Task - Time-Based

This project animates a 3D scene using time-based events in p5.js.  Each element of the scene is gradually revealed over time, creating a staged, cascading effect where only a few components are visible at once.

---

## Instructions for Interacting with the Animation

1. **User Interaction**: Use the mouse to orbit the scene and adjust your viewing angle.
2. **Animation Play**: Animation playback: The animation will play automatically, a total of 9 seconds, every 3 seconds is a cycle. Each cycle will have a different element, and each element will gradually appear.

---

## Individual Approach to Animation

### Chosen Animation Method: Time-Based Events

To animate the scene, I used the time-based method. Use the `millis()` function to control the order and delay in which each element appears. By dividing the animation into cycles, I achieved a unique effect. That is, only a few components are shown at a time, with each element appearing slowly over time.

### Animated Properties and Uniqueness

1. **Plates**: The first elements to appear, moving horizontally with a subtle oscillation effect. Only a few plates are shown at a time, slowly building up the scene’s foundation.
2. **Vertical Lines**: Introduced in the second cycle, these lines appear with vertical oscillation. They appear in sequence to build the second layer of the scene.
3. **Random Boxes**: These are the last elements to be revealed, with a z-axis oscillation that gives a floating effect. Boxes gradually appear, adding depth and randomness to the scene.

The difference in my approach is that only a few components are displayed at a time, and each component is gradually visible. Create a sense of logical and organized gradual display effect. This differs from the approach of other group members, who may focus on color changes or other attributes.

---

## References and Inspiration

I'm inspired by abstract 3D animation, using progressive Revelations to build a minimalist and organized visual experience. Components appear slowly and with some oscillations, creating an active but logical sense of the scene.

**Reference Images**:
![](https://i.pinimg.com/originals/c6/a6/5c/c6a65cc530b62e14a5304be7f9ea1fa4.gif)

![](https://i.pinimg.com/originals/ed/58/13/ed5813e2010aa254e2844803d4c29f2e.gif)

---

## Technical Explanation

Using the `millis()` function in p5.js, I implemented precise cycle timing to control the sequence of plate, line, and box appearances, each cycle completing in roughly 9 seconds. Sinusoidal functions (sin and cos) add a smooth, oscillating movement in different directions for each element type—horizontal for plates, vertical for lines, and along the z-axis for boxes—enhancing the organic flow of the reveal. In addition, each element gradually fades in by mapping the millis () value with `map ()` to the alpha range of 0 to 255. Achieve a seamless transition from transparent to opaque.

### External Tools and Techniques
In p5.js, by setting the canvas to WEBGL in createCanvas(). I have access to a range of 3D features, such as creating 3D shapes (such as boxes, spheres, and custom geometrics), as well as transformations such as rotation, translation, and scaling.
[p5.js WEBGL](https://p5js.org/reference/p5/WEBGL/)

In p5.js, Alpha refers to the opacity of a color, controlling how transparent or opaque the color is. The Alpha value ranges from 0 to 255, where 0 is completely transparent (invisible) and 255 is completely opaque (opaque).
Alpha can be set in functions such as fill(), stroke (), and background () to adjust the transparency of the shape or background. This feature is useful for creating layered visuals, fading effects, or adding depth by overlapping transparent shapes.
[p5.js Alpha 1](https://p5js.org/reference/p5/fill/)
[p5.js Alpha 2](https://p5js.org/reference/p5.Color/setAlpha/)

In p5.js, `millis()` is a function that returns the number of milliseconds that have passed since the program started. It is commonly used for creating time-based events and animations by measuring time time without relying on frameCount. `millis()` is helpful for controlling timed actions, managing delays, or syncing animations to a precise timeline in p5.js projects. If a sketch has a setup() function, then millis() begins tracking time before the code in setup() runs.
[p5.js millis()](https://p5js.org/reference/p5/millis/)

In p5.js, map() is a function used to re-map a number from one range to another. This is especially useful for scaling values to fit different ranges, such as adjusting sensor data or synchronizing animations. The syntax is map(value, start1, stop1, start2, stop2) value: The number to re-map. start1, stop1: The original range of the value. start2, stop2: The target range.
[p5.js map()](https://p5js.org/reference/p5/map/)