const plank = document.querySelector(".plank");
const clickArea = document.querySelector(".click-area");
const area = document.querySelector(".area");

const leftWeightElement = document.querySelector(".left-weight");
const nextWeightElement = document.querySelector(".next-weight");
const rightWeightElement = document.querySelector(".right-weight");
const tiltAngleElement = document.querySelector(".tilt-angle");
const resetButton = document.querySelector(".reset-btn");
const ballInfoElement = document.querySelector(".ball-info-box");

const colors = {
    1: "#e86673",
    2: "#e07a42",
    3: "#e6c335",
    4: "#9ec73b",
    5: "#33d6f2",
    6: "#4f8fe0",
    7: "#7b47c7",
    8: "#d44a98",
    9: "#ff4bd9",
    10: "#e0a43b"
};

let objects = [];
const minBallSize = 18;
const maxBallSize = 60;


let nextBallWeight = Math.floor(Math.random() * 10) + 1;
nextWeightElement.textContent = `${nextBallWeight} kg`;


// click area
clickArea.addEventListener("click", (e) => {
    const values = plank.getBoundingClientRect();

    const clickX = e.clientX - values.left;
    const distance = clickX - values.width / 2;

    const weight = nextBallWeight;
    const ballSize = minBallSize + ((weight - 1) / 9) * (maxBallSize - minBallSize);

    const ball = document.createElement("div");
    ball.className = "ball";
    ball.textContent = weight;

    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    ball.style.left = `${clickX - ballSize / 2}px`;
    ball.style.background = colors[weight];

    plank.appendChild(ball);

    objects.push({
        x: clickX,
        distance,
        weight
    });

    nextBallWeight = Math.floor(Math.random() * 10) + 1;
    nextWeightElement.textContent = `${nextBallWeight} kg`;

    localStorage.setItem("seesaw-objects", JSON.stringify(objects));
    localStorage.setItem("seesaw-next-weight", nextBallWeight);

    updatePlankRotation();
    ballInfoAdd(objects);
});


// plank rotation update
const updatePlankRotation = () => {
    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeight = 0;
    let rightWeight = 0;

    objects.forEach(object => {
        const torque = object.weight * Math.abs(object.distance);

        if (object.distance < 0) {
            leftTorque += torque;
            leftWeight += object.weight;
        } else {
            rightTorque += torque;
            rightWeight += object.weight;
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


// click area box update
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


// window upload
window.addEventListener("load", () => {
    updateClickAreaBox();

    const savedObjects = JSON.parse(localStorage.getItem("seesaw-objects"));
    const savedNext = localStorage.getItem("seesaw-next-weight");

    if (savedObjects && Array.isArray(savedObjects)) {
        objects = savedObjects;

        objects.forEach((object) => {
            const ballSize = minBallSize + ((object.weight - 1) / 9) * (maxBallSize - minBallSize);

            const ball = document.createElement("div");
            ball.className = "ball";
            ball.textContent = object.weight;

            ball.style.width = `${ballSize}px`;
            ball.style.height = `${ballSize}px`;
            ball.style.left = `${object.x - ballSize / 2}px`;
            ball.style.background = colors[object.weight];

            plank.appendChild(ball);
        });

        updatePlankRotation();
        ballInfoAdd(objects);
    }

    if (savedNext) {
        nextBallWeight = Number(savedNext);
        nextWeightElement.textContent = `${nextBallWeight} kg`;
    }
});


// preview ball
let previewBall = null;

const getBallSizeForWeight = (weight) =>
    minBallSize + ((weight - 1) / 9) * (maxBallSize - minBallSize);

const updatePreviewBall = (clientX) => {
    const clickValues = clickArea.getBoundingClientRect();
    const plankWidth = plank.offsetWidth;

    let relativeX = clientX - clickValues.left;
    relativeX = Math.max(0, Math.min(clickValues.width, relativeX));

    const weight = nextBallWeight;
    const ballSize = getBallSizeForWeight(weight);

    const xOnPlank = (relativeX / clickValues.width) * plankWidth;

    if (!previewBall) {
        previewBall = document.createElement("div");
        previewBall.className = "ball preview-ball";
        plank.appendChild(previewBall);
    }

    previewBall.textContent = weight;
    previewBall.style.width = `${ballSize}px`;
    previewBall.style.height = `${ballSize}px`;
    previewBall.style.left = `${xOnPlank - ballSize / 2}px`;
    previewBall.style.background = colors[weight];
};

clickArea.addEventListener("mousemove", (e) => updatePreviewBall(e.clientX));
clickArea.addEventListener("mouseleave", () => {
    if (previewBall) previewBall.remove(), previewBall = null;
});


// ball descriptions area
const ballInfoAdd = (objects) => {
    ballInfoElement.style.background = "#ffffff";
    ballInfoElement.style.padding = "10px";
    ballInfoElement.style.marginTop = "20px";
    ballInfoElement.style.maxHeight = "100px";
    ballInfoElement.style.overflowY = "auto";

    ballInfoElement.innerHTML = "";

    objects.forEach((object) => {
        const infoBox = document.createElement("div");
        infoBox.className = "ball-info-text";

        const side = object.distance < 0 ? "left" : "right";
        const fromCenter = Math.abs(object.distance);

        infoBox.textContent = `📦 ${object.weight} kg dropped on ${side} side at ${fromCenter.toFixed(2)}px`;
        ballInfoElement.appendChild(infoBox);
    });
};


// reset button
resetButton.addEventListener("click", () => {
    objects = [];

    const balls = plank.querySelectorAll(".ball");
    balls.forEach(ball => ball.remove());

    plank.style.transform = `translateX(-50%) rotate(0deg)`;
    leftWeightElement.textContent = "0 kg";
    rightWeightElement.textContent = "0 kg";
    tiltAngleElement.textContent = "0°";

    localStorage.removeItem("seesaw-objects");
    localStorage.removeItem("seesaw-next-weight");

    nextBallWeight = Math.floor(Math.random() * 10) + 1;
    nextWeightElement.textContent = `${nextBallWeight} kg`;

    ballInfoElement.innerHTML = "";
    ballInfoElement.removeAttribute("style");
});