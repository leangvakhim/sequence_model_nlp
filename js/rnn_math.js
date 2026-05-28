// Data containing every step of the explanation and mathematical breakdown
const steps = [
    {
        title: "1. The Concept",
        desc: "Imagine you are building a smart robot that reads a story one word at a time. To understand the story, the robot needs to combine <strong>what it is reading right now</strong> with <strong>what it remembers from before</strong>.<br><br>Let's break down the math using a real-world example: <strong>Playing a video game and keeping track of your character's energy.</strong>",
        formula: "$$\\text{Memory} + \\text{New Event} \\rightarrow \\text{New Action}$$",
        activeNodes: ['node-h_prev', 'node-x_t', 'node-cell', 'node-h_t', 'node-y_t'], // Base nodes visible
        values: {} // Keep defaults
    },
    {
        title: "2. The Memory Equation",
        desc: "This equation simply asks: <em>\"What is my new energy level right now?\"</em><br><br><ul class='list-disc pl-5 space-y-1 mt-2 text-base'><li><strong>$x_t$</strong>: Current Input (You collected a magic apple!)</li><li><strong>$h_{t-1}$</strong>: Past Memory (Energy from the last level)</li><li><strong>$W_{xh}, W_{hh}$</strong>: The \"Rules of the Game\" (How important inputs/memories are)</li><li><strong>$b_h$</strong>: A Free Bonus! (Tiny free energy just for playing)</li><li><strong>$\\tanh$</strong>: The Squasher (Keeps score safely between -1 and 1)</li></ul>",
        formula: "$$h_t = \\tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)$$",
        activeNodes: ['node-h_prev', 'node-x_t', 'node-cell', 'node-h_t', 'node-sum', 'node-tanh', 'node-w_xh', 'node-w_hh', 'node-b_h'],
        values: {}
    },
    {
        title: "3. The Output Equation",
        desc: "Now that we have our new memory, this second equation asks: <em>\"Based on my new energy level, what should I do on the screen?\"</em><br><br><ul class='list-disc pl-5 space-y-1 mt-2 text-base'><li><strong>$y_t$</strong>: Output Action (like jumping really high)</li><li><strong>$W_{hy}$</strong>: Output Weight (The rule that turns energy into an action)</li><li><strong>$b_y$</strong>: Output Bias (Another tiny final bonus)</li></ul>",
        formula: "$$y_t = W_{hy}h_t + b_y$$",
        activeNodes: ['node-h_t', 'node-y_t', 'node-w_hy', 'node-b_y'],
        values: {}
    },
    {
        title: "4. Setting the Scene",
        desc: "Let's plug in some simple numbers!<br><br><strong>Our Video Game Scenario:</strong><br><ul class='list-disc pl-5 space-y-1 mt-2'><li>Apple value: <strong>$x_t = 2$</strong></li><li>Old energy: <strong>$h_{t-1} = 1$</strong></li><li>Apple rule multiplier: <strong>$W_{xh} = 0.5$</strong></li><li>Keep old energy rule: <strong>$W_{hh} = 0.8$</strong></li><li>Free level bonus: <strong>$b_h = 0.1$</strong></li></ul>",
        formula: "$$h_t = \\tanh(0.8(1) + 0.5(2) + 0.1)$$",
        activeNodes: ['node-x_t', 'node-h_prev', 'node-w_xh', 'node-w_hh', 'node-b_h'],
        values: {
            'val-x_t': '2',
            'val-h_prev': '1',
            'val-w_xh': '0.5',
            'val-w_hh': '0.8',
            'val-b_h': '0.1'
        }
    },
    {
        title: "5. Step 1: Calculate the Input",
        desc: "First, multiply the apple you collected by its rule to see how much new energy it brings in.<br><br><strong>Formula:</strong> $x_t \\times W_{xh}$<br><strong>Calculation:</strong> 2 * 0.5 = <strong>1.0</strong>",
        formula: "$$x_t W_{xh} = 2 \\times 0.5 = 1.0$$",
        activeNodes: ['node-x_t', 'node-w_xh', 'node-sum'],
        values: {
            'val-x_t': '2', 'val-w_xh': '0.5', 'val-h_prev': '1', 'val-w_hh': '0.8', 'val-b_h': '0.1'
        }
    },
    {
        title: "6. Step 2: Calculate Past Memory",
        desc: "Next, figure out how much of your old energy carries over by multiplying it by its rule.<br><br><strong>Formula:</strong> $h_{t-1} \\times W_{hh}$<br><strong>Calculation:</strong> 1 * 0.8 = <strong>0.8</strong>",
        formula: "$$h_{t-1} W_{hh} = 1 \\times 0.8 = 0.8$$",
        activeNodes: ['node-h_prev', 'node-w_hh', 'node-sum'],
        values: {
            'val-x_t': '2', 'val-w_xh': '0.5', 'val-h_prev': '1', 'val-w_hh': '0.8', 'val-b_h': '0.1'
        }
    },
    {
        title: "7. Step 3: Add Them Up (Summation)",
        desc: "Now, add the new input energy, the past memory energy, and the free level bonus together inside the $\\Sigma$ node.<br><br><strong>Calculation:</strong><br>1.0 (Input) + 0.8 (Memory) + 0.1 (Bonus) = <strong>1.9</strong>",
        formula: "$$\\Sigma = 1.0 + 0.8 + 0.1 = 1.9$$",
        activeNodes: ['node-sum', 'node-b_h'],
        values: {
            'val-x_t': '2', 'val-w_xh': '0.5', 'val-h_prev': '1', 'val-w_hh': '0.8', 'val-b_h': '0.1'
        }
    },
    {
        title: "8. Step 4: The Magic Squasher",
        desc: "If we kept collecting apples, energy would get too high and break the game! We push our sum (1.9) through the $\\tanh$ function to squash it between -1 and 1.<br><br>$\\tanh(1.9)$ is approximately <strong>0.95</strong>.<br><br>This becomes our brand new memory!",
        formula: "$$h_t = \\tanh(1.9) \\approx 0.95$$",
        activeNodes: ['node-tanh', 'node-h_t'],
        values: {
            'val-x_t': '2', 'val-w_xh': '0.5', 'val-h_prev': '1', 'val-w_hh': '0.8', 'val-b_h': '0.1',
            'val-tanh': '$\\tanh(1.9)$',
            'val-h_t': '0.95'
        }
    },
    {
        title: "9. Step 5: Final Action Output",
        desc: "Now we determine what the character does! Let's say the output rule is <strong>$W_{hy} = 2.0$</strong> and the final bonus is <strong>$b_y = 0.5$</strong>.<br><br>Multiply your new squashed memory by the rule, and add the bonus:<br>(0.95 * 2.0) + 0.5 = 1.9 + 0.5 = <strong>2.4</strong><br><br><strong>Your robot performs an action with a power level of 2.4!</strong>",
        formula: "$$y_t = (0.95 \\times 2.0) + 0.5 = 2.4$$",
        activeNodes: ['node-h_t', 'node-w_hy', 'node-b_y', 'node-y_t'],
        values: {
            'val-x_t': '2', 'val-w_xh': '0.5', 'val-h_prev': '1', 'val-w_hh': '0.8', 'val-b_h': '0.1', 'val-tanh': '$\\tanh(1.9)$', 'val-h_t': '0.95',
            'val-w_hy': '2.0',
            'val-b_y': '0.5',
            'val-y_t': '2.4'
        }
    }
];

let currentStep = 0;

// List of all updatable diagram nodes to manage states easily
const allNodes = [
    'node-x_t', 'node-h_prev', 'node-w_xh', 'node-w_hh', 'node-sum',
    'node-b_h', 'node-tanh', 'node-h_t', 'node-w_hy', 'node-b_y', 'node-y_t', 'node-cell'
];

// Default symbols to revert to if a value isn't specified in the step
const defaultValues = {
    'val-x_t': '$x_t$',
    'val-h_prev': '$h_{t-1}$',
    'val-w_xh': '$W_{xh}$',
    'val-w_hh': '$W_{hh}$',
    'val-b_h': '$b_h$',
    'val-tanh': '$\\tanh()$',
    'val-h_t': '$h_t$',
    'val-w_hy': '$W_{hy}$',
    'val-b_y': '$b_y$',
    'val-y_t': '$y_t$'
};

function renderMath() {
    // Render Math in the text panel
    renderMathInElement(document.getElementById('text-panel'), {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
        ],
        throwOnError: false
    });
    // Render Math in the diagram panel
    renderMathInElement(document.getElementById('diagram-panel'), {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
        ],
        throwOnError: false
    });
}

function updateUI() {
    const step = steps[currentStep];

    // 1. Update text content
    document.getElementById('step-title').innerHTML = step.title;
    document.getElementById('step-desc').innerHTML = step.desc;
    document.getElementById('step-formula').innerHTML = step.formula;

    // 2. Update diagram values
    for (const [id, defaultVal] of Object.entries(defaultValues)) {
        const displayVal = step.values && step.values[id] ? `$${step.values[id]}$` : defaultVal;
        document.getElementById(id).innerHTML = displayVal;
    }

    // 3. Render all KaTeX math equations
    renderMath();

    // 4. Update Node Visual States (Highlighting)
    allNodes.forEach(nodeId => {
        const el = document.getElementById(nodeId);
        if (el) {
            if (step.activeNodes.includes(nodeId)) {
                el.classList.remove('inactive-node');
                // Add extra pop to primary nodes if they are strictly active in calculation steps
                if (currentStep > 3 && nodeId !== 'node-cell') {
                    el.classList.add('active-node');
                } else {
                    el.classList.remove('active-node');
                }
            } else {
                el.classList.add('inactive-node');
                el.classList.remove('active-node');
            }
        }
    });

    // 5. Update Navigation UI
    document.getElementById('btn-back').disabled = currentStep === 0;

    const btnNext = document.getElementById('btn-next');
    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = 'Finish <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        btnNext.disabled = true; // or reset logic
    } else {
        btnNext.innerHTML = 'Next Step <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
        btnNext.disabled = false;
    }

    document.getElementById('step-indicator').innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // 6. Update Progress Bar
    const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;
    updateUI();
}

// Initialize on load
window.onload = () => {
    // Wait for KaTeX to be ready
    setTimeout(updateUI, 100);
};