// <!-- Replaced src with inline script for full single-file functionality -->
// Data containing all the steps, explanations, and visual HTML content
const stepsData = [
    {
        title: "The Raw Text",
        desc: "Computers only understand numbers, but human language comes as raw text. Let's start with a simple sentence.",
        visual: `
            <div class="text-3xl md:text-4xl font-serif text-gray-800 bg-white px-8 py-6 rounded-lg shadow-md border border-gray-100 text-center flex items-center">
                "The cat sat on the mat"
            </div>
        `
    },
    {
        title: "Tokenization",
        desc: "The first step is to chop the text into smaller, manageable pieces called 'tokens'. These are usually words or punctuation.",
        visual: `
            <div class="flex flex-wrap gap-3 justify-center items-center text-xl font-mono">
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">The</span>
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">cat</span>
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">sat</span>
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">on</span>
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">the</span>
                <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-sm border border-blue-200">mat</span>
            </div>
        `
    },
    {
        title: "Building a Vocabulary",
        desc: "Next, we create a 'dictionary' of all unique words in our dataset and assign an integer ID to each word. (Note: 'The' and 'the' are often lowercased to be the same).",
        visual: `
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg place-content-center">
                <div class="bg-white p-3 rounded shadow-sm border border-gray-200 flex justify-between font-mono"><span class="text-gray-500">0</span> <span class="font-bold text-indigo-700">the</span></div>
                <div class="bg-white p-3 rounded shadow-sm border border-gray-200 flex justify-between font-mono"><span class="text-gray-500">1</span> <span class="font-bold text-indigo-700">cat</span></div>
                <div class="bg-white p-3 rounded shadow-sm border border-gray-200 flex justify-between font-mono"><span class="text-gray-500">2</span> <span class="font-bold text-indigo-700">sat</span></div>
                <div class="bg-white p-3 rounded shadow-sm border border-gray-200 flex justify-between font-mono"><span class="text-gray-500">3</span> <span class="font-bold text-indigo-700">on</span></div>
                <div class="bg-white p-3 rounded shadow-sm border border-gray-200 flex justify-between font-mono"><span class="text-gray-500">4</span> <span class="font-bold text-indigo-700">mat</span></div>
            </div>
        `
    },
    {
        title: "One-Hot Encoding",
        desc: "The simplest classical representation. Each word becomes a vector of zeros, with a single '1' placed at the index of that word in the vocabulary.",
        visual: `
            <div class="flex flex-col gap-4 w-full max-w-xl font-mono text-lg justify-center">
                <div class="flex items-center gap-4">
                    <span class="w-16 text-right font-bold text-indigo-700">cat:</span>
                    <div class="flex gap-2">
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-blue-500 rounded text-white font-bold shadow-md transform scale-110">1</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="w-16 text-right font-bold text-indigo-700">mat:</span>
                    <div class="flex gap-2">
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-gray-500">0</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-blue-500 rounded text-white font-bold shadow-md transform scale-110">1</span>
                    </div>
                </div>
                <div class="text-sm text-gray-500 text-center mt-2 italic">Vocab array: [ the, cat, sat, on, mat ]</div>
            </div>
        `
    },
    {
        title: "Classical NLP Equations: TF-IDF",
        desc: "To capture a word's importance better than simple counts, Classical NLP uses Term Frequency-Inverse Document Frequency. It mathematically scales down common words (like 'the') and scales up rare, meaningful words.",
        visual: `
            <div class="w-full flex flex-col gap-6 items-center justify-center">

                <!-- TF Equation -->
                <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full max-w-2xl flex items-center gap-4">
                    <div class="font-serif text-xl font-bold text-blue-800">TF<sub class="text-xs">t,d</sub> = </div>
                    <div class="flex flex-col items-center">
                        <div class="px-2 pb-1 border-b-2 border-gray-800 text-sm">Count of term <span class="italic text-blue-600 font-bold">t</span> in document <span class="italic">d</span></div>
                        <div class="px-2 pt-1 text-sm">Total number of words in document <span class="italic">d</span></div>
                    </div>
                </div>

                <!-- IDF Equation -->
                <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full max-w-2xl flex items-center gap-4">
                    <div class="font-serif text-xl font-bold text-green-700">IDF<sub class="text-xs">t</sub> = </div>
                    <div class="flex items-center gap-2">
                        <span class="text-lg font-serif">log</span>
                        <div class="flex flex-col items-center ml-1">
                            <div class="px-2 pb-1 border-b-2 border-gray-800 text-sm">Total Number of Documents (N)</div>
                            <div class="px-2 pt-1 text-sm">Number of documents containing term <span class="italic text-green-600 font-bold">t</span></div>
                        </div>
                    </div>
                </div>

                <!-- Final TF-IDF -->
                <div class="text-lg font-serif mt-2 bg-blue-50 px-6 py-2 rounded-full text-blue-900 border border-blue-100 font-bold">
                    TF-IDF = TF × IDF
                </div>

                <!-- Button for TF-IDF Visualization -->
                <a href="./tf_idf_visualization.html" class="mt-4 px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2 cursor-pointer">
                    TF-IDF visualization
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        `
    },
    {
        title: "Word Embeddings (Deep Learning)",
        desc: "Sequence Models (like RNNs & Transformers) don't use sparse 0s and 1s. They use Dense Vectors (Embeddings) learned by the network. Words with similar meanings get similar numerical vectors!",
        visual: `
            <div class="flex flex-col gap-6 w-full max-w-xl justify-center">
                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-inner">
                    <div class="text-indigo-900 font-bold mb-2 flex items-center justify-between">
                        <span>cat</span>
                        <span class="text-xs bg-indigo-200 px-2 py-1 rounded text-indigo-800">Dense Vector (e.g., 300 dimensions)</span>
                    </div>
                    <div class="flex gap-2 font-mono text-sm overflow-x-auto pb-2 text-indigo-700">
                        <span class="bg-white px-2 py-1 rounded border border-indigo-200">[ 0.82,</span>
                        <span class="bg-white px-2 py-1 rounded border border-indigo-200">-0.14,</span>
                        <span class="bg-white px-2 py-1 rounded border border-indigo-200">0.55,</span>
                        <span class="bg-white px-2 py-1 rounded border border-indigo-200">0.03,</span>
                        <span class="bg-white px-2 py-1 rounded border border-indigo-200">... ]</span>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-xl border border-purple-100 shadow-inner">
                    <div class="text-purple-900 font-bold mb-2 flex items-center justify-between">
                        <span>dog</span> <span class="text-xs text-purple-600 italic">Notice the similarity to 'cat'!</span>
                    </div>
                    <div class="flex gap-2 font-mono text-sm overflow-x-auto pb-2 text-purple-700">
                        <span class="bg-white px-2 py-1 rounded border border-purple-200">[ 0.79,</span>
                        <span class="bg-white px-2 py-1 rounded border border-purple-200">-0.11,</span>
                        <span class="bg-white px-2 py-1 rounded border border-purple-200">0.61,</span>
                        <span class="bg-white px-2 py-1 rounded border border-purple-200">0.08,</span>
                        <span class="bg-white px-2 py-1 rounded border border-purple-200">... ]</span>
                    </div>
                </div>

                <!-- Button for Dense Vectors Visualization -->
                <div class="flex justify-center mt-2">
                    <a href="./dense_vector_visualization.html" class="px-6 py-3 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-md flex items-center gap-2 cursor-pointer">
                        Dense Vectors visualization
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        `
    },
    // NEW STEP 7 ADDED HERE
    {
        title: "Bringing it to Life with PyTorch",
        desc: "Here is how you actually create those dense vectors using Python and PyTorch. We turn our word IDs (like '1' for cat) into rich numerical representations with just a few lines of code!",
        visual: `
            <div class="bg-[#1e1e2e] rounded-xl shadow-lg p-5 font-mono text-sm text-gray-300 w-full max-w-2xl overflow-x-auto text-left border border-gray-700">
                <!-- Mac OS style window dots -->
                <div class="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="ml-2 text-gray-500 text-xs font-sans tracking-wide">embedding_tutorial.py</span>
                </div>

                <!-- Python Code -->
                <p><span class="text-pink-400 font-bold">import</span> torch</p>
                <p><span class="text-pink-400 font-bold">import</span> torch.nn <span class="text-pink-400 font-bold">as</span> nn</p>
                <br/>

                <p class="text-green-400/80 italic"># 1. Setup our Neural Network Embedding Layer</p>
                <p class="text-green-400/80 italic"># We have 5 words in vocab, each word will get a 3-number vector</p>
                <p><span class="text-blue-300">embed_layer</span> = nn.Embedding(num_embeddings=<span class="text-orange-300">5</span>, embedding_dim=<span class="text-orange-300">3</span>)</p>
                <br/>

                <p class="text-green-400/80 italic"># 2. We want the vectors for "cat" (ID: 1) and "mat" (ID: 4)</p>
                <p><span class="text-blue-300">word_ids</span> = torch.tensor([<span class="text-orange-300">1</span>, <span class="text-orange-300">4</span>])</p>
                <br/>

                <p class="text-green-400/80 italic"># 3. Magic! Pass the IDs through the layer to get Dense Vectors</p>
                <p><span class="text-blue-300">dense_vectors</span> = embed_layer(word_ids)</p>
                <br/>

                <p><span class="text-yellow-200">print</span>(dense_vectors)</p>
                <br/>

                <!-- Simulated Terminal Output -->
                <div class="bg-black/40 p-4 rounded-lg text-emerald-400 text-xs border border-gray-800 mt-2">
                    <span class="text-gray-500"># Output Terminal</span><br/><br/>
                    > tensor([[-0.2341,  1.1209, -0.4566],  <span class="text-gray-500 italic"><-- Vector for 'cat'</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0.8932, -0.0211,  0.5590]]) <span class="text-gray-500 italic"><-- Vector for 'mat'</span>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const stepCounter = document.getElementById('step-counter');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-desc');
const visualContainer = document.getElementById('visual-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const progressDots = document.getElementById('progress-dots');

// Initialize App
function init() {
    // Create progress dots
    stepsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`;
        dot.id = `dot-${index}`;
        progressDots.appendChild(dot);
    });

    // Event Listeners
    btnPrev.addEventListener('click', () => changeStep(-1));
    btnNext.addEventListener('click', () => changeStep(1));

    // Render first step
    renderStep();
}

// Handle navigation
function changeStep(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < stepsData.length) {
        currentStep = newStep;
        renderStep();
    }
}

// Render current step content
function renderStep() {
    const data = stepsData[currentStep];

    // Update text content
    stepCounter.textContent = `Step ${currentStep + 1} of ${stepsData.length}`;
    stepTitle.textContent = data.title;
    stepDesc.textContent = data.desc;

    // Update visual with brief fade animation
    visualContainer.innerHTML = ''; // Clear current

    // Allow a tiny delay so the browser registers the empty state, triggering CSS animation
    setTimeout(() => {
        const contentWrapper = document.createElement('div');
        // Updated classes: added `my-auto` and `shrink-0` to guarantee centered items aren't squished or cut-off when scrolling is required.
        contentWrapper.className = 'w-full my-auto shrink-0 flex flex-col items-center py-4 fade-in';
        contentWrapper.innerHTML = data.visual;
        visualContainer.appendChild(contentWrapper);
    }, 50);

    // Update buttons
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === stepsData.length - 1;

    // Update progress dots
    stepsData.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.replace('bg-gray-300', 'bg-blue-600');
            dot.classList.replace('bg-blue-200', 'bg-blue-600');
        } else if (index < currentStep) {
            dot.classList.replace('bg-gray-300', 'bg-blue-200');
            dot.classList.replace('bg-blue-600', 'bg-blue-200');
        } else {
            dot.classList.replace('bg-blue-600', 'bg-gray-300');
            dot.classList.replace('bg-blue-200', 'bg-gray-300');
        }
    });
}

// Start the application
init();