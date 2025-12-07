const plank = document.querySelector('.plank');
const clickArea = document.querySelector('.click-area');


const objects = [];

clickArea.addEventListener('click', e => {
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
        distance: distance,
        weight
    });

    console.log(objects);

    updatePlankRotation()
});



const updatePlankRotation = () => {
    let left = 0;
    let right = 0;

    objects.forEach((object) => {
       let tork = object.weight * Math.abs(object.distance)

        if (object.distance < 0) {
            left += tork
        } else {
            right += tork
        }

        let angle = (right-left) / 50
        angle = Math.max(-30, Math.min(30,angle))

        plank.style.transform = `translateX(-50%) rotate(${angle}deg)`
        clickArea.style.transform = `rotate(${angle}deg)`;

    })
}