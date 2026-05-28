// <!-- JavaScript Logic -->
// --- Step Data Configuration ---
const steps = [
    {
        title: "1. The Need for Memory",
        text: "<p>Standard neural networks treat inputs completely independently. They don't remember what happened previously.</p><p class='mt-3'>But in <strong>Sequence Models</strong> (like reading a sentence or predicting the stock market), context matters. We need a network that can 'remember' the past to understand the present.</p>",
        visual: `
            <div class="flex flex-col items-center w-full">
                <p class="text-sm text-slate-400 mb-6 font-semibold uppercase tracking-wider">Reading a Sequence</p>
                <div class="flex items-center space-x-3 sm:space-x-6 text-xl sm:text-2xl font-bold text-indigo-900">
                    <span class="seq-animate bg-indigo-100 px-4 py-2 rounded-lg shadow-sm">I</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="seq-animate seq-delay-1 bg-indigo-100 px-4 py-2 rounded-lg shadow-sm">love</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="seq-animate seq-delay-2 bg-indigo-100 px-4 py-2 rounded-lg shadow-sm">apples</span>
                </div>
                <p class="text-sm text-slate-500 mt-8 text-center px-4">To predict the word after "love", the network MUST remember the word "I".</p>
            </div>
        `
    },
    {
        title: "2. The RNN Loop",
        text: "<p>An RNN introduces a <strong>loop</strong>. Instead of just passing inputs to outputs, it passes its own output (from the previous step) back into itself along with the new input.</p><p class='mt-3'>This internal loop acts as the network's <strong>Memory</strong> (called the <em>Hidden State</em>).</p>",
        // Adding routing information for Step 2 of 5
        route: {
            text: "Hidden State Visualization &rarr;",
            url: "./hidden_state_visualization.html" // Change this to your actual file routing
        },
        visual: `
            <div class="flex flex-col items-center relative">
                <!-- Simple Node SVG -->
                <svg width="500" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Input arrow -->
                    <path d="M100 180 V 130" stroke="#64748b" stroke-width="4" marker-end="url(#arrow)"/>
                    <text x="110" y="165" fill="#475569" font-family="sans-serif" font-weight="bold">Input (x)</text>

                    <!-- Output arrow -->
                    <path d="M100 70 V 20" stroke="#64748b" stroke-width="4" marker-end="url(#arrow)"/>
                    <text x="110" y="45" fill="#475569" font-family="sans-serif" font-weight="bold">Output (y)</text>

                    <!-- RNN Cell -->
                    <rect x="60" y="70" width="80" height="60" rx="12" fill="#4f46e5" stroke="#312e81" stroke-width="2"/>
                    <text x="100" y="105" fill="white" font-family="sans-serif" font-weight="bold" text-anchor="middle">RNN</text>

                    <!-- The Loop -->
                    <path d="M 140 100 C 210 100, 210 50, 140 75" stroke="#ec4899" stroke-width="4" fill="transparent" marker-end="url(#arrowPink)"/>
                    <text x="150" y="60" fill="#db2777" font-family="sans-serif" font-weight="bold" font-size="12">Memory Loop</text>

                    <!-- Defs for arrows -->
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                        <marker id="arrowPink" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                        </marker>
                    </defs>
                </svg>
            </div>
        `
    },
    {
        title: "3. Unrolling in Time",
        text: "<p>To understand how it processes a sequence, we visually <strong>'unroll'</strong> the loop across time steps ($t$).</p><p class='mt-3'>At each step, the cell takes the current input ($x_t$) AND the previous hidden state ($h_{t-1}$) to generate a new hidden state ($h_t$) and an output ($y_t$).</p>",
        // Adding routing information for Step 3 of 5
        route: {
            text: "Unrolling Times visualization &rarr;",
            url: "./unrolling_time.html" // Change this to your actual file routing
        },
        visual: `
            <div class="flex flex-col items-center w-full overflow-x-auto pb-4">
                <svg width="340" height="200" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="min-w-[340px]">
                    <!-- t-1 -->
                    <rect x="20" y="80" width="60" height="50" rx="8" fill="#a5b4fc"/>
                    <text x="50" y="110" fill="#312e81" font-family="sans-serif" font-weight="bold" text-anchor="middle">RNN</text>
                    <path d="M50 170 V 135" stroke="#64748b" stroke-width="2" marker-end="url(#sm-arrow)"/>
                    <text x="50" y="185" fill="#475569" font-family="sans-serif" text-anchor="middle">x<tspan dy="5" font-size="10">t-1</tspan></text>
                    <path d="M50 75 V 40" stroke="#64748b" stroke-width="2" marker-end="url(#sm-arrow)"/>
                    <text x="50" y="25" fill="#475569" font-family="sans-serif" text-anchor="middle">y<tspan dy="5" font-size="10">t-1</tspan></text>

                    <!-- hidden state connection -->
                    <path d="M85 105 H 135" stroke="#ec4899" stroke-width="3" marker-end="url(#sm-arrowPink)"/>
                    <text x="110" y="95" fill="#db2777" font-family="sans-serif" font-size="12" text-anchor="middle">h<tspan dy="3" font-size="8">t-1</tspan></text>

                    <!-- t -->
                    <rect x="140" y="80" width="60" height="50" rx="8" fill="#4f46e5" shadow="lg"/>
                    <text x="170" y="110" fill="white" font-family="sans-serif" font-weight="bold" text-anchor="middle">RNN</text>
                    <path d="M170 170 V 135" stroke="#64748b" stroke-width="3" marker-end="url(#sm-arrow)"/>
                    <text x="170" y="185" fill="#1e293b" font-weight="bold" font-family="sans-serif" text-anchor="middle">x<tspan dy="5" font-size="10">t</tspan></text>
                    <path d="M170 75 V 40" stroke="#64748b" stroke-width="3" marker-end="url(#sm-arrow)"/>
                    <text x="170" y="25" fill="#1e293b" font-weight="bold" font-family="sans-serif" text-anchor="middle">y<tspan dy="5" font-size="10">t</tspan></text>

                    <!-- hidden state connection -->
                    <path d="M205 105 H 255" stroke="#ec4899" stroke-width="3" marker-end="url(#sm-arrowPink)"/>
                    <text x="230" y="95" fill="#db2777" font-family="sans-serif" font-size="12" text-anchor="middle">h<tspan dy="3" font-size="8">t</tspan></text>

                    <!-- t+1 -->
                    <rect x="260" y="80" width="60" height="50" rx="8" fill="#a5b4fc"/>
                    <text x="290" y="110" fill="#312e81" font-family="sans-serif" font-weight="bold" text-anchor="middle">RNN</text>
                    <path d="M290 170 V 135" stroke="#64748b" stroke-width="2" marker-end="url(#sm-arrow)"/>
                    <text x="290" y="185" fill="#475569" font-family="sans-serif" text-anchor="middle">x<tspan dy="5" font-size="10">t+1</tspan></text>
                    <path d="M290 75 V 40" stroke="#64748b" stroke-width="2" marker-end="url(#sm-arrow)"/>
                    <text x="290" y="25" fill="#475569" font-family="sans-serif" text-anchor="middle">y<tspan dy="5" font-size="10">t+1</tspan></text>

                    <!-- Defs -->
                    <defs>
                        <marker id="sm-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                        <marker id="sm-arrowPink" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                        </marker>
                    </defs>
                </svg>
            </div>
        `
    },
    {
        title: "4. The Math Inside (Equations)",
        text: "<p>Inside that RNN cell, what math is actually happening?</p><p class='mt-3'>It calculates two main things at each step $t$: the <strong>New Memory</strong> ($h_t$) and the <strong>Prediction/Output</strong> ($y_t$).</p>",
        // Adding routing information for Step 4 of 5
        route: {
            text: "RNN Math Explanation &rarr;",
            url: "./rnn_math.html" // Change this to your actual file routing
        },
        visual: `
            <div class="text-left w-full space-y-4">
                <div class="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                    <h3 class="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide">1. Update Hidden State (Memory)</h3>
                    <div class="overflow-x-auto pb-2">
                        $$h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$$
                    </div>
                    <ul class="mt-2 text-xs text-slate-600 list-disc pl-5 space-y-1">
                        <li><strong>$h_t$:</strong> New hidden state (current memory)</li>
                        <li><strong>$h_{t-1}$:</strong> Previous hidden state (past memory)</li>
                        <li><strong>$x_t$:</strong> Current Input</li>
                        <li><strong>$W_{hh}, W_{xh}$:</strong> Learnable Weight Matrices</li>
                        <li><strong>$\\tanh$:</strong> Activation function (keeps numbers between -1 and 1)</li>
                    </ul>
                </div>

                <div class="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                    <h3 class="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide">2. Calculate Output</h3>
                    <div class="overflow-x-auto pb-2">
                        $$y_t = W_{hy} h_t + b_y$$
                    </div>
                    <ul class="mt-2 text-xs text-slate-600 list-disc pl-5 space-y-1">
                        <li><strong>$y_t$:</strong> Current Output (e.g., predicting next word)</li>
                        <li><strong>$W_{hy}$:</strong> Output Weight Matrix</li>
                        <li><strong>$b_h, b_y$:</strong> Biases</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "5. The Problem: Forgetting",
        text: "<p>While RNNs are conceptually brilliant, basic RNNs suffer from the <strong>Vanishing Gradient Problem</strong>.</p><p class='mt-3'>If a sequence is too long, the network 'forgets' the earliest inputs because the gradients shrink exponentially during training.</p><p class='mt-3 text-indigo-600 font-semibold'>This led to advanced architectures like LSTMs and GRUs, which add 'gates' to control what to remember and what to forget!</p>",
        visual: `
            <div class="flex flex-col items-center w-full">
                <div class="flex items-center space-x-2 text-lg font-bold">
                    <span class="bg-indigo-600 text-white px-3 py-1 rounded shadow-sm">Word 1</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="bg-indigo-500 text-white px-3 py-1 rounded shadow-sm opacity-80">Word 2</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="text-slate-300">...</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="bg-indigo-300 text-white px-3 py-1 rounded shadow-sm opacity-40">Word 50</span>
                    <span class="text-slate-300">&rarr;</span>
                    <span class="bg-indigo-100 text-indigo-300 px-3 py-1 rounded shadow-sm opacity-20">Word 100</span>
                </div>
                <p class="text-sm text-pink-600 mt-6 font-medium bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
                    Memory of "Word 1" fades entirely by "Word 100".
                </p>
            </div>
        `
    },
    {
        title: "6. Coding it in PyTorch",
        text: "<p>Let's see how this looks in actual Python code using <strong>PyTorch</strong>.</p><p class='mt-3'>You don't need to write the complex math from scratch! PyTorch provides <code>nn.RNN</code>. You just tell it the size of your input features and how big you want the 'memory' (hidden state) to be.</p><p class='mt-3 text-indigo-600 font-semibold'>Passing a sequence into the RNN gives you both the outputs for every step, and the final memory state!</p>",
        // route: {
        //     text: "View Full PyTorch Tutorial &rarr;",
        //     url: "pytorch-tutorial.html"
        // },
        visual: `
            <div class="w-full text-left bg-slate-900 p-5 rounded-xl shadow-lg overflow-x-auto text-sm sm:text-base font-mono text-slate-300 border border-slate-700">
                <p><span class="text-pink-400">import</span> torch</p>
                <p><span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn</p>
                <br/>
                <p class="text-slate-500"># 1. Define the network</p>
                <p>input_size = <span class="text-orange-300">10</span>  <span class="text-slate-500"># e.g., features per word</span></p>
                <p>hidden_size = <span class="text-orange-300">20</span> <span class="text-slate-500"># Size of the memory loop</span></p>
                <p>rnn = nn.RNN(input_size, hidden_size, batch_first=<span class="text-orange-300">True</span>)</p>
                <br/>
                <p class="text-slate-500"># 2. Create dummy data (1 sentence, 5 words)</p>
                <p>sequence = torch.randn(<span class="text-orange-300">1</span>, <span class="text-orange-300">5</span>, <span class="text-orange-300">10</span>)</p>
                <br/>
                <p class="text-slate-500"># 3. Run the RNN!</p>
                <p>output, hidden_state = rnn(sequence)</p>
            </div>
        `
    }
];

// --- State Management ---
let currentStep = 0;

// --- DOM Elements ---
const domTitle = document.getElementById('step-title');
const domDesc = document.getElementById('step-description');
const domVisual = document.getElementById('visual-container');
const domBtnPrev = document.getElementById('btn-prev');
const domBtnNext = document.getElementById('btn-next');
const domStepCounter = document.getElementById('step-counter');
const domProgressContainer = document.getElementById('progress-container');
const contentArea = document.getElementById('content-area');

// New DOM Elements for the Routing Feature
const domRoutingBtnContainer = document.getElementById('routing-btn-container');
const domRoutingLink = document.getElementById('routing-link');

// --- Initialization ---
function init() {
    // Generate progress dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dot.id = `dot-${index}`;
        domProgressContainer.appendChild(dot);
    });

    // Add Event Listeners
    domBtnPrev.addEventListener('click', () => changeStep(-1));
    domBtnNext.addEventListener('click', () => changeStep(1));

    // Render initial step
    renderStep();
}

// --- Core Functions ---
function changeStep(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < steps.length) {
        // Trigger animation
        contentArea.classList.remove('fade-enter-active');
        contentArea.classList.add('fade-enter');

        setTimeout(() => {
            currentStep = newStep;
            renderStep();

            // Trigger reflow
            void contentArea.offsetWidth;

            contentArea.classList.remove('fade-enter');
            contentArea.classList.add('fade-enter-active');
        }, 150); // Small delay to let opacity drop before changing content
    }
}

function renderStep() {
    const stepData = steps[currentStep];

    // Update Text
    domTitle.innerHTML = stepData.title;
    domDesc.innerHTML = stepData.text;
    domVisual.innerHTML = stepData.visual;

    // NEW: Toggle visibility of the routing button based on the current step
    if (stepData.route) {
        domRoutingLink.href = stepData.route.url;
        domRoutingLink.innerHTML = stepData.route.text;
        domRoutingBtnContainer.classList.remove('hidden');
        domRoutingBtnContainer.classList.add('flex');
    } else {
        domRoutingBtnContainer.classList.add('hidden');
        domRoutingBtnContainer.classList.remove('flex');
    }

    // Trigger MathJax if equations are present
    if (window.MathJax) {
        MathJax.typesetPromise([domVisual, domDesc]).catch((err) => console.log('MathJax Error:', err.message));
    }

    // Update Controls
    domBtnPrev.disabled = currentStep === 0;
    domBtnNext.disabled = currentStep === steps.length - 1;
    domStepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Progress Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-indigo-600 ring-4 ring-indigo-100';
        } else if (index < currentStep) {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-indigo-300';
        } else {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 bg-slate-200';
        }
    });
}

// Start app
document.addEventListener('DOMContentLoaded', init);