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
});