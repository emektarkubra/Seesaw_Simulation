const plank = document.querySelector('.plank');

plank.addEventListener('click', e => {
    const values = plank.getBoundingClientRect();
    console.log(values)

    const distance = (e.clientX - values.left) - values.width / 2;

    console.log(distance);
});
