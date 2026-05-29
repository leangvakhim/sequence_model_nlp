// --- DATA DEFINITION ---
const steps = [
    {
        title: "The Setup: The Factory Parts",
        content: `
            <p class="text-lg text-gray-700 mb-4">LSTMs can look like an alphabet soup of scary math, but at their core, they are just deciding what to keep, what to add, and what to share.</p>
            <p class="text-gray-700 mb-4">Imagine you are the manager of a toy factory. You have two main things to keep track of:</p>
            <ul class="space-y-4 my-6">
                <li class="flex items-start gap-3">
                    <span class="bg-blue-100 text-blue-700 p-1 rounded mt-0.5">📦</span>
                    <div><strong>The Conveyor Belt ($C_t$ - Cell State):</strong> This is your long-term memory. It’s a huge, slow-moving belt carrying all the toys you’ve collected over a long time.</div>
                </li>
                <li class="flex items-start gap-3">
                    <span class="bg-orange-100 text-orange-700 p-1 rounded mt-0.5">🎒</span>
                    <div><strong>Your Backpack ($h_{t-1}$ - Hidden State):</strong> This is your short-term memory. It’s a small bag you carry with you today, holding just the most important details you need right now.</div>
                </li>
                <li class="flex items-start gap-3">
                    <span class="bg-green-100 text-green-700 p-1 rounded mt-0.5">🚚</span>
                    <div><strong>Today's New Delivery ($x_t$ - Input):</strong> A truck just dropped off some brand new toys.</div>
                </li>
            </ul>
        `,
        dashState: { belt: "Waiting...", pack: "Waiting...", del: "Waiting..." }
    },
    {
        title: "The Two Magic Machines",
        content: `
            <p class="text-lg text-gray-700 mb-6">Before we do the math, we need to know about two "Magic Machines" inside our factory that help us make decisions:</p>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-4">
                <h3 class="font-bold text-purple-800 text-xl mb-2 flex items-center gap-2">
                    <span>1.</span> The Percentage Machine ($\\sigma$ or Sigmoid)
                </h3>
                <p class="text-gray-700">Whenever you put numbers in here, it squishes them into a percentage between 0 and 1. (0 means 0%, 1 means 100%).</p>
                <p class="mt-2 font-semibold text-purple-700">Think of it as a "Yes/No/Maybe" machine.</p>
            </div>

            <div class="bg-pink-50 border border-pink-200 rounded-lg p-5">
                <h3 class="font-bold text-pink-800 text-xl mb-2 flex items-center gap-2">
                    <span>2.</span> The Squisher Machine ($\\tanh$)
                </h3>
                <p class="text-gray-700">This machine just takes giant piles of toys and packs them neatly into a standard size (between -1 and 1) so they fit in your Backpack.</p>
            </div>
        `,
        dashState: { belt: "Waiting...", pack: "Waiting...", del: "Waiting..." }
    },
    {
        title: "Let's Pretend: Today's Starting Numbers",
        content: `
            <p class="text-lg text-gray-700 mb-6">To see how this works, let's give our factory some starting numbers for today's shift:</p>

            <div class="space-y-4 text-xl">
                <p>Yesterday, your <strong>Conveyor Belt</strong> had 10 toys on it:<br> $$C_{t-1} = 10$$</p>
                <p>Yesterday, your <strong>Backpack</strong> had a score of 2:<br> $$h_{t-1} = 2$$</p>
                <p><strong>Today's New Delivery</strong> has a score of 4:<br> $$x_t = 4$$</p>
            </div>
            <p class="mt-8 text-lg font-semibold text-indigo-700">Let's see the step-by-step math of how the factory runs today!</p>
        `,
        dashState: { belt: "10", pack: "2", del: "4" },
        highlight: ['belt', 'pack', 'del']
    },
    {
        title: "Step 1: The Forget Gate (Concept)",
        content: `
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Cleaning Up</h3>
            <p class="text-gray-700 mb-6">Before we put new toys on the Conveyor Belt ($C_t$), we need to see if we should throw any old, broken ones away.</p>

            <div class="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto text-center text-xl">
                $$f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)$$
            </div>

            <h4 class="font-bold text-lg mb-2">The 7-Year-Old Explanation:</h4>
            <p class="text-gray-700">You look at what's in your Backpack ($h_{t-1} = 2$) and the New Delivery ($x_t = 4$). Based on that, the Percentage Machine ($\\sigma$) decides how much of the old Conveyor Belt to keep.</p>
            <p class="text-sm text-gray-500 mt-4 italic">*Note: The $W_f$ and $b_f$ are just the factory's background rulebooks deciding how the machine behaves.</p>
        `,
        dashState: { belt: "10", pack: "2", del: "4" }
    },
    {
        title: "Step 1: The Forget Gate (The Math)",
        content: `
            <p class="text-lg text-gray-700 mb-6">Let's pretend the Percentage Machine spits out the number <strong>0.5 (or 50%)</strong>. This is our $f_t$.</p>
            <p class="text-gray-700 mb-4">Now, we apply it to the old Conveyor Belt:</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-xl">
                $$10 \\text{ old toys} \\times 0.5 \\text{ (keep half)} = 5 \\text{ toys left}$$
            </div>

            <h4 class="font-bold text-lg mb-2 text-green-700">Result:</h4>
            <p class="text-gray-700 text-lg">We cleaned up! We now have <strong>5 toys</strong> sitting on the belt.</p>
        `,
        dashState: { belt: "5", pack: "2", del: "4" },
        highlight: ['belt']
    },
    {
        title: "Step 2: Input Gate & Cell Update (Concept)",
        content: `
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Adding New Stuff</h3>
            <p class="text-gray-700 mb-6">Now that we made room, how many of the new toys from the delivery truck should we put on the belt?</p>

            <div class="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto text-center text-xl space-y-4">
                $$i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)$$
                $$C_t = f_t \\ast C_{t-1} + i_t \\ast \\tilde{C}_t$$
            </div>

            <h4 class="font-bold text-lg mb-2">The 7-Year-Old Explanation:</h4>
            <p class="text-gray-700 mb-2"><strong>1.</strong> First, your workers unpack the new truck and suggest a pile of great new toys to add (this is the Candidate, $\\tilde{C}_t$). Let's say they found <strong>6 awesome toys</strong>.</p>
            <p class="text-gray-700"><strong>2.</strong> Then, you look at your Backpack ($h_{t-1} = 2$) and the Delivery ($x_t = 4$) again. You use the Percentage Machine ($i_t$) to decide what percentage of those 6 awesome toys are actually worth keeping.</p>
        `,
        dashState: { belt: "5", pack: "2", del: "4" }
    },
    {
        title: "Step 2: Input Gate & Cell Update (The Math)",
        content: `
            <p class="text-lg text-gray-700 mb-4">Let's pretend the Percentage Machine for new stuff spits out <strong>0.5 (50%)</strong>. This is our $i_t$.</p>
            <p class="text-gray-700 mb-4">We have 6 awesome candidate toys. Let's do the math:</p>

            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 text-lg">
                $$6 \\text{ new toys} \\times 0.5 \\text{ (keep half)} = 3 \\text{ new toys to add}$$
            </div>

            <p class="text-gray-700 mb-4">Now, let's update the main Conveyor Belt ($C_t$):</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-lg">
                $$5 \\text{ old toys} + 3 \\text{ new toys} = 8 \\text{ toys}$$
            </div>

            <h4 class="font-bold text-lg mb-2 text-green-700">Result:</h4>
            <p class="text-gray-700 text-lg">Our Conveyor Belt ($C_t$) is officially updated! It now holds <strong>8 carefully chosen toys</strong>.</p>
        `,
        dashState: { belt: "8", pack: "2", del: "4" },
        highlight: ['belt']
    },
    {
        title: "Step 3: The Output Gate (Concept)",
        content: `
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Packing Today's Backpack</h3>
            <p class="text-gray-700 mb-6">The long-term Conveyor Belt is moving along beautifully with 8 toys. But you can't carry a whole conveyor belt home. What goes into your small Backpack ($h_t$) to show your friends today?</p>

            <div class="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto text-center text-xl space-y-4">
                $$o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)$$
                $$h_t = o_t \\ast \\tanh(C_t)$$
            </div>

            <h4 class="font-bold text-lg mb-2">The 7-Year-Old Explanation:</h4>
            <p class="text-gray-700">You use the Percentage Machine ($o_t$) one last time to decide how much of the Conveyor Belt you actually want to show off. Then, you use the Squisher Machine ($\\tanh$) to pack those big toys neatly so they fit in your Backpack.</p>
        `,
        dashState: { belt: "8", pack: "2", del: "4" }
    },
    {
        title: "Step 3: The Output Gate (The Math)",
        content: `
            <p class="text-lg text-gray-700 mb-4">The Percentage Machine decides you only need to show off a tiny bit today. It spits out <strong>0.25 (25%)</strong>. This is our $o_t$.</p>
            <p class="text-gray-700 mb-4">We take our 8 toys from the Conveyor Belt and run them through the Squisher Machine ($\\tanh$). Let's pretend squishing those 8 big toys packs them down to a neat score of <strong>0.8</strong>.</p>

            <p class="text-gray-700 mb-4">Now, pack the backpack ($h_t$):</p>

            <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 text-lg">
                $$0.25 \\text{ (percentage to show)} \\times 0.8 \\text{ (squished toys)} = 0.2$$
            </div>

            <h4 class="font-bold text-lg mb-2 text-green-700">Result:</h4>
            <p class="text-gray-700 text-lg">Today's new Backpack ($h_t$) has a tidy score of <strong>0.2</strong>!</p>
        `,
        dashState: { belt: "8", pack: "0.2", del: "4" },
        highlight: ['pack']
    },
    {
        title: "Summary of Today's Shift",
        content: `
            <div class="bg-gray-800 text-white p-6 rounded-xl mb-6">
                <ul class="space-y-4 text-lg">
                    <li class="flex items-center gap-3">
                        <span>🧹</span> <strong>Forget Gate:</strong> Decided to keep 50% of the old toys (10 became 5).
                    </li>
                    <li class="flex items-center gap-3">
                        <span>➕</span> <strong>Input Gate:</strong> Decided to add 50% of the 6 new candidate toys (Added 3, Belt now has 8).
                    </li>
                    <li class="flex items-center gap-3">
                        <span>🎒</span> <strong>Output Gate:</strong> Decided to pack 25% of the squished belt into the new Backpack.
                    </li>
                </ul>
            </div>
            <p class="text-xl text-center text-gray-700 font-medium">Tomorrow, when the next delivery truck arrives, you will bring your updated Conveyor Belt ($C_t = 8$) and your updated Backpack ($h_t = 0.2$) and start the exact same math game all over again!</p>
        `,
        dashState: { belt: "8", pack: "0.2", del: "4" }
    },
    {
        title: "Why Do We Need These Gates?",
        content: `
            <h3 class="text-2xl font-bold text-gray-800 mb-2">The Big Problem: Information Overload</h3>
            <p class="text-lg text-gray-700 mb-4">Imagine trying to memorize an entire textbook. If you try to remember every single word on every single page, your brain will quickly run out of space. By the time you get to the last chapter, you will have completely forgotten what the first chapter was about.</p>

            <div class="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6">
                <strong>Older AI models</strong> (like standard Recurrent Neural Networks) had this exact problem. They tried to remember everything, which meant their memory got cluttered, and they quickly forgot important information from the past.
            </div>

            <p class="text-lg text-gray-700 font-semibold">The LSTM solves this by introducing Gates.</p>
            <p class="text-gray-700">Gates are essentially filters or "bouncers" that make decisions about what information is actually worth keeping. Let's look at real-world examples for each gate.</p>
        `,
        dashState: { belt: "8", pack: "0.2", del: "Waiting for tomorrow" }
    },
    {
        title: "1. The Forget Gate (The Eraser)",
        content: `
            <div class="flex items-center gap-4 mb-6">
                <div class="bg-gray-200 p-4 rounded-full text-3xl">🧽</div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">Its Job:</h3>
                    <p class="text-gray-600">To delete old, outdated information from the long-term memory.</p>
                </div>
            </div>

            <h4 class="font-bold text-lg mb-2 text-indigo-700">Why it’s important:</h4>
            <p class="text-gray-700 mb-6">It prevents the memory from filling up with useless junk and allows the model to "reset" when a new topic begins.</p>

            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h4 class="font-bold mb-2 flex items-center gap-2"><span>🌎</span> Real-World Example:</h4>
                <p class="text-gray-700 italic">"Imagine you are reading a book. Chapter 1 is about a character named Alice in a forest. Chapter 2 suddenly switches to a completely different character, Bob, in a spaceship. The Forget Gate realizes the context has changed and says, <strong>'Erase the forest details from our memory; we don't need them anymore to understand this spaceship chapter.'</strong>"</p>
            </div>
        `,
        dashState: { belt: "8", pack: "0.2", del: "Waiting for tomorrow" }
    },
    {
        title: "2. The Input Gate (The Filter)",
        content: `
            <div class="flex items-center gap-4 mb-6">
                <div class="bg-gray-200 p-4 rounded-full text-3xl">☕</div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">Its Job:</h3>
                    <p class="text-gray-600">To protect the memory from useless new information.</p>
                </div>
            </div>

            <h4 class="font-bold text-lg mb-2 text-indigo-700">Why it’s important:</h4>
            <p class="text-gray-700 mb-6">Not every new piece of data is valuable. The Input Gate ensures only the most crucial new details get written onto the long-term memory conveyor belt.</p>

            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h4 class="font-bold mb-2 flex items-center gap-2"><span>🌎</span> Real-World Example:</h4>
                <p class="text-gray-700 italic">"If someone is telling you a story and says, 'So, um, basically, like, the dog jumped over the fence,' the Input Gate acts as a filter. It gives a score of 0 to filler words like 'um,' 'basically,' and 'like,' so they don't clutter your memory, and <strong>only saves the important new fact: 'dog jumped fence.'</strong>"</p>
            </div>
        `,
        dashState: { belt: "8", pack: "0.2", del: "Waiting for tomorrow" }
    },
    {
        title: "3. The Output Gate (The Spokesperson)",
        content: `
            <div class="flex items-center gap-4 mb-6">
                <div class="bg-gray-200 p-4 rounded-full text-3xl">🎤</div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">Its Job:</h3>
                    <p class="text-gray-600">To decide what part of the massive long-term memory is actually relevant right now.</p>
                </div>
            </div>

            <h4 class="font-bold text-lg mb-2 text-indigo-700">Why it’s important:</h4>
            <p class="text-gray-700 mb-6">It stops the LSTM from blurting out everything it knows all at once. It forces the network to focus only on the specific answer needed for the current step.</p>

            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h4 class="font-bold mb-2 flex items-center gap-2"><span>🌎</span> Real-World Example:</h4>
                <p class="text-gray-700 italic">"Your brain holds a massive amount of long-term memory—how to ride a bike, the lyrics to your favorite song, and the history of the Roman Empire. But if I ask you, 'What is 2 + 2?', your Output Gate stops you from singing a song. <strong>It searches your memory, isolates the specific math fact needed for this exact moment, and only outputs the number '4.'</strong>"</p>
            </div>
        `,
        dashState: { belt: "8", pack: "0.2", del: "Waiting for tomorrow" }
    },
    {
        title: "Bonus: Building the Factory in PyTorch",
        content: `
            <p class="text-lg text-gray-700 mb-4">Now that you know how the math works, here is how programmers actually build this factory using Python and PyTorch!</p>
            <p class="text-gray-700 mb-4">We don't have to write the gate math by hand. PyTorch does it for us inside <code>nn.LSTM</code>. Look at how our analogy matches the code perfectly:</p>

            <div class="bg-gray-900 text-gray-100 p-5 rounded-lg mb-6 overflow-x-auto text-sm font-mono leading-relaxed shadow-inner border border-gray-800">
<pre><span class="text-green-400">import</span> torch
<span class="text-green-400">import</span> torch.nn <span class="text-green-400">as</span> nn

<span class="text-gray-400"># 1. Build the Toy Factory (The LSTM Layer)</span>
<span class="text-gray-400"># input_size=1 (We deliver 1 type of toy score at a time)</span>
<span class="text-gray-400"># hidden_size=1 (Our Backpack holds 1 squished score)</span>
toy_factory = nn.LSTM(input_size=<span class="text-orange-300">1</span>, hidden_size=<span class="text-orange-300">1</span>, batch_first=<span class="text-blue-300">True</span>)

<span class="text-gray-400"># 2. Today's Deliveries (x_t)</span>
<span class="text-gray-400"># The delivery truck drops off toy scores over 3 consecutive days: 4, 6, and 2.</span>
deliveries = torch.tensor([[[<span class="text-orange-300">4.0</span>], [<span class="text-orange-300">6.0</span>], [<span class="text-orange-300">2.0</span>]]])

<span class="text-gray-400"># 3. Starting Backpack (h_0) & Conveyor Belt (C_0)</span>
<span class="text-gray-400"># We start the very first morning with completely empty bags (0.0)</span>
backpack = torch.zeros(<span class="text-orange-300">1</span>, <span class="text-orange-300">1</span>, <span class="text-orange-300">1</span>)
conveyor_belt = torch.zeros(<span class="text-orange-300">1</span>, <span class="text-orange-300">1</span>, <span class="text-orange-300">1</span>)

<span class="text-gray-400"># 4. Run the Factory!</span>
<span class="text-gray-400"># We feed the LSTM our new deliveries and our empty bags</span>
output, (new_backpack, new_conveyor_belt) = toy_factory(
deliveries,
(backpack, conveyor_belt)
)

<span class="text-purple-400">print</span>(<span class="text-yellow-300">"Final Backpack:"</span>, new_backpack.item())
<span class="text-purple-400">print</span>(<span class="text-yellow-300">"Final Conveyor Belt:"</span>, new_conveyor_belt.item())</pre>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
                <h4 class="font-bold text-indigo-800 mb-2">Code Summary:</h4>
                <p class="text-gray-700">In just a few lines of code, PyTorch creates the <strong>Forget Gate, Input Gate, and Output Gate</strong> in the background. We just feed it the <strong>Deliveries</strong>, our old <strong>Backpack</strong>, and the old <strong>Conveyor Belt</strong>. PyTorch automatically applies the Squisher and Percentage Machines across all time steps!</p>
            </div>

            <div class="mt-8 text-center">
                <p class="text-2xl font-bold text-green-600">🎉 You've officially mastered the basics of LSTMs!</p>
            </div>
        `,
        dashState: { belt: "Code Mode", pack: "Code Mode", del: "Code Mode" }
    }
];

// --- STATE & DOM ELEMENTS ---
let currentStep = 0;

const contentContainer = document.getElementById('content-container');
const dashboardContainer = document.getElementById('dashboard-container');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepIndicator = document.getElementById('step-indicator');
const progressBar = document.getElementById('progress-bar');

const valBelt = document.getElementById('val-belt');
const valPack = document.getElementById('val-pack');
const valDel = document.getElementById('val-del');

const dashBelt = document.getElementById('dash-belt');
const dashPack = document.getElementById('dash-pack');
const dashDel = document.getElementById('dash-del');

// --- LOGIC ---

function renderStep() {
    const stepData = steps[currentStep];

    // 1. Setup fading transition
    contentContainer.classList.remove('fade-enter-active');
    contentContainer.classList.add('fade-enter');

    setTimeout(() => {
        // 2. Inject Content
        let html = `<h2 class="text-3xl font-bold text-indigo-700 mb-6">${stepData.title}</h2>`;
        html += stepData.content;
        contentContainer.innerHTML = html;

        // 3. Render KaTeX Formulas for dynamic content container
        if (window.renderMathInElement) {
            renderMathInElement(contentContainer, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }

        // 4. Update Dashboard with highlights
        updateDashboard(stepData.dashState, stepData.highlight);

        // 5. Update UI Controls
        btnBack.disabled = currentStep === 0;

        if (currentStep === steps.length - 1) {
            btnNext.disabled = true;
            btnNext.innerHTML = 'Finish <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else {
            btnNext.disabled = false;
            btnNext.innerHTML = 'Next <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
        }

        stepIndicator.innerText = `Step ${currentStep + 1} of ${steps.length}`;
        progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

        // Trigger fade in
        contentContainer.classList.remove('fade-enter');
        contentContainer.classList.add('fade-enter-active');
    }, 50);
}

function updateDashboard(state, highlights = []) {
    // Remove previous highlights
    dashBelt.classList.remove('animate-update');
    dashPack.classList.remove('animate-update');
    dashDel.classList.remove('animate-update');

    // Force reflow for animation restart
    void dashBelt.offsetWidth;
    void dashPack.offsetWidth;
    void dashDel.offsetWidth;

    // Update values
    if (valBelt.innerText !== state.belt) { valBelt.innerText = state.belt; }
    if (valPack.innerText !== state.pack) { valPack.innerText = state.pack; }
    if (valDel.innerText !== state.del) { valDel.innerText = state.del; }

    // Apply new highlights if requested
    if (highlights && highlights.includes('belt')) dashBelt.classList.add('animate-update');
    if (highlights && highlights.includes('pack')) dashPack.classList.add('animate-update');
    if (highlights && highlights.includes('del')) dashDel.classList.add('animate-update');
}

// --- EVENT LISTENERS ---
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // Force render KaTeX on the entire Dashboard explicitly on initial load
    if (window.renderMathInElement) {
        renderMathInElement(dashboardContainer, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }

    setTimeout(renderStep, 200);
});