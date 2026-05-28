// --- Navigation Logic ---
let currentStep = 1;
const totalSteps = 5;

function updateUI() {
    // Hide all steps, show current
    document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${currentStep}`).classList.add('active');

    // Update buttons
    document.getElementById('btn-back').disabled = currentStep === 1;

    const nextBtn = document.getElementById('btn-next');
    if (currentStep === totalSteps) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "Finish 🎉";
    } else {
        nextBtn.disabled = false;
        nextBtn.innerHTML = "Next →";
    }

    // Update text indicator
    document.getElementById('step-indicator').innerText = currentStep;

    // Update dots
    const dots = document.getElementById('dot-indicators');
    dots.innerHTML = '';
    for (let i = 1; i <= totalSteps; i++) {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${i === currentStep ? 'bg-indigo-600 scale-110' : 'bg-slate-300'}`;
        dots.appendChild(dot);
    }
}

function changeStep(delta) {
    currentStep += delta;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) currentStep = totalSteps;
    updateUI();
}

// --- Interactive Tool Logic (Step 4) ---

// The story words
const storyWords = ["The", "robot", "dog", "barked", "very", "loudly", "at", "the", "tall", "postman", "today"];
let hiddenStateMemory = []; // The 'backpack' array

// Initialize word buttons
function initWordButtons() {
    const container = document.getElementById('word-buttons');
    container.innerHTML = '';
    storyWords.forEach(word => {
        const btn = document.createElement('button');
        btn.className = "shrink-0 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors shadow-sm text-sm";
        btn.innerText = word;
        btn.onclick = () => processWord(word);
        container.appendChild(btn);
    });
}

function processWord(word) {
    // 1. Update Input Display
    const inputDisplay = document.getElementById('current-input-display');
    inputDisplay.innerText = `"${word}"`;
    inputDisplay.classList.remove('animate-pop');
    void inputDisplay.offsetWidth; // trigger reflow
    inputDisplay.classList.add('animate-pop');

    // 2. Simulate Brain Processing
    const brainProcessing = document.getElementById('brain-processing');
    if (hiddenStateMemory.length === 0) {
        brainProcessing.innerHTML = `<span class="text-slate-800 font-bold">"${word}"</span> + <span class="text-pink-500 font-bold">[Empty Backpack]</span>`;
    } else {
        brainProcessing.innerHTML = `<span class="text-slate-800 font-bold">"${word}"</span> + <span class="text-pink-500 font-bold">Backpack</span>`;
    }

    // 3. Generate Output (simplified string building)
    const outputDisplay = document.getElementById('current-output-display');
    const sentenceSoFar = [...hiddenStateMemory].reverse().join(" ") + (hiddenStateMemory.length > 0 ? " " : "") + word;
    outputDisplay.innerText = `Robo hears: "${sentenceSoFar}..."`;

    // 4. Update Hidden State (Backpack)
    // Add new word to the FRONT of the array so index 0 is newest.
    hiddenStateMemory.unshift(word);
    renderBackpack();
}

function renderBackpack() {
    const stack = document.getElementById('memory-stack');
    stack.innerHTML = '';

    if (hiddenStateMemory.length === 0) {
        stack.innerHTML = '<div class="text-center text-slate-400 italic mt-10 text-sm">Backpack is empty</div>';
        return;
    }

    hiddenStateMemory.forEach((word, index) => {
        // The Vanishing Gradient / Squishy Backpack Math
        // As index gets larger (older words), opacity drops, scale shrinks.

        // Opacity drops significantly after a few words
        let opacity = Math.max(0.1, 1 - (index * 0.15));
        let scale = Math.max(0.7, 1 - (index * 0.05));
        let blur = Math.min(2, index * 0.3); // add slight blur to old memories

        const wordDiv = document.createElement('div');
        wordDiv.className = "memory-word bg-pink-100 text-pink-800 font-bold py-2 px-4 rounded-lg border border-pink-200 text-center shadow-sm w-full";

        // Emphasize the newest word
        if (index === 0) {
            wordDiv.classList.add('border-2', 'border-pink-400', 'animate-pop');
            wordDiv.innerHTML = `"${word}" <span class="text-xs font-normal opacity-70 block">(Newest)</span>`;
        } else {
            wordDiv.innerText = `"${word}"`;
        }

        wordDiv.style.opacity = opacity;
        wordDiv.style.transform = `scale(${scale})`;
        wordDiv.style.filter = `blur(${blur}px)`;

        // If it's too squished, mark it visually
        if (opacity <= 0.25) {
            wordDiv.innerHTML = `<span class="line-through">"${word}"</span> <span class="text-[10px]">(squished)</span>`;
        }

        stack.appendChild(wordDiv);
    });
}

function resetStory() {
    hiddenStateMemory = [];
    document.getElementById('current-input-display').innerText = '...';
    document.getElementById('brain-processing').innerText = 'Waiting for words...';
    document.getElementById('current-output-display').innerText = 'Understanding...';
    renderBackpack();
}

// Init on load
window.onload = () => {
    updateUI();
    initWordButtons();

    // Initialize KaTeX to parse and render equations matching '$...$'
    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
};