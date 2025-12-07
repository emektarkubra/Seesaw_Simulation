# Thought Process & Design Decisions

This project was developed to create an interactive seesaw simulation entirely with vanilla JavaScript, combining user interaction with physics-based torque calculations. Below is a summary of the main steps and design choices I followed during development.

---

## 1. Setting Up the Base HTML Structure

I started by creating a minimal `index.html` file and included the main project files:

* `style.css`
* `script.js`

I also added a main container to position and organize all UI elements cleanly.

---

## 2. Adding the Plank, Pivot, and Click Area

To build the core visual structure of the simulation, I created three essential HTML components:

* **Plank (`.plank`)** — the seesaw board
* **Pivot (`.pivot`)** — the triangular support beneath the plank
* **Click Area (`.click-area`)** — an invisible interactive region where the user can drop balls

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

When the user clicks on the interactive area:

1. The click position relative to the plank is calculated
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

I implemented a “preview ball” that appears when the user moves the cursor over the click area:

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

### **The Click Area is recalculated every time the plank tilts**

Each time the plank rotates, the clickable area is repositioned to match its new orientation.
This approach works well, but it can cause small pixel-level shifts in certain cases.

**Trade-off:**

* The user can still click accurately
* However, the area does not perfectly represent the plank’s true 3D tilt (a simplified 2D approximation)


Aşağıda README’ye **ayrı bir başlık altında** ekleyebileceğin, profesyonel ve dürüst bir açıklama veriyorum.
Hem sade hem de mülakat açısından doğru bir ton içerir.

---

# Use of AI Assistance

During this project, AI was used **only as a supportive tool**, not for generating the core implementation. The main areas where AI assisted me were:

* Helping simplify or rephrase explanations for the README
* Providing guidance on CSS transform usage, such as:

    transform: rotate() behavior
    how rotation affects positioning

