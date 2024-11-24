document.addEventListener('DOMContentLoaded', () => {
    const maxNumberInput = document.getElementById('maxNumber');
    const shuffleButton = document.getElementById('shuffleButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentNumberDiv = document.getElementById('currentNumber');
    const positionDiv = document.getElementById('position');

    let shuffledNumbers = [];
    let currentIndex = 0;

    function updateDisplay() {
        if (shuffledNumbers.length > 0) {
            currentNumberDiv.textContent = shuffledNumbers[currentIndex];
            positionDiv.textContent = `${currentIndex + 1} / ${shuffledNumbers.length}`;
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === shuffledNumbers.length - 1;
        } else {
            currentNumberDiv.textContent = '';
            positionDiv.textContent = '';
            prevButton.disabled = true;
            nextButton.disabled = true;
        }
    }

    function resetDisplay() {
        shuffledNumbers = [];
        currentIndex = 0;
        updateDisplay();
    }

    shuffleButton.addEventListener('click', () => {
        const maxNumber = parseInt(maxNumberInput.value, 10);
        if (isNaN(maxNumber) || maxNumber < 1) {
            resetDisplay();
            currentNumberDiv.textContent = 'No es un número';
            positionDiv.textContent = 'Por favor introduzca un número más grande que 0.';
            return;
        }

        shuffledNumbers = Array.from({ length: maxNumber}, (_, i) => i+1);
        for (let i = shuffledNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
        }

        currentIndex = 0;
        updateDisplay();
    });

    prevButton.addEventListener('click', () => {
        if (shuffledNumbers.length > 0 && currentIndex > 0) {
            currentIndex--;
            updateDisplay();
        }
    });

    nextButton.addEventListener('click', () => {
        if (shuffledNumbers.length > 0 && currentIndex < shuffledNumbers.length - 1) {
            currentIndex++;
            updateDisplay();
        }
    });

    maxNumberInput.addEventListener('input', () => {
        if (maxNumberInput.value.trim() === '' || isNaN(parseInt(maxNumberInput.value, 10))) {
            resetDisplay();
        }
    });
});

