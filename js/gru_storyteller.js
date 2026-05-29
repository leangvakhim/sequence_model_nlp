// --- Content Data ---
const steps = [
    {
        title: "Introduction: Meet Gru",
        content: `
            <p>Let's imagine the GRU (Gated Recurrent Unit) is a little robot named <strong>Gru</strong> whose job is to write an ongoing comic book story, day after day.</p>
            <p>Every day, Gru has to write a new page. To do this, Gru needs to look at:</p>
            <ul class="list-none pl-4 mt-4 space-y-3">
                <li class="flex items-center"><span class="bg-blue-100 text-blue-800 p-2 rounded mr-3 shadow-sm">📖 The Past</span> What happened in the story yesterday.</li>
                <li class="flex items-center"><span class="bg-green-100 text-green-800 p-2 rounded mr-3 shadow-sm">💡 The Present</span> The new ideas he just thought of today.</li>
            </ul>
            <p class="mt-6 text-gray-600 italic">Here is how Gru uses his magical math tools to write the perfect story.</p>
        `
    },
    {
        title: "The Setup: Our Story Variables",
        content: `
            <p>Let's give Gru some simple numbers to work with so we can do the math together. We will measure everything in "Story Points" from 0 to 10.</p>

            <div class="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                <div class="mb-3 text-lg"><span class="font-bold text-blue-700">$h_{t-1}$ (The Past):</span> Yesterday's story was great. It has <strong>10 Points</strong>.</div>
                <div class="flex h-6 bg-gray-200 rounded-md overflow-hidden ring-1 ring-gray-300 ring-inset">
                    <div class="w-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">10 / 10</div>
                </div>
            </div>

            <div class="mt-4 p-5 bg-green-50 border border-green-100 rounded-xl shadow-sm">
                <div class="mb-3 text-lg"><span class="font-bold text-green-700">$x_t$ (The Present):</span> Today, a dragon appears! This new idea has <strong>8 Points</strong>.</div>
                <div class="flex h-6 bg-gray-200 rounded-md overflow-hidden ring-1 ring-gray-300 ring-inset">
                    <div class="w-4/5 bg-green-500 flex items-center justify-center text-white text-xs font-bold">8 / 10</div>
                </div>
            </div>
        `
    },
    {
        title: "Step 1: The Magic Eraser (Reset Gate)",
        content: `
            <p>Gru looks at yesterday's story (10) and today's dragon (8). Sometimes, yesterday's story isn't important anymore. If yesterday they ate breakfast, and today a dragon attacks, Gru needs to forget the breakfast to focus on the dragon!</p>

            <p class="mt-5 font-bold text-red-600 text-xl text-center bg-red-50 py-3 rounded-lg border border-red-100">
                The Reset Gate ($r_t$) is Gru's Magic Eraser 🧽
            </p>

            <div class="my-6 text-center text-xl bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
                $$r_t = \\sigma(W_r \\cdot [h_{t-1}, x_t] + b_r)$$
            </div>

            <p>The $\\sigma$ (Sigmoid) is a math machine that "squishes" any number into a percentage between <strong>0 (erase everything)</strong> and <strong>1 (keep everything)</strong>.</p>
        `
    },
    {
        title: "Step 1: The Eraser Math",
        content: `
            <p>Let's pretend the squisher decides Gru should keep exactly half of yesterday's story.</p>

            <div class="my-6 p-6 bg-red-50 rounded-xl border-l-8 border-red-500 shadow-sm text-center">
                <p class="text-2xl font-bold text-red-800">The Eraser ($r_t$) = 0.5 (50%)</p>
            </div>

            <p>This means when making the next draft, we apply the eraser to the past:</p>

            <div class="mt-6 p-4 border border-gray-200 rounded-xl">
                <p class="text-sm text-gray-500 font-bold mb-2 uppercase tracking-wide">Past ($h_{t-1}$) AFTER Eraser:</p>
                <div class="flex h-8 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                    <div class="w-1/2 bg-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-[inset_-2px_0_4px_rgba(0,0,0,0.2)]">5 Pts Kept</div>
                    <div class="w-1/2 bg-gray-300 striped-bg flex items-center justify-center text-sm font-bold text-gray-500">Erased</div>
                </div>
            </div>
        `
    },
    {
        title: "Step 2: The Rough Draft (Candidate)",
        content: `
            <p>Before Gru writes the final page, he writes a <strong>Rough Draft</strong>, known in math as the Candidate Hidden State ($\\tilde{h}_t$).</p>

            <p>To do this, he takes his new idea (the dragon) and mixes it with the parts of yesterday's story that he <em>didn't</em> erase ($r_t * h_{t-1}$).</p>

            <div class="my-6 text-center text-xl bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
                $$\\tilde{h}_t = \\tanh(W_h \\cdot [r_t * h_{t-1}, x_t] + b_h)$$
            </div>

            <p>The $\\tanh$ is just another squisher that makes sure the story points stay balanced between -1 and 1 (or 0 and 10 in our simple point system).</p>
        `
    },
    {
        title: "Step 2: The Magic Glue (Update Gate)",
        content: `
            <p>Now, meet the <strong>Update Gate ($z_t$)</strong>. This is Gru's <strong>Magic Glue 🧴</strong>.</p>

            <div class="my-6 text-center text-xl bg-white shadow-sm border border-gray-200 p-5 rounded-xl">
                $$z_t = \\sigma(W_z \\cdot [h_{t-1}, x_t] + b_z)$$
            </div>

            <p class="bg-yellow-50 p-4 border border-yellow-200 rounded-lg mt-4 text-yellow-900">
                It decides how much of the <strong>Old Story</strong> (from yesterday) he should glue onto the final page, versus how much of the <strong>New Rough Draft</strong> he should use.
            </p>

            <p class="mt-4">Just like the eraser, it squishes a decision between 0 and 1.</p>
        `
    },
    {
        title: "Step 2: Draft & Glue Math",
        content: `
            <div class="space-y-6">
                <div class="p-5 bg-purple-50 rounded-xl border-l-8 border-purple-500 shadow-sm">
                    <p class="font-bold text-purple-900 text-xl mb-2">Rough Draft ($\\tilde{h}_t$)</p>
                    <p>Let's say Gru mixes the new dragon and the half-erased past, and scores the rough draft at <strong>9 Points</strong>.</p>
                    <div class="flex h-6 mt-4 bg-gray-200 rounded-md overflow-hidden">
                        <div class="w-[90%] bg-purple-500 flex items-center justify-center text-white text-xs font-bold">9 / 10</div>
                    </div>
                </div>

                <div class="p-5 bg-yellow-50 rounded-xl border-l-8 border-yellow-500 shadow-sm text-center">
                    <p class="font-bold text-yellow-900 text-xl mb-2">The Glue ($z_t$)</p>
                    <p>Let's pretend the glue decides to use <strong>0.6 (60%)</strong> of the new rough draft.</p>
                    <p class="mt-2 text-sm text-yellow-700">(This means it will use 40% of the old story).</p>
                </div>
            </div>
        `
    },
    {
        title: "Step 3: The Final Page",
        content: `
            <p>This is the moment Gru actually prints the final page! (The Final Hidden State $h_t$).</p>

            <p>He calculates exactly how many points the new page gets by blending the old and the new using the Magic Glue.</p>

            <div class="my-6 text-center text-xl bg-indigo-50 border border-indigo-100 p-6 rounded-xl shadow-sm">
                $$h_t = (1 - z_t) * h_{t-1} + z_t * \\tilde{h}_t$$
            </div>

            <div class="flex justify-center space-x-2 text-sm text-gray-600 font-medium text-center">
                <span class="bg-blue-100 px-3 py-1 rounded">Old Stuff to keep</span>
                <span class="text-xl">+</span>
                <span class="bg-purple-100 px-3 py-1 rounded">New Stuff to add</span>
            </div>
        `
    },
    {
        title: "Step 3: Step-by-Step Calculation",
        content: `
            <p class="mb-4 text-lg font-medium">Let's plug in our numbers!</p>

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white p-3 border rounded-lg text-center"><span class="text-gray-500 text-sm block">Past Story ($h_{t-1}$)</span><strong>10</strong></div>
                <div class="bg-white p-3 border rounded-lg text-center"><span class="text-gray-500 text-sm block">Rough Draft ($\\tilde{h}_t$)</span><strong>9</strong></div>
                <div class="bg-white p-3 border rounded-lg text-center"><span class="text-gray-500 text-sm block">Glue for New ($z_t$)</span><strong>0.6</strong> (60%)</div>
                <div class="bg-white p-3 border rounded-lg text-center"><span class="text-gray-500 text-sm block">Glue for Old ($1 - z_t$)</span><strong>0.4</strong> (40%)</div>
            </div>

            <div class="space-y-4">
                <div class="p-4 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
                    <span><strong>1. Calculate Old Stuff:</strong> $0.4 * 10$</span>
                    <span class="font-bold text-xl text-blue-700">4 pts</span>
                </div>
                <div class="p-4 bg-purple-50 border border-purple-100 rounded-lg flex justify-between items-center">
                    <span><strong>2. Calculate New Stuff:</strong> $0.6 * 9$</span>
                    <span class="font-bold text-xl text-purple-700">5.4 pts</span>
                </div>
            </div>
        `
    },
    {
        title: "The Result: Today's Story",
        content: `
            <div class="text-center mt-4">
                <p class="text-xl font-bold mb-6 text-gray-700">3. Add them together for the Final Page ($h_t$)</p>

                <div class="text-5xl font-extrabold text-white bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl inline-block shadow-lg border border-indigo-200 mb-8 transform hover:scale-105 transition-transform cursor-default">
                    $$h_t = 4 + 5.4 = 9.4$$
                </div>
            </div>

            <p class="text-center text-xl">Today's final story state is <strong class="text-indigo-600">9.4 Points</strong>.</p>

            <div class="mt-8 p-5 bg-orange-50 border-l-4 border-orange-400 rounded-lg text-orange-900 shadow-sm">
                <p class="font-bold mb-1 flex items-center">🌅 Tomorrow...</p>
                <p>Gru will wake up, and this 9.4 will become the new "Past" ($h_{t-1}$), and the whole process will start over again with a brand new input!</p>
            </div>
        `
    },
    {
        title: "So, Why and When do we use them?",
        content: `
            <p class="mb-4">Even though GRU is fantastic, we still bring in the heavy-duty LSTM when the job requires serious memory power.</p>

            <div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mb-6">
                <table class="min-w-full bg-white text-sm">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="py-3 px-4 text-left font-semibold text-gray-600">Feature</th>
                            <th class="py-3 px-4 text-left font-bold text-indigo-700 w-2/5">The GRU (Newer Robot)</th>
                            <th class="py-3 px-4 text-left font-bold text-teal-700 w-2/5">The LSTM (Classic Robot)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr>
                            <td class="py-3 px-4 font-semibold text-gray-800 bg-gray-50">Speed</td>
                            <td class="py-3 px-4">⚡ <strong>Fast.</strong> It does less math, so it trains faster.</td>
                            <td class="py-3 px-4">🐢 <strong>Slower.</strong> It does more math and takes more computing power.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-semibold text-gray-800 bg-gray-50">Complexity</td>
                            <td class="py-3 px-4">Simple. Uses 2 Gates.</td>
                            <td class="py-3 px-4">Complex. Uses 3 Gates + a Cell State.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-semibold text-gray-800 bg-gray-50">Best For...</td>
                            <td class="py-3 px-4 bg-indigo-50/30">Shorter sequences, simple datasets, or running quickly on a basic web backend.</td>
                            <td class="py-3 px-4 bg-teal-50/30">Very long, complex sequences where AI must remember tiny details from a long time ago.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-gray-700 italic bg-gray-50 p-4 border border-gray-200 rounded-lg">
                <strong>In short:</strong> GRU is your fast, efficient daily worker. But if you are handing an AI a massive, complicated timeline and telling it, "Do not forget what happened on day one," you bring in LSTM!
            </p>
        `
    },
    {
        title: "Bonus: Gru in Python (PyTorch)",
        content: `
            <p class="mb-4">Here is how you actually build Gru using Python and the PyTorch library. It's surprisingly simple because PyTorch handles all the complex math (squishers and glue) for us!</p>

            <div class="bg-gray-900 rounded-xl p-5 mb-4 shadow-inner overflow-x-auto border border-gray-700">
<pre><code class="text-green-400 text-sm font-mono leading-relaxed"><span class="text-purple-400">import</span> torch
<span class="text-purple-400">import</span> torch.nn <span class="text-purple-400">as</span> nn

<span class="text-gray-500"># 1. Setup Gru (The Robot)</span>
<span class="text-gray-500"># input_size: Size of today's new idea (e.g., 1 feature)</span>
<span class="text-gray-500"># hidden_size: Size of the story memory (e.g., 10 points)</span>
gru = nn.GRU(input_size=<span class="text-yellow-300">1</span>, hidden_size=<span class="text-yellow-300">10</span>, batch_first=<span class="text-purple-400">True</span>)

<span class="text-gray-500"># 2. The Data (The Present: $x_t$)</span>
<span class="text-gray-500"># Let's say we have 3 days of new ideas.</span>
today_input = torch.randn(<span class="text-yellow-300">1</span>, <span class="text-yellow-300">3</span>, <span class="text-yellow-300">1</span>)

<span class="text-gray-500"># 3. The Memory (The Past: $h_{t-1}$)</span>
<span class="text-gray-500"># Before day 1, memory is empty (zeros).</span>
past_memory = torch.zeros(<span class="text-yellow-300">1</span>, <span class="text-yellow-300">1</span>, <span class="text-yellow-300">10</span>)

<span class="text-gray-500"># 4. Let Gru read and write!</span>
<span class="text-gray-500"># output: The new story at each step</span>
<span class="text-gray-500"># final_memory: The final state to pass to tomorrow ($h_t$)</span>
output, final_memory = gru(today_input, past_memory)
</code></pre>
            </div>

            <p class="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100">
                As you can see, you just pass in the <strong>Present</strong> (<code>today_input</code>) and the <strong>Past</strong> (<code>past_memory</code>), and PyTorch calculates all the gates automatically!
            </p>
        `
    }
];

// --- Logic & State ---
let currentStep = 0;
const totalSteps = steps.length;

// DOM Elements
const titleEl = document.getElementById('step-title');
const bodyEl = document.getElementById('step-body');
const counterEl = document.getElementById('step-counter');
const progressEl = document.getElementById('progress-bar');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const contentContainer = document.getElementById('content-container');

// Functions
function renderMath() {
    // Wait slightly for DOM to settle, then render KaTeX
    setTimeout(() => {
        renderMathInElement(bodyEl, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }, 10);
}

function updateUI() {
    const stepData = steps[currentStep];

    // Remove animation class to re-trigger it
    contentContainer.classList.remove('fade-in');

    // Force reflow
    void contentContainer.offsetWidth;

    // Inject content
    titleEl.innerHTML = stepData.title;
    bodyEl.innerHTML = stepData.content;

    // Add animation class back
    contentContainer.classList.add('fade-in');

    // Render LaTeX math
    renderMath();

    // Update Progress & Counter
    counterEl.innerText = `Step ${currentStep + 1} / ${totalSteps}`;
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
    progressEl.style.width = `${progressPercent}%`;

    // Update Button States
    btnBack.disabled = currentStep === 0;

    if (currentStep === totalSteps - 1) {
        btnNext.innerHTML = 'Finish <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        btnNext.classList.replace('bg-indigo-600', 'bg-green-600');
        btnNext.classList.replace('hover:bg-indigo-700', 'hover:bg-green-700');
    } else {
        btnNext.innerHTML = 'Next <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
        btnNext.classList.replace('bg-green-600', 'bg-indigo-600');
        btnNext.classList.replace('hover:bg-green-700', 'hover:bg-indigo-700');
    }

    // Scroll to top of content area when step changes
    contentContainer.scrollTop = 0;
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        updateUI();
    } else {
        // Optional: Action on finish
        alert("You have completed the GRU Concept Journey! Time to build some AI.");
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Initialize first step on load
window.addEventListener('DOMContentLoaded', () => {
    // We wait a tiny bit to ensure KaTeX auto-render script is fully ready
    setTimeout(updateUI, 100);
});