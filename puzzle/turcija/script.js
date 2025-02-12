document.addEventListener('DOMContentLoaded', () => {
    let startTime;
    let timerInterval;
    let isPuzzleCompleted = false;

    const correctPositions = {
        piece1: 0,
        piece2: 1,
        piece3: 2,
        piece4: 3,
        piece5: 4,
        piece6: 5,
        piece7: 6,
        piece8: 7,
        piece9: 8,
        piece10: 9,
        piece11: 10,
        piece12: 11,
        piece13: 12,
        piece14: 13,
        piece15: 14,
        piece16: 15,
        piece17: 16,
        piece18: 17,
        piece19: 18,
        piece20: 19,
        piece21: 20,
        piece22: 21,
        piece23: 22,
        piece24: 23,
        piece25: 24,
        piece26: 25,
        piece27: 26,
        piece28: 27,
        piece29: 28,
        piece30: 29,
        piece31: 30,
        piece32: 31,
        piece33: 32,
        piece34: 33,
        piece35: 34,
        piece36: 35,
        piece37: 36,
        piece38: 37,
        piece39: 38,
        piece40: 39
    };

    function checkPuzzleCompletion() {
        const gridItems = document.querySelectorAll('.grid-item');
        let completed = true;

        gridItems.forEach((item, index) => {
            const id = item.id;
            if (correctPositions[id] !== index) {
                completed = false;
            }
        });

        if (completed) {
            completePuzzle();
        }
    }

    function completePuzzle() {
        if (!isPuzzleCompleted) {
            isPuzzleCompleted = true;
            clearInterval(timerInterval);
            const endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000;
            document.getElementById("result").innerHTML = `Puzle ir pabeigta!<br>Tavs laiks: ${timeTaken} sekundes.`;
        }
    }

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById("result").innerText = `Laiks: ${elapsedTime} sekundes.`;
        }, 1000);
    }

    const grid = document.getElementById("grid");

    grid.addEventListener("dragover", (event) => {
        event.preventDefault(); // allows dropping
    });

    grid.addEventListener("drop", (event) => {
        event.preventDefault();

        const draggedId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedId);
        let targetElement = event.target;

        // pārbauda vai target ir īsts grid-item
        while (!targetElement.classList.contains("grid-item")) {
            targetElement = targetElement.parentElement;
            if (!targetElement) return;
        }

        if (draggedElement && targetElement && targetElement !== draggedElement) {
            // samaina elementus directly
            const draggedElementClone = draggedElement.cloneNode(true);
            const targetElementClone = targetElement.cloneNode(true);

            grid.replaceChild(draggedElementClone, targetElement);
            grid.replaceChild(targetElementClone, draggedElement);

            draggedElementClone.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData("text", event.target.id);
            });

            targetElementClone.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData("text", event.target.id);
            });

            checkPuzzleCompletion();
        }
    });

    document.getElementById('grid').addEventListener('dragstart', function(event) {
        if (!startTime) {
            startTimer(); // sāk timeri uzreiz un tikai pēc dragging
        }
        event.dataTransfer.setData("text", event.target.id); // seto dragged elementa id
    });
});