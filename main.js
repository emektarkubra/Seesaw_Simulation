const plank = document.querySelector(".plank")
const area = document.querySelector(".area")

const leftWeightElement = document.querySelector(".left-weight")
const nextWeightElement = document.querySelector(".next-weight")
const rightWeightElement = document.querySelector(".right-weight")
const tiltAngleElement = document.querySelector(".tilt-angle")
const resetButton = document.querySelector(".reset-btn")
const ballInfoElement = document.querySelector(".ball-info-box")

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
}

let balls = []
const minBallSize = 18
const maxBallSize = 60

let nextBallWeight = Math.floor(Math.random() * 10) + 1
nextWeightElement.textContent = nextBallWeight + " kg"


// click plank
plank.addEventListener("click", (e) => {

    const values = plank.getBoundingClientRect()
    const visualX = e.clientX - values.left

    const ratio = visualX / values.width

    const plankWidth = plank.offsetWidth
    const xOnPlank = ratio * plankWidth
    const distanceFromCenter = xOnPlank - plankWidth / 2

    const weight = nextBallWeight
    const ballSize = minBallSize + ((weight - 1) / 9) * (maxBallSize - minBallSize)

    const ball = document.createElement("div")
    ball.className = "ball ball--animation"
    ball.textContent = weight

    ball.style.width = ballSize + "px"
    ball.style.height = ballSize + "px"
    ball.style.left = (xOnPlank - ballSize / 2) + "px"
    ball.style.background = colors[weight]

    ball.addEventListener("animationend", () => {
        ball.classList.remove("ball--animation")
    })

    plank.appendChild(ball)

    balls.push({
        x: xOnPlank,
        distance: distanceFromCenter,
        weight: weight
    })

    nextBallWeight = Math.floor(Math.random() * 10) + 1
    nextWeightElement.textContent = nextBallWeight + " kg"


    localStorage.setItem("objects", JSON.stringify(balls))
    localStorage.setItem("next-weight", String(nextBallWeight))

    recalculateBalance()
    updateBallInfoList(balls)
})


// plank balance
const recalculateBalance = () => {
    let leftTorque = 0
    let rightTorque = 0
    let leftWeight = 0
    let rightWeight = 0

    balls.forEach((item) => {
        const torque = item.weight * Math.abs(item.distance)

        if (item.distance < 0) {
            leftTorque += torque
            leftWeight += item.weight
        } else {
            rightTorque += torque
            rightWeight += item.weight
        }
    })

    let angle = (rightTorque - leftTorque) / 50
    if (angle > 30) angle = 30
    if (angle < -30) angle = -30

    plank.style.transform = "translateX(-50%) rotate(" + angle + "deg)"

    leftWeightElement.textContent = leftWeight + " kg"
    rightWeightElement.textContent = rightWeight + " kg"
    tiltAngleElement.textContent = angle.toFixed(1) + "°"
}


// load window
window.addEventListener("load", () => {
    let storedObjects = null
    let storedNextWeigt = null

    storedObjects = JSON.parse(localStorage.getItem("objects"))
    storedNextWeigt = localStorage.getItem("next-weight")

    if (storedObjects && Array.isArray(storedObjects)) {
        balls = storedObjects

        balls.forEach((item) => {
            const ballSize = minBallSize + ((item.weight - 1) / 9) * (maxBallSize - minBallSize)

            const ball = document.createElement("div")
            ball.className = "ball"
            ball.textContent = item.weight

            ball.style.width = ballSize + "px"
            ball.style.height = ballSize + "px"
            ball.style.left = (item.x - ballSize / 2) + "px"
            ball.style.background = colors[item.weight]

            plank.appendChild(ball)
        })

        recalculateBalance()
        updateBallInfoList(balls)
    }

    if (storedNextWeigt) {
        nextBallWeight = Number(storedNextWeigt)
        nextWeightElement.textContent = nextBallWeight + " kg"
    }
})


// preview ball
let previewBall = null

const updatePreviewBall = (clientX) => {
    const values = plank.getBoundingClientRect()

    let visualX = clientX - values.left
    if (visualX < 0) visualX = 0
    if (visualX > values.width) visualX = values.width

    const ratio = values.width ? (visualX / values.width) : 0
    const plankWidth = plank.offsetWidth || values.width
    const xOnPlank = ratio * plankWidth

    const weight = nextBallWeight
    const ballSize = minBallSize + ((weight - 1) / 9) * (maxBallSize - minBallSize)

    if (!previewBall) {
        previewBall = document.createElement("div")
        previewBall.className = "ball preview-ball"
        plank.appendChild(previewBall)
    }

    previewBall.textContent = weight
    previewBall.style.width = ballSize + "px"
    previewBall.style.height = ballSize + "px"
    previewBall.style.left = (xOnPlank - ballSize / 2) + "px"
    previewBall.style.background = colors[weight]
}

plank.addEventListener("mousemove", (e) => {
    updatePreviewBall(e.clientX)
})

plank.addEventListener("mouseleave", () => {
    if (previewBall) {
        previewBall.remove()
        previewBall = null
    }
})


// ball info list
const updateBallInfoList = (list) => {
    ballInfoElement.style.background = "#ffffff"
    ballInfoElement.style.padding = "10px"
    ballInfoElement.style.marginTop = "20px"
    ballInfoElement.style.maxHeight = "100px"
    ballInfoElement.style.overflowY = "auto"

    ballInfoElement.innerHTML = ""

    list.forEach((item) => {
        const row = document.createElement("div")
        row.className = "ball-info-text"

        const side = item.distance < 0 ? "left" : "right"
        const fromCenter = Math.abs(item.distance).toFixed(2)

        row.textContent = `📦 ${item.weight} kg droppd on ${side} side at ${fromCenter}px`
        ballInfoElement.appendChild(row)
    })
}


// reset button
resetButton.addEventListener("click", () => {
    balls = []

    const existingBalls = plank.querySelectorAll(".ball")
    existingBalls.forEach((el) => el.remove())

    plank.style.transform = "translateX(-50%) rotate(0deg)"
    leftWeightElement.textContent = "0 kg"
    rightWeightElement.textContent = "0 kg"
    tiltAngleElement.textContent = "0°"

    localStorage.removeItem("objects")
    localStorage.removeItem("next-weight")

    nextBallWeight = Math.floor(Math.random() * 10) + 1
    nextWeightElement.textContent = nextBallWeight + " kg"

    ballInfoElement.innerHTML = ""
    ballInfoElement.removeAttribute("style")
})