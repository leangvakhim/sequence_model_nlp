// <!-- Application Logic (Integrated into the file) -->
const stepsData = [
    {
        title: "The Core Problem",
        desc: "Standard Recurrent Neural Networks (RNNs) suffer from <strong>Short-Term Memory</strong>. When processing long sentences or sequences, they encounter the <em>vanishing gradient problem</em>, causing them to forget early information. <br><br><strong>LSTMs</strong> (1997) and <strong>GRUs</strong> (2014) solve this using mechanisms called <strong>Gates</strong>. Gates act like valves, learning precisely what information to keep, what to discard, and what to output.",
        diagram: "intro",
        highlights: [],
        equation: ""
    },
    {
        title: "1. Inside a GRU: The Reset Gate",
        desc: "Let's look at the newer, simpler architecture first: The <strong>GRU (Gated Recurrent Unit)</strong>.<br><br>The first mechanism is the <strong>Reset Gate (r<sub>t</sub>)</strong>. It looks at the previous hidden state (h<sub>t-1</sub>) and the current input (x<sub>t</sub>), applies a Sigmoid function (squashing values between 0 and 1), and decides <em>how much of the past memory to forget</em>.",
        diagram: "gru",
        highlights: ["gru-reset", "gru-ht-prev", "gru-xt"],
        equation: "r<sub>t</sub> = σ(W<sub>r</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>r</sub>)"
    },
    {
        title: "2. GRU: Candidate & Update Gate",
        desc: "Next, we create a <strong>Candidate Memory (h̃<sub>t</sub>)</strong>. Notice that the Reset Gate multiplies the past state before creating the candidate. <br><br>Simultaneously, the <strong>Update Gate (z<sub>t</sub>)</strong> decides how much of the <em>old memory</em> to keep versus how much of this <em>new candidate memory</em> to accept.",
        diagram: "gru",
        highlights: ["gru-cand", "gru-update", "gru-reset"],
        equation: `
            z<sub>t</sub> = σ(W<sub>z</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>z</sub>)<br><br>
            h̃<sub>t</sub> = tanh(W<sub>h</sub> &middot; [r<sub>t</sub> &lowast; h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>h</sub>)
        `
    },
    {
        title: "3. GRU: Final Hidden State",
        desc: "Finally, we calculate the new <strong>Hidden State (h<sub>t</sub>)</strong>. <br><br>This is a smooth interpolation controlled by the Update Gate (z<sub>t</sub>). If z<sub>t</sub> is close to 1, we keep the old state. If it's close to 0, we replace it entirely with the new Candidate state. This hidden state is then passed to the next step in the sequence.",
        diagram: "gru",
        highlights: ["gru-ht", "gru-op-blend", "gru-update"],
        equation: "h<sub>t</sub> = (1 - z<sub>t</sub>) &lowast; h<sub>t-1</sub> + z<sub>t</sub> &lowast; h̃<sub>t</sub>"
    },
    {
        title: "4. Inside an LSTM: Forget Gate",
        desc: "Now let's look at the <strong>LSTM (Long Short-Term Memory)</strong>. It splits memory into two paths: The short-term <strong>Hidden State (h)</strong> and the long-term conveyor belt, the <strong>Cell State (C)</strong>.<br><br>The first step is the <strong>Forget Gate (f<sub>t</sub>)</strong>. It looks at the inputs and outputs a number between 0 and 1 for each number in the Cell State. 0 means 'completely forget this', 1 means 'keep it'.",
        diagram: "lstm",
        highlights: ["lstm-forget", "lstm-ct-prev", "lstm-op-forget", "lstm-ht-prev", "lstm-xt"],
        equation: "f<sub>t</sub> = σ(W<sub>f</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)"
    },
    {
        title: "5. LSTM: Input Gate & Cell Update",
        desc: "Next, we write new data to the long-term memory. The <strong>Input Gate (i<sub>t</sub>)</strong> decides which values we'll update. A <strong>Candidate (C̃<sub>t</sub>)</strong> creates a vector of new possible values.<br><br>We multiply them together and add (⊕) them to the main Cell State. The long-term memory is now updated!",
        diagram: "lstm",
        highlights: ["lstm-input", "lstm-cand", "lstm-op-input", "lstm-ct"],
        equation: `
            i<sub>t</sub> = σ(W<sub>i</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>)<br><br>
            C<sub>t</sub> = f<sub>t</sub> &lowast; C<sub>t-1</sub> + i<sub>t</sub> &lowast; C̃<sub>t</sub>
        `
    },
    {
        title: "6. LSTM: Output Gate",
        desc: "Finally, we decide what to output as the new short-term <strong>Hidden State (h<sub>t</sub>)</strong>. <br><br>We pass the newly updated Cell State through a tanh function (pushing values between -1 and 1) and multiply it by the <strong>Output Gate (o<sub>t</sub>)</strong>, which decides what parts of the long-term memory are relevant right now.",
        diagram: "lstm",
        highlights: ["lstm-output", "lstm-op-hidden", "lstm-ht", "lstm-ct"],
        equation: `
            o<sub>t</sub> = σ(W<sub>o</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>)<br><br>
            h<sub>t</sub> = o<sub>t</sub> &lowast; tanh(C<sub>t</sub>)
        `
    },
    {
        title: "7. Equations Summary",
        desc: "Here is the complete mathematical overview of both architectures.<br><br><strong>Key Difference:</strong> LSTMs control memory via two separate states (Cell and Hidden) and three gates. GRUs merge them into one Hidden state and use only two gates. GRUs are computationally cheaper and perform similarly to LSTMs on many tasks, though LSTMs are sometimes preferred for highly complex sequence modeling.",
        diagram: "summary",
        highlights: [],
        equation: ""
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-description');
const counterEl = document.getElementById('step-counter');
const progressEl = document.getElementById('progress-bar');
const mathContainer = document.getElementById('math-container');
const mathContent = document.getElementById('math-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const contentContainer = document.getElementById('content-container');

const diagrams = {
    intro: document.getElementById('diagram-intro'),
    gru: document.getElementById('diagram-gru'),
    lstm: document.getElementById('diagram-lstm'),
    summary: document.getElementById('diagram-summary')
};

// All possible nodes that can be highlighted
const allNodes = [
    // GRU Nodes
    'gru-ht', 'gru-op-blend', 'gru-cand', 'gru-update', 'gru-reset', 'gru-ht-prev', 'gru-xt',
    // LSTM Nodes
    'lstm-ct-prev', 'lstm-op-forget', 'lstm-op-input', 'lstm-ct', 'lstm-forget', 'lstm-input',
    'lstm-cand', 'lstm-output', 'lstm-ht-prev', 'lstm-xt', 'lstm-op-hidden', 'lstm-ht'
];

function updateUI() {
    const stepData = stepsData[currentStep];

    // Update Progress
    counterEl.textContent = `Step ${currentStep + 1} of ${stepsData.length}`;
    progressEl.style.width = `${((currentStep + 1) / stepsData.length) * 100}%`;

    // Fade out content, update, fade in
    contentContainer.style.opacity = '0';

    setTimeout(() => {
        titleEl.innerHTML = stepData.title;
        descEl.innerHTML = stepData.desc;

        if (stepData.equation) {
            mathContent.innerHTML = stepData.equation;
            mathContainer.classList.remove('hidden');
            // slight delay for smooth math fade in
            setTimeout(() => mathContainer.classList.remove('opacity-0'), 50);
        } else {
            mathContainer.classList.add('opacity-0');
            setTimeout(() => mathContainer.classList.add('hidden'), 300);
        }

        contentContainer.style.opacity = '1';

        // Scroll the left panel back to the top automatically on step change
        document.querySelector('.overflow-y-auto').scrollTop = 0;
    }, 300);

    // Handle Diagrams View Toggling
    Object.keys(diagrams).forEach(key => {
        if (key === stepData.diagram) {
            diagrams[key].classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            diagrams[key].classList.add('opacity-100', 'scale-100', 'z-10');
            diagrams[key].classList.remove('z-0');
        } else {
            diagrams[key].classList.add('opacity-0', 'pointer-events-none', 'scale-95', 'z-0');
            diagrams[key].classList.remove('opacity-100', 'scale-100', 'z-10');
        }
    });

    // Handle Highlighting specific nodes within active diagrams
    if (stepData.diagram === 'gru' || stepData.diagram === 'lstm') {
        allNodes.forEach(nodeId => {
            const el = document.getElementById(nodeId);
            if (el) {
                // Reset classes
                el.classList.remove('active-node', 'inactive-node');

                // Apply appropriate class based on highlights array
                if (stepData.highlights.length === 0 || stepData.highlights.includes(nodeId)) {
                    el.classList.add('active-node');
                } else {
                    el.classList.add('inactive-node');
                }
            }
        });
    }

    // Button States
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === stepsData.length - 1;
}

// Event Listeners
btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

btnNext.addEventListener('click', () => {
    if (currentStep < stepsData.length - 1) {
        currentStep++;
        updateUI();
    }
});

// Initialize first frame
updateUI();