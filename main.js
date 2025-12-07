const plank = document.querySelector(".plank");
const clickArea = document.querySelector(".click-area");
const area = document.querySelector(".area");


const leftWeightElement = document.querySelector(".left-weight")
const nextWeightElement = document.querySelector(".next-weight")
const rightWeightElement = document.querySelector(".right-weight")
const tiltAngleElement = document.querySelector(".tilt-angle")

const resetButton = document.querySelector(".reset-btn")


let objects = [];


let nextBallWeight = Math.floor(Math.random() * 10) + 1;
nextWeightElement.textContent = `${nextBallWeight} kg`;

clickArea.addEventListener("click", (e) => {
    const values = plank.getBoundingClientRect();

    const clickX = e.clientX - values.left;
    const distance = clickX - values.width / 2;

    const weight = nextBallWeight;

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

    nextBallWeight = Math.floor(Math.random() * 10) + 1;
    nextWeightElement.textContent = `${nextBallWeight} kg`;

    updatePlankRotation();
});




const updatePlankRotation = () => {
    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeight = 0;
    let rightWeight = 0;

    objects.forEach((object) => {
        const torque = object.weight * Math.abs(object.distance);

        if (object.distance < 0) {
            leftTorque += torque;
            leftWeight += object.weight
        } else {
            rightTorque += torque;
            rightWeight += object.weight
        }
    });

    let angle = (rightTorque - leftTorque) / 50;
    angle = Math.max(-30, Math.min(30, angle));

    plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    updateClickAreaBox();

    leftWeightElement.textContent = `${leftWeight} kg`;
    rightWeightElement.textContent = `${rightWeight} kg`;

    tiltAngleElement.textContent = `${angle.toFixed(1)}°`;

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


resetButton.addEventListener("click", (e) => {
    console.log(e)
    objects = [];

    const balls = plank.querySelectorAll(".ball");
    balls.forEach(ball => ball.remove());

    plank.style.transform = `translateX(-50%) rotate(0deg)`;

    leftWeightElement.textContent = "0 kg";
    rightWeightElement.textContent = "0 kg";
    tiltAngleElement.textContent = "0°";

    nextBallWeight = Math.floor(Math.random() * 10) + 1;
    nextWeightElement.textContent = `${nextBallWeight} kg`;

})