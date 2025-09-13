const plantInput = document.getElementById('plant');
const animalInput = document.getElementById('animal');
const makeBtn = document.getElementById('makeBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const poemTitle = document.getElementById('poemTitle');
const poemDiv = document.getElementById('poem');

// Generate poem lines
function generatePoem(plant, animal) {
  plant = plant || 'orchid';
  animal = animal || 'dolphin';
  return [
    `Wake up the ${plant}`,
    `The morning has come`,
    `Rouse the ${animal}`,
    `Because the coffee needs to be done`,
    `'I need the coffee now', says the ${plant}`,
    `Look around, coffee there is none`,
    `All because the ${animal} has to run`
  ];
}

// Render poem lines in DOM
function renderPoem(lines) {
  poemDiv.innerHTML = '';
  if (!lines || lines.length === 0) return;
  lines.forEach((ln) => {
    const p = document.createElement('p');
    p.className = 'poem-line';
    p.textContent = ln;
    poemDiv.appendChild(p);
  });
}

function setTitle(plant, animal) {
  poemTitle.textContent = plant && animal ? `The ${plant} and the ${animal}` : '';
}

function animate(el) {
  el.classList.remove('fade-in');
  void el.offsetWidth;
  el.classList.add('fade-in');
}

// Make / Remake poem
function make() {
  const plant = plantInput.value.trim() || 'orchid';
  const animal = animalInput.value.trim() || 'dolphin';
  setTitle(plant, animal);
  const lines = generatePoem(plant, animal);
  renderPoem(lines);
  animate(poemDiv);
  makeBtn.textContent = 'Remake';
  copyBtn.style.display = 'inline-block'; // show copy button
}

// Reset inputs
resetBtn.addEventListener('click', () => {
  plantInput.value = '';
  animalInput.value = '';
  poemTitle.textContent = '';
  poemDiv.innerHTML = '';
  makeBtn.textContent = 'Make / Remake';
  copyBtn.style.display = 'none';
  plantInput.focus();
});

// Trigger make on click
makeBtn.addEventListener('click', make);

// Allow Enter key to trigger generation
[plantInput, animalInput].forEach(inp => {
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      make();
    }
  });
});

// Copy poem to clipboard
function copyPoem() {
  const title = poemTitle.textContent;
  const lines = Array.from(poemDiv.querySelectorAll('.poem-line')).map(p => p.textContent);
  const text = title + "\n\n" + lines.join("\n");

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy Poem", 2000);
  });
}

copyBtn.addEventListener('click', copyPoem);

// Optional: Generate poem from URL params
(function tryFromQuery() {
  try {
    const params = new URLSearchParams(location.search);
    const p = params.get('plant');
    const a = params.get('animal');
    if (p || a) {
      plantInput.value = p || '';
      animalInput.value = a || '';
      make();
    }
  } catch (e) {
    // ignore
  }
})();
