const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heartColors = ["#ff4d4d", "#ff1a1a", "#ff6666", "#ff9999"];
let colorIndex = 0;

function changeHeartColor() {
    ctx.strokeStyle = heartColors[colorIndex % heartColors.length];
    colorIndex++;
}

ctx.lineWidth = 2;

function corazon(n) {
    const x = 16 * Math.sin(n) ** 3;
    const y = 13 * Math.cos(n) - 5 * Math.cos(2 * n) - 2 * Math.cos(3 * n) - Math.cos(4 * n);
    return [x, y];
}

function Turtle() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2 - 40; // atņemu 40px, lai sirdis sāktu zīmēties nedaudz virs canvas centra
    this.penDown = false;

    // aizved uz poziciju
    this.goto = function(x, y) {
        if (this.penDown) {
            ctx.lineTo(this.x + x, this.y - y);
        } else {
            ctx.moveTo(this.x + x, this.y - y);
        }
        ctx.stroke();
    };

    // sāk zīmēt
    this.pendown = function() {
        this.penDown = true;
        ctx.beginPath();
    };

    // beidz zīmēt
    this.penup = function() {
        this.penDown = false;
    }
}

const t = new Turtle();

// animācijas mainīgie
let i = 1; // sirds lielumu scale
let n = 0; // soļa leņķis sirds punktiem
let maxI = 20; // cik sirdis uzzīmē
let maxN = 70; // max soļi, lai uzzīmētu vienu sirdi
let drawingHeart = false; // vai pašlaik tiek zīmēta sirds
let currentHeart = 0; // pašreizējā sirds tiek zīmēta

function animateHeart() {
    if (drawingHeart) {
        // turpina zīmēt pašreizējo sirdi
        const [x, y] = corazon(n / 10);
        t.goto(x * i, y * i); // zīmē sirdi
        n += 2; // palielina soļa leņķi nākamajam solim (jo lielāks skaitlis, jo boxier līnijas)

        if (n >= maxN) {
            // pabeidz pašreizējo sirdi, tad iet uz nākamo
            n = 0;
            currentHeart++;
            t.penup(); // paceļ "zīmuli", lai neparādītos neglītas līnijas
            if (currentHeart < maxI) {
                // Reset the drawing for the next heart, but without drawing
                t.goto(0, 0); // aiziet atpakaļ uz centru
                t.pendown(); // sāk nākamo sirdi
                i++; // palielina nākamās sirds lielumu
                changeHeartColor(); // nomaina katras jaunās sirds krāsu
                requestAnimationFrame(animateHeart); // turpina zīmēt nākamo sirdi
            } else {
                setTimeout(resetAndRestart, 1000); // restartē animāciju pēc 1sec
            }
        } else {
            // turpina zīmēt tādu pašu sirdi
            setTimeout(() => requestAnimationFrame(animateHeart), 5); // jo lielāks cipars, jo lēnāk zīmēs
        }
    }
}

function resetAndRestart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // notīra canvas
    ctx.beginPath(); // force restartēšanu uz zīmēšanas ceļa
    i = 1;  // restartē sirds lielumu
    currentHeart = 0;  // restartē sirds skaitu
    colorIndex = 0; // restartē sirds krāsu
    startAnimation();  // restartē animāciju
}

function startAnimation() {
    t.penup();
    t.goto(0, 0);  // sāk canvas centrā
    t.pendown();
    drawingHeart = true;
    animateHeart(); // sāk zīmēt pirmo sirdi
}
startAnimation();