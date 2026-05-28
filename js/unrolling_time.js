// Data structure containing the story and corresponding visual states
const stepsData = [
    {
        title: "1. The Normal Loop",
        text: "Imagine you are reading a comic strip about a little girl named Mia.<br><br>Instead of reading a comic book where you turn the pages, imagine I give you a stack of pictures. If you look at them one by one, in the same spot, that is like the normal <strong>loop</strong> of an RNN.",
        visible: ['rnn-t', 'loop-arrow'],
        highlights: []
    },
    {
        title: "2. Unrolling in Time",
        text: "<strong>'Unrolling in time'</strong> just means we take all those pictures and lay them out side-by-side on the floor, from left to right, so we can see the whole story as a timeline.",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1'],
        highlights: []
    },
    {
        title: "3. The RNN Box (Your Brain)",
        text: "The purple RNN box is you (your brain), looking at the comic strip.<br><br>Notice how there are three boxes in the picture now? It’s not three different people; it’s just <strong>you</strong> looking at the story at three different times (past, present, and future).",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1'],
        highlights: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1']
    },
    {
        title: "4. The Input - Past",
        text: "The arrows pointing up from the bottom ($x$) are the individual pictures in the comic strip.<br><br><strong>$x_{t-1}$ (Past):</strong> You look at the first picture. Mia is holding a deflated balloon.",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1'],
        highlights: ['in-box-t-1']
    },
    {
        title: "5. The Hidden State - Memory",
        text: "This is the most important part! The pink arrows pointing to the right ($h$) represent your <strong>memory</strong>.<br><br>Because of the pink arrow ($h_{t-1}$) coming from the first box, you remember that it is a deflated balloon.",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1', 'h-arr-1', 'h-lbl-1'],
        highlights: ['h-arr-1']
    },
    {
        title: "6. The Input - Present",
        text: "<strong>$x_t$ (Present):</strong> You look at the second picture. Mia is blowing air.<br><br>When you look at this middle picture ($x_t$), you don't just see a girl blowing air. You mix it with what you remember from a second ago ($h_{t-1}$) to understand what is going on.",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1', 'h-arr-1', 'h-lbl-1', 'in-arr-t', 'in-box-t'],
        highlights: ['in-box-t', 'rnn-t']
    },
    {
        title: "7. The Output",
        text: "The arrows pointing up at the top ($y$) are your thoughts or guesses about the story.<br><br>In the middle step, your brain takes the picture ($x_t$) and your memory ($h_{t-1}$), and you say out loud: <em>'She is blowing up a balloon!'</em> That is your output ($y_t$).",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1', 'h-arr-1', 'h-lbl-1', 'in-arr-t', 'in-box-t', 'out-arr-t', 'out-box-t'],
        highlights: ['out-box-t']
    },
    {
        title: "8. The Future Step",
        text: "The story continues to the right.<br><br><strong>$x_{t+1}$ (Future):</strong> You look at the third picture. The balloon is huge! Your updated memory ($h_t$) flows into the next step, allowing you to conclude the story.",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1', 'h-arr-1', 'h-lbl-1', 'in-arr-t', 'in-box-t', 'out-arr-t', 'out-box-t', 'h-arr-2', 'h-lbl-2', 'in-arr-t-plus-1', 'in-box-t-plus-1', 'out-arr-t-plus-1', 'out-box-t-plus-1'],
        highlights: []
    },
    {
        title: "9. Summary & Formulas",
        text: "Unrolling in time just means laying out a story side-by-side. At each step, you look at a new picture ($x$), mix it with what you remember ($h$), and output what is happening ($y$).<br><br>Here is how a computer writes that combination using math:<br><br><strong>Hidden State (Memory Update):</strong><br> $$h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$$ <br><strong>Output (Your Thought):</strong><br> $$y_t = W_{hy} h_t + b_y$$",
        visible: ['rnn-t-1', 'rnn-t', 'rnn-t-plus-1', 'in-arr-t-1', 'in-box-t-1', 'h-arr-1', 'h-lbl-1', 'in-arr-t', 'in-box-t', 'out-arr-t', 'out-box-t', 'h-arr-2', 'h-lbl-2', 'in-arr-t-plus-1', 'in-box-t-plus-1', 'out-arr-t-plus-1', 'out-box-t-plus-1', 'out-arr-t-1', 'out-box-t-1'],
        highlights: []
    }
];

let currentStep = 0;

// List of all element IDs in the SVG/Diagram
const allDiagramElements = [
    'loop-arrow',
    'rnn-t-1', 'rnn-t', 'rnn-t-plus-1',
    'in-arr-t-1', 'in-box-t-1',
    'in-arr-t', 'in-box-t',
    'in-arr-t-plus-1', 'in-box-t-plus-1',
    'h-arr-1', 'h-lbl-1',
    'h-arr-2', 'h-lbl-2',
    'out-arr-t-1', 'out-box-t-1',
    'out-arr-t', 'out-box-t',
    'out-arr-t-plus-1', 'out-box-t-plus-1'
];

function init() {
    // Render Math for the static diagram elements globally first
    renderMathInElement(document.querySelector('main'), {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });

    renderStep();
}

function changeStep(direction) {
    const nextStep = currentStep + direction;
    if (nextStep >= 0 && nextStep < stepsData.length) {
        currentStep = nextStep;
        renderStep();
    }
}

function renderStep() {
    const data = stepsData[currentStep];

    // 1. Update text content
    document.getElementById('step-title').innerHTML = data.title;
    document.getElementById('step-content').innerHTML = data.text;
    document.getElementById('progress').innerText = `Step ${currentStep + 1} of ${stepsData.length}`;

    // 2. Render KaTeX formulas
    renderMathInElement(document.getElementById('step-content'), {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
        ],
        throwOnError: false
    });

    // 3. Update visibility of diagram elements
    allDiagramElements.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (data.visible.includes(id)) {
            el.classList.remove('opacity-0', 'scale-90');
            el.classList.add('opacity-100', 'scale-100');
        } else {
            el.classList.remove('opacity-100', 'scale-100');
            el.classList.add('opacity-0', 'scale-90');
        }

        // Remove highlight rings from previous steps
        el.classList.remove('ring-opacity-100');
        el.classList.add('ring-opacity-0');
    });

    // 4. Add highlights to specific elements for emphasis
    if (data.highlights) {
        data.highlights.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                // Using Tailwind ring utility classes defined conditionally in HTML
                el.classList.remove('ring-opacity-0');
                el.classList.add('ring-opacity-100');
            }
        });
    }

    // 5. Update button states
    document.getElementById('btn-prev').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === stepsData.length - 1;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);