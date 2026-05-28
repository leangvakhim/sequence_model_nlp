// --- Data Definitions for each Step ---
const steps = [
    {
        id: 1,
        title: "1. The Playroom Analogy",
        description: "Imagine you are organizing a giant playroom. You wouldn't just throw things everywhere; you'd group them. Stuffed animals together, vehicles together, and play food in another spot. If someone hands you a new toy a stuffed dog you know exactly where it goes: right next to the stuffed cat!",
        showAxes: false,
        showPlayroom: true,
        nodes: [
            { id: 'cat', icon: '🐱', label: 'Cat', x: 16, y: 50 },
            { id: 'dog', icon: '🐶', label: 'Dog', x: 16, y: 70 },
            { id: 'car', icon: '🚗', label: 'Car', x: 50, y: 50 },
            { id: 'truck', icon: '🚚', label: 'Truck', x: 50, y: 70 },
            { id: 'apple', icon: '🍎', label: 'Apple', x: 83, y: 50 },
        ],
        lines: [],
        html: ""
    },
    {
        id: 2,
        title: "2. The Invisible Map (Coordinates)",
        description: "Computers have to organize words just like this. But computers only understand numbers. So, they score words on secret, invisible traits. Imagine scoring words on two traits: <strong>How fluffy is it?</strong> and <strong>How much of a pet is it?</strong>",
        showAxes: true,
        showPlayroom: false,
        nodes: [
            { id: 'cat', icon: '🐱', label: 'Cat [0.82, 0.55]', x: 85, y: 30 },
            { id: 'dog', icon: '🐶', label: 'Dog [0.79, 0.61]', x: 80, y: 20 },
            { id: 'car', icon: '🚗', label: 'Car [-0.80, -0.10]', x: 15, y: 70 },
            { id: 'truck', icon: '🚚', label: 'Truck', x: -100, y: -100, hidden: true }, // move offscreen
            { id: 'apple', icon: '🍎', label: 'Apple', x: -100, y: -100, hidden: true }
        ],
        lines: [],
        html: ""
    },
    {
        id: 3,
        title: "3. What is a Dense Vector?",
        description: "In reality, the computer doesn't just use 2 traits; it uses hundreds of them! This long list of numbers is a <strong>Dense Vector</strong>. It gave 'cat' a list, and 'dog' an almost identical list. Because the numbers are almost the same, their 'addresses' put them right next to each other on the map.",
        showAxes: false,
        showPlayroom: false,
        nodes: [
            { id: 'cat', icon: '🐱', label: 'Cat', x: 20, y: 40, hidden: true },
            { id: 'dog', icon: '🐶', label: 'Dog', x: 20, y: 60, hidden: true },
            { id: 'car', icon: '🚗', label: 'Car', x: 20, y: 80, hidden: true },
        ],
        lines: [],
        html: `
            <div class="bg-white p-8 rounded-xl shadow-2xl border border-slate-200 fade-in w-full max-w-2xl">
                <h3 class="text-xl font-bold mb-6 text-center text-slate-700">The Computer's Secret Lists (Dense Vectors)</h3>
                <div class="space-y-6 font-mono text-lg">
                    <div class="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                        <span class="text-3xl">🐱</span>
                        <span class="text-blue-800 font-bold w-12">Cat:</span>
                        <span class="text-blue-600">[ <span class="bg-yellow-200">0.82</span>, <span class="bg-yellow-200">-0.14</span>, <span class="bg-yellow-200">0.55</span>, 0.03, ... ]</span>
                    </div>
                    <div class="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                        <span class="text-3xl">🐶</span>
                        <span class="text-blue-800 font-bold w-12">Dog:</span>
                        <span class="text-blue-600">[ <span class="bg-yellow-200">0.79</span>, <span class="bg-yellow-200">-0.11</span>, <span class="bg-yellow-200">0.61</span>, 0.08, ... ]</span>
                    </div>
                    <div class="flex items-center gap-4 bg-slate-100 p-4 rounded-lg opacity-60">
                        <span class="text-3xl">🚗</span>
                        <span class="text-slate-800 font-bold w-12">Car:</span>
                        <span class="text-slate-600">[ -0.80, 0.44, -0.10, -0.92, ... ]</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 4,
        title: "Step 1: The Random Guess",
        description: "But how does the computer find these numbers? When it first wakes up, it hasn't read any books. It does exactly what you'd do if asked to organize a playroom blindfolded: it throws toys everywhere. It assigns <strong>completely random numbers</strong>. Cat and Car might accidentally end up together!",
        showAxes: true,
        showPlayroom: false,
        nodes: [
            // Random positions!
            { id: 'cat', icon: '🐱', label: 'Cat', x: 25, y: 25, hidden: false },
            { id: 'car', icon: '🚗', label: 'Car', x: 45, y: 40, hidden: false },
            { id: 'dog', icon: '🐶', label: 'Dog', x: 80, y: 80, hidden: false },
            { id: 'leash', icon: '🦮', label: 'leash', x: 15, y: 65, hidden: false },
            { id: 'walk', icon: '🚶', label: 'walk', x: 45, y: 85, hidden: false },
            { id: 'fluffy', icon: '☁️', label: 'fluffy', x: 25, y: 90, hidden: false }
        ],
        lines: [],
        html: ""
    },
    {
        id: 5,
        title: "Step 2: The Fill-in-the-Blank Game",
        description: "Next, we feed the computer millions of books to read. As it reads, it plays a giant game of 'fill in the blank'. It reads: <em>'I put a leash on my fluffy and took it for a walk.'</em> It looks at its random map, sees 'Car' is closest to those words, and guesses 'Car'!",
        showAxes: true,
        showPlayroom: false,
        nodes: [
            { id: 'cat', icon: '🐱', label: 'Cat', x: 25, y: 25 },
            { id: 'car', icon: '🚗', label: 'Car', x: 45, y: 40 },
            { id: 'dog', icon: '🐶', label: 'Dog', x: 80, y: 80 },
            { id: 'leash', icon: '🦮', label: 'leash', x: 15, y: 65 },
            { id: 'walk', icon: '🚶', label: 'walk', x: 45, y: 85 },
            { id: 'fluffy', icon: '☁️', label: 'fluffy', x: 25, y: 90 }
        ],
        lines: [
            { from: 'leash', to: 'car', color: 'red', bad: true },
            { from: 'fluffy', to: 'car', color: 'red', bad: true },
            { from: 'walk', to: 'car', color: 'red', bad: true }
        ],
        html: `
            <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 px-6 py-4 rounded-xl shadow-lg border border-red-200 text-center max-w-[90%] md:max-w-2xl fade-in z-30">
                <p class="text-xl font-medium text-slate-700 leading-relaxed">"I put a <span class="text-blue-600 font-bold mx-1">leash</span> on my <span class="text-blue-600 font-bold mx-1">fluffy</span> <span class="mx-3 font-bold text-slate-400">______</span> and took it for a <span class="text-blue-600 font-bold mx-1">walk</span>."</p>
                <p class="text-red-500 font-bold mt-2 animate-pulse">Computer Guesses: 🚗 "Car" (Because it's close!)</p>
            </div>
        `
    },
    {
        id: 6,
        title: "Step 3: The Calculation (Learning from Mistakes)",
        description: "We tell the computer, 'No, silly! You can't put a leash on a car. It was dog!' The computer then does a tiny math calculation to fix its mistake. It physically updates the numbers: moving 'Car' far away, and moving 'Dog' much closer to words like 'leash' and 'walk'.",
        showAxes: true,
        showPlayroom: false,
        nodes: [
            { id: 'cat', icon: '🐱', label: 'Cat', x: 25, y: 25 },
            { id: 'car', icon: '🚗', label: 'Car', x: 85, y: 15 }, // Moved far away
            { id: 'dog', icon: '🐶', label: 'Dog', x: 30, y: 75 }, // Moved closer to context
            { id: 'leash', icon: '🦮', label: 'leash', x: 15, y: 65 },
            { id: 'walk', icon: '🚶', label: 'walk', x: 45, y: 85 },
            { id: 'fluffy', icon: '☁️', label: 'fluffy', x: 25, y: 90 }
        ],
        lines: [
            { from: 'leash', to: 'dog', color: 'green', bad: false },
            { from: 'fluffy', to: 'dog', color: 'green', bad: false },
            { from: 'walk', to: 'dog', color: 'green', bad: false }
        ],
        html: `
            <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 px-6 py-4 rounded-xl shadow-lg border border-green-200 text-center max-w-[90%] md:max-w-2xl fade-in z-30">
                <p class="text-xl font-medium text-slate-700 leading-relaxed">"I put a <span class="text-blue-600 font-bold mx-1">leash</span> on my <span class="text-blue-600 font-bold mx-1">fluffy</span> <span class="mx-3 font-bold text-slate-400">______</span> and took it for a <span class="text-blue-600 font-bold mx-1">walk</span>."</p>
                <p class="text-green-600 font-bold mt-2">Correction Math: Pushing 'Car' away, pulling 'Dog' closer!</p>
            </div>
        `
    },
    {
        id: 7,
        title: "The Final Result",
        description: "The computer does this tiny math calculation millions of times, for every word in the dictionary, reading sentence after sentence. By the end, the numbers are no longer random. Words that mean similar things form perfect clusters in the computer's brain!",
        showAxes: true,
        showPlayroom: false,
        nodes: [
            // Cluster 1: Pets
            { id: 'cat', icon: '🐱', label: 'Cat [0.82, 0.55]', x: 70, y: 20 },
            { id: 'dog', icon: '🐶', label: 'Dog [0.79, 0.61]', x: 85, y: 35 },
            { id: 'fluffy', icon: '☁️', label: 'fluffy', x: 90, y: 15 },

            // Cluster 2: Vehicles
            { id: 'car', icon: '🚗', label: 'Car [-0.80, -0.10]', x: 15, y: 70 },
            { id: 'truck', icon: '🚚', label: 'Truck [-0.85, -0.15]', x: 25, y: 85, hidden: false },

            // Cluster 3: Walking/Action
            { id: 'walk', icon: '🚶', label: 'walk', x: 45, y: 65 },
            { id: 'leash', icon: '🦮', label: 'leash', x: 60, y: 80 },
            { id: 'apple', icon: '🍎', label: 'Apple', x: 15, y: 20, hidden: false } // Food corner
        ],
        lines: [],
        html: `
            <div class="absolute bottom-8 right-8 bg-green-100 text-green-800 px-6 py-4 rounded-xl shadow-lg border border-green-300 w-max fade-in z-30 font-bold">
                🎉 Learning Complete!
            </div>
        `
    }
];

let currentStepIndex = 0;

// --- DOM Elements ---
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-description');
const stepCounter = document.getElementById('step-counter');
const nodesContainer = document.getElementById('nodes-container');
const dotsContainer = document.getElementById('dots-container');
const axes = document.getElementById('axes');
const playroomZones = document.getElementById('playroom-zones');
const svgLayer = document.getElementById('svg-layer');
const htmlContainer = document.getElementById('dynamic-html-container');

// --- Initialization ---
function init() {
    // Generate progress dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${index === 0 ? 'bg-blue-600' : 'bg-slate-300'}`;
        dot.id = `dot-${index}`;
        dotsContainer.appendChild(dot);
    });

    // Initialize all possible nodes invisibly
    const allUniqueNodes = new Map();
    steps.forEach(step => {
        step.nodes.forEach(n => {
            if (!allUniqueNodes.has(n.id)) allUniqueNodes.set(n.id, n);
        });
    });

    allUniqueNodes.forEach(node => {
        const el = document.createElement('div');
        el.id = `node-${node.id}`;
        // Start hidden in the center
        el.className = `absolute transform -translate-x-1/2 -translate-y-1/2 node-transition flex flex-col items-center opacity-0 scale-50 pointer-events-none`;
        el.style.left = `50%`;
        el.style.top = `50%`;

        el.innerHTML = `
            <div class="text-4xl filter drop-shadow-md bg-white rounded-full p-2 shadow-sm border border-slate-100">${node.icon}</div>
            <div class="mt-1 font-semibold text-slate-700 bg-white/80 px-2 py-0.5 rounded text-sm whitespace-nowrap label-text shadow-sm">${node.label}</div>
        `;
        nodesContainer.appendChild(el);
    });

    renderStep(currentStepIndex);

    // Event Listeners
    btnNext.addEventListener('click', () => {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            renderStep(currentStepIndex);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderStep(currentStepIndex);
        }
    });
}

// --- Rendering Logic ---
function renderStep(index) {
    const step = steps[index];

    // Update Text & UI
    stepTitle.innerHTML = step.title;
    stepDesc.innerHTML = step.description;
    stepCounter.innerText = `Step ${index + 1} / ${steps.length}`;

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === steps.length - 1;

    if (index === steps.length - 1) {
        btnNext.classList.add('hidden');
    } else {
        btnNext.classList.remove('hidden');
    }

    // Update Progress Dots
    steps.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (i === index) {
            dot.className = 'w-3 h-3 rounded-full transition-colors bg-blue-600 scale-125';
        } else if (i < index) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors bg-blue-400';
        } else {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors bg-slate-300';
        }
    });

    // Update Background Layouts
    if (step.showAxes) {
        axes.classList.remove('hidden');
        setTimeout(() => axes.classList.remove('opacity-0'), 50);
    } else {
        axes.classList.add('opacity-0');
        setTimeout(() => axes.classList.add('hidden'), 1000);
    }

    if (step.showPlayroom) {
        playroomZones.classList.remove('hidden');
        setTimeout(() => playroomZones.classList.remove('opacity-0'), 50);
    } else {
        playroomZones.classList.add('opacity-0');
        setTimeout(() => playroomZones.classList.add('hidden'), 1000);
    }

    // Update HTML Overlays
    htmlContainer.innerHTML = step.html;

    // Move Nodes
    // First, hide all nodes
    const allNodes = document.querySelectorAll('#nodes-container > div');
    allNodes.forEach(nodeEl => {
        nodeEl.style.opacity = '0';
        nodeEl.style.transform = `translate(-50%, -50%) scale(0.5)`;
    });

    // Then, show and position the nodes for this step
    step.nodes.forEach(nodeData => {
        if (nodeData.hidden) return;

        const el = document.getElementById(`node-${nodeData.id}`);
        if (el) {
            el.style.left = `${nodeData.x}%`;
            el.style.top = `${nodeData.y}%`;
            el.style.opacity = '1';
            el.style.transform = `translate(-50%, -50%) scale(1)`;

            // Update label if it changed (e.g. adding vectors)
            const labelEl = el.querySelector('.label-text');
            if (labelEl) labelEl.innerHTML = nodeData.label;
        }
    });

    // Draw Lines
    drawLines(step.lines, step.nodes);
}

function drawLines(linesConfig, nodesData) {
    svgLayer.innerHTML = ''; // clear old lines

    // Short delay to let nodes start moving before drawing lines
    setTimeout(() => {
        linesConfig.forEach(lineConfig => {
            const fromNode = nodesData.find(n => n.id === lineConfig.from);
            const toNode = nodesData.find(n => n.id === lineConfig.to);

            if (fromNode && toNode) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                // Use percentage directly in SVG
                line.setAttribute('x1', `${fromNode.x}%`);
                line.setAttribute('y1', `${fromNode.y}%`);
                line.setAttribute('x2', `${toNode.x}%`);
                line.setAttribute('y2', `${toNode.y}%`);

                const colorClass = lineConfig.bad ? 'stroke-red-500' : 'stroke-green-500';
                line.setAttribute('class', `${colorClass} stroke-2 animate-pulse fade-in`);
                line.setAttribute('stroke-dasharray', '8,8');

                svgLayer.appendChild(line);
            }
        });
    }, 500); // Draw lines halfway through node animation
}

// Run
window.onload = init;