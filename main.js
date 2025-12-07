const plank = document.querySelector(".plank");
const clickArea = document.querySelector(".click-area");
const area = document.querySelector(".area");


const objects = [];


clickArea.addEventListener("click", (e) => {
    const values = plank.getBoundingClientRect();

    const clickX = e.clientX - values.left;
    const distance = clickX - values.width / 2;

    console.log(clickX);
    console.log(distance);

    const weight = Math.floor(Math.random() * 10) + 1;

    const ball = document.createElement("div");
    ball.className = "ball";
    ball.textContent = weight;

    ball.style.left = `${clickX - 10}px`;
    plank.appendChild(ball);

    objects.push({
        x: clickX,
        distance,
        weight,
    });

    console.log(objects);

    updatePlankRotation();
});



const updatePlankRotation = () => {
    let leftTorque = 0;
    let rightTorque = 0;

    objects.forEach((object) => {
        const torque = object.weight * Math.abs(object.distance);

        if (object.distance < 0) {
            leftTorque += torque;
        } else {
            rightTorque += torque;
        }
    });

    let angle = (rightTorque - leftTorque) / 50;
    angle = Math.max(-30, Math.min(30, angle));

    plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    updateClickAreaBox();
};



const updateClickAreaBox = () => {
    const areaValues = area.getBoundingClientRect();
    const plankValues = plank.getBoundingClientRect();

    const left = plankValues.left - areaValues.left;
    const top = 0;
    const width = plankValues.width;
    const height = plankValues.top - areaValues.top;

    clickArea.style.left = left + "px";
    clickArea.style.top = top + "px";
    clickArea.style.width = width + "px";
    clickArea.style.height = height + "px";
};


window.addEventListener("load", () => {
    updateClickAreaBox();
});
