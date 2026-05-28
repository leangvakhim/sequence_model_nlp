let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageIndicator = document.getElementById('page-indicator');
const progressBar = document.getElementById('progress-bar');
const slideContainer = document.getElementById('slide-container');

function updateUI() {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Show current slide
    slides[currentSlideIndex].classList.add('active');

    // Scroll container back to top
    slideContainer.scrollTop = 0;

    // Update buttons
    btnPrev.disabled = currentSlideIndex === 0;

    if (currentSlideIndex === totalSlides - 1) {
        btnNext.innerHTML = 'Finish <i class="ph ph-check"></i>';
        btnNext.classList.replace('bg-indigo-600', 'bg-emerald-600');
        btnNext.classList.replace('hover:bg-indigo-700', 'hover:bg-emerald-700');
    } else {
        btnNext.innerHTML = 'Next <i class="ph ph-arrow-right"></i>';
        btnNext.classList.replace('bg-emerald-600', 'bg-indigo-600');
        btnNext.classList.replace('hover:bg-emerald-700', 'hover:bg-indigo-700');
    }

    // Update indicator & progress
    pageIndicator.innerText = `Step ${currentSlideIndex + 1} of ${totalSlides}`;
    const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Re-render MathJax just in case (though usually fine if pre-rendered)
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < totalSlides) {
        currentSlideIndex = newIndex;
        updateUI();
    }
}

// Initialize UI
updateUI();

// Game Logic
function calculateGame(word, countInDoc, docsWithTerm) {
    const totalWords = 1000;
    const totalDocs = 10000;

    // Math
    const tf = countInDoc / totalWords;
    const idfRatio = totalDocs / docsWithTerm;
    const idf = Math.log10(idfRatio);
    const tfidf = tf * idf;

    // UI Update
    document.getElementById('game-results').classList.remove('hidden');
    document.getElementById('res-word').innerText = `"${word}"`;

    document.getElementById('res-count').innerText = countInDoc;
    document.getElementById('res-docs').innerText = docsWithTerm;

    document.getElementById('res-tf').innerText = tf.toFixed(3);
    document.getElementById('res-idf').innerText = idf.toFixed(2);
    document.getElementById('res-tfidf').innerText = tfidf.toFixed(4);

    const verdictEl = document.getElementById('res-verdict');
    if (tfidf === 0) {
        verdictEl.innerText = "Useless word! It's too common everywhere.";
        verdictEl.className = "text-center text-lg font-semibold p-3 rounded-lg bg-red-100 text-red-800";
    } else if (tfidf < 0.05) {
        verdictEl.innerText = "Not very important. Low score.";
        verdictEl.className = "text-center text-lg font-semibold p-3 rounded-lg bg-amber-100 text-amber-800";
    } else {
        verdictEl.innerText = "BINGO! High score! This book is likely about " + word + "s!";
        verdictEl.className = "text-center text-lg font-semibold p-3 rounded-lg bg-emerald-100 text-emerald-800 animate-pulse";
    }

    // Scroll to bottom of container to see results
    setTimeout(() => {
        slideContainer.scrollTo({
            top: slideContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}