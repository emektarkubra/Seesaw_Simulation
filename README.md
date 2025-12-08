# Thought Process & Design Decisions

This project was developed to create an interactive seesaw simulation entirely with vanilla JavaScript, combining user interaction with physics-based torque calculations. Below is a summary of the main steps and design choices I followed during development.

---

## 1. Setting Up the Base HTML Structure

I started by creating a minimal `index.html` file and included the main project files:

* `style.css`
* `script.js`

I also added a main container to position and organize all UI elements cleanly.

---

## 2. Adding the Plank, Pivot

To build the core visual structure of the simulation, I created three essential HTML components:

* **Plank (`.plank`)** — the seesaw board
* **Pivot (`.pivot`)** — the triangular support beneath the plank

These elements formed the foundation of the visual simulation.

---

## 3. Visual Styling with CSS

I styled the plank, pivot, and balls using CSS.
To enhance the user experience:

* Balls scale based on their weight
* Each weight has a distinct color for clarity

The goal was to keep the interface simple, readable, and intuitive.

---

## 4. Establishing the JavaScript Structure

On the JavaScript side, I:

* Selected all necessary DOM elements
* Created an `objects` array to store placed balls
* Defined variables for weight calculations, distances, and UI updates

This structure provided the logical backbone of the simulation.

---

## 5. Implementing Ball Placement on Click

When the user clicks on the plank:

1. The click position (on plank) is calculated
2. A random weight is generated
3. Ball size is determined based on weight
4. A new ball is visually placed on the plank
5. Its data is stored in the `objects` array

This step enabled the core interaction of the project.

---

## 6. Calculating Torque and Plank Rotation

To simulate realistic movement, I applied the formula:

> **torque = weight × distance**

* Left and right torque values are computed separately
* The difference determines the tilt angle
* The rotation is clamped within `±30°`
* CSS `transform: rotate()` is used to animate the tilt

This resulted in a simple but effective representation of seesaw physics.

---

## 7. Hover-Based Ball Preview

I implemented a “preview ball” that appears when the user moves the cursor over the plank:

* The preview updates according to cursor position
* It uses the size and color of the next ball to be placed
* It disappears when the user leaves the area

This feature improves clarity and user engagement.

---

## 8. LocalStorage Integration

To preserve the simulation between page reloads, I saved:

* The list of placed balls (`objects`)
* The upcoming random weight

into `localStorage`.
When the page loads, the simulation automatically reconstructs itself using this data.

Pressing reset clears the saved state.

---

## 9. Reset Functionality

The reset feature:

* Removes all balls from the DOM
* Resets weight and angle values
* Clears localStorage
* Generates a new upcoming weight

This gives the user a clean slate to restart the simulation.

---

## Conclusion

This project combines DOM manipulation, physics calculations, animation, user interaction, and browser storage into a cohesive simulation. Throughout development, I focused on keeping the structure:

* simple
* readable
* modular
* easily extendable

to ensure long-term maintainability and clarity.

---

# Trade-off

**Trade-off:**

The simulation was built within a single file using basic functions.

**+ The project was prototyped quickly**
**– A modular structure, classes, or state management—which would be necessary for larger-scale projects—were not implemented**


---

# Use of AI Assistance

During this project, AI was used **only as a supportive tool**, not for generating the core implementation. The main areas where AI assisted me were:

* Helping simplify or rephrase explanations for the README
* Providing torque calculations how it is work:

---

# Demo

You can try the live version of the project here:

**[https://emektarkubra.github.io/Seesaw_Simulation/](https://emektarkubra.github.io/Seesaw_Simulation/)**

---