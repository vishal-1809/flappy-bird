document.addEventListener('DOMContentLoaded', () => {

    const width = 7;
    const height = 10;
    const grid = document.querySelector('.grid');

    for (let i = 0; i < 70; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
    }

    const box = document.querySelectorAll('.grid div');

    let on = true;
    let bird = 36;
    let score = 0;
    let one = [0, 7, 14, 21, 28, 35, 42, 49, 56, 63];
    let two = [3, 10, 17, 24, 31, 38, 45, 52, 59, 66];
    let three = [6, 13, 20, 27, 34, 41, 48, 55, 62, 69];
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let hole1 = 7;
    let hole2 = 5;
    let hole3 = 3;

    for (let i = 0; i < one.length; i++) {
        box[one[i]].classList.add('wall');
        box[one[hole1]].classList.remove('wall');
        box[one[hole1 - 1]].classList.remove('wall');
    }
    for (let i = 0; i < two.length; i++) {
        box[two[i]].classList.add('wall');
        box[two[hole2]].classList.remove('wall');
        box[two[hole2 - 1]].classList.remove('wall');
    }
    for (let i = 0; i < three.length; i++) {
        box[three[i]].classList.add('wall');
        box[three[hole3]].classList.remove('wall');
        box[three[hole3 - 1]].classList.remove('wall');
    }

    box[bird].classList.add('bird');
    document.getElementById('score').innerText = `${score}`;

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    function gameOn() {

        function check() {
            if (box[bird].classList.contains('wall')) {
                document.getElementById('gameOver').style.display = "block";
                clearInterval(start);
                clearInterval(wallMovement);
                clearInterval(sc);
                on = false;
            }
        }

        let sc = setInterval(() => {
            score++;
            document.getElementById('score').innerText = `${score}`;
        }, 1000);

        let wallMovement = setInterval(() => {
            if (on) {
                if (one[0] === 0) {
                    for (let i = 0; i < one.length; i++) {
                        box[one[i]].classList.remove('wall');
                    }
                    d1++;
                    if (d1 === 3) {
                        one = [6, 13, 20, 27, 34, 41, 48, 55, 62, 69];
                        hole1 = randomNumber(2, 9);
                        for (let i = 0; i < one.length; i++) {
                            box[one[i]].classList.add('wall');
                            box[one[hole1]].classList.remove('wall');
                            box[one[hole1 - 1]].classList.remove('wall');
                        }
                        d1 = 0;
                    }
                    check();
                }
                else {
                    for (let i = 0; i < one.length; i++) {
                        box[one[i]].classList.remove('wall');
                        one[i]--;
                        box[one[i]].classList.add('wall');
                        box[one[hole1]].classList.remove('wall');
                        box[one[hole1 - 1]].classList.remove('wall');
                    }
                    check();
                }

                if (two[0] === 0) {
                    for (let i = 0; i < two.length; i++) {
                        box[two[i]].classList.remove('wall');
                    }
                    d2++;
                    if (d2 === 3) {
                        two = [6, 13, 20, 27, 34, 41, 48, 55, 62, 69];
                        d2 = 0;
                        hole2 = randomNumber(2, 9);
                        for (let i = 0; i < two.length; i++) {
                            box[two[i]].classList.add('wall');
                            box[two[hole2]].classList.remove('wall');
                            box[two[hole2 - 1]].classList.remove('wall');
                        }
                    }
                    check();
                }
                else {
                    for (let i = 0; i < two.length; i++) {
                        box[two[i]].classList.remove('wall');
                        two[i]--;
                        box[two[i]].classList.add('wall');
                        box[two[hole2]].classList.remove('wall');
                        box[two[hole2 - 1]].classList.remove('wall');
                    }
                    check();
                }

                if (three[0] === 0) {
                    for (let i = 0; i < three.length; i++) {
                        box[three[i]].classList.remove('wall');
                    }
                    d3++;
                    if (d3 === 3) {
                        three = [6, 13, 20, 27, 34, 41, 48, 55, 62, 69];
                        d3 = 0;
                        hole3 = randomNumber(2, 9);
                        for (let i = 0; i < three.length; i++) {
                            box[three[i]].classList.add('wall');
                            box[three[hole3]].classList.remove('wall');
                            box[three[hole3 - 1]].classList.remove('wall');
                        }
                    }
                    check();
                }
                else {
                    for (let i = 0; i < three.length; i++) {
                        box[three[i]].classList.remove('wall');
                        three[i]--;
                        box[three[i]].classList.add('wall');
                        box[three[hole3]].classList.remove('wall');
                        box[three[hole3 - 1]].classList.remove('wall');
                    }
                    check();
                }
            }
        }, 1500)


        let start = setInterval(() => {
            if (bird > 62) {
                clearInterval(start);
                clearInterval(wallMovement);
                clearInterval(sc);
                document.getElementById('gameOver').style.display = "block";
                on = false;
            }
            else {
                box[bird].classList.remove('bird');
                bird += width;
                box[bird].classList.add('bird');
                setTimeout(() => {
                    box[bird].classList.remove('bird');
                    bird += width;
                    box[bird].classList.add('bird');
                    check();
                }, 1500);
            }
        }, 2000);

        function moveup() {
            if (bird < 7) {
                clearInterval(start);
                clearInterval(wallMovement);
                clearInterval(sc);
                document.getElementById('gameOver').style.display = "block";
                on = false;
            }
            else {
                box[bird].classList.remove('bird');
                bird -= width;
                box[bird].classList.add('bird');
                check();
            }
        }

        function goleft() {
            box[bird].classList.remove('bird');
            bird--;
            box[bird].classList.add('bird');
            check();
        }

        function goright() {
            box[bird].classList.remove('bird');
            bird++;
            box[bird].classList.add('bird');
            check();
        }


        if (on) {
            document.getElementById('whole').addEventListener('click', () => {
                moveup();
            });
        }


        function keys(e) {
            if (e.keyCode === 38 && on) {
                moveup();
            }
            if (e.keyCode === 37 && on && bird !== 0 && bird !== 7 && bird !== 14 && bird !== 21 && bird !== 28 && bird !== 35 && bird !== 42 && bird !== 49 && bird !== 56 && bird !== 63) {
                goleft();
            }
            if (e.keyCode === 39 && on && bird !== 6 && bird !== 13 && bird !== 20 && bird !== 27 && bird !== 34 && bird !== 41 && bird !== 48 && bird !== 55 && bird !== 62 && bird !== 69) {
                goright();
            }
        }

        document.addEventListener('keydown', keys);
    }

    if (on) {
        document.getElementById('start').addEventListener('click', gameOn);
    }



});