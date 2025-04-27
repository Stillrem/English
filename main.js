let current = 0;

function renderCard() {
  const card = cards[current];
  document.getElementById('card').innerHTML = `
    <h2>${card.number}. ${card.ipa}</h2>
    <p><strong>Example (EN):</strong> ${card.example_en}</p>
    <p><strong>Example (RU):</strong> ${card.example_ru}</p>
    <p><strong>Lifehack:</strong> ${card.lifehack}</p>
    <div class="buttons-group">
      <button onclick="playSound('${card.audio}')">▶️ Play</button>
      <button onclick="openYouglish('${card.ipa}')">Youglish</button>
      <button onclick="openTranscription()">Transcription</button>
    </div>
  `;
  updateCardTheme();
}

function nextCard() {
  current = (current + 1) % cards.length;
  renderCard();
}

function prevCard() {
  current = (current - 1 + cards.length) % cards.length;
  renderCard();
}

function playSound(filename) {
  const audio = new Audio('sounds/' + filename);
  audio.play();
}

function openYouglish(ipa) {
  window.open(`https://youglish.com/pronounce/${ipa.replace(/\//g, '')}/english`, '_blank');
}

function openTranscription() {
  window.open('https://english-abc.ru/transcription', '_blank');
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  updateCardTheme();
}

function updateCardTheme() {
  const card = document.getElementById('card');
  if (document.body.classList.contains('light-theme')) {
    card.style.backgroundColor = '#ffffff';
    card.style.color = '#000000';
  } else {
    card.style.backgroundColor = '#1e1e1e';
    card.style.color = '#ffffff';
  }
}

function showSuggestions() {
  const input = document.getElementById('wordInput').value.toLowerCase();
  const suggestionsContainer = document.getElementById('suggestions');
  const transcriptionContainer = document.getElementById('transcription');

  suggestionsContainer.innerHTML = '';
  transcriptionContainer.innerHTML = '';

  if (input.length === 0) return;

  const matches = Object.keys(dictionary).filter(word => word.startsWith(input));

  if (matches.length === 0) {
    transcriptionContainer.innerHTML = 'Word not found.';
    return;
  }

  matches.slice(0, 5).forEach(word => {
    const div = document.createElement('div');
    div.className = 'suggestion';
    div.textContent = word;
    div.onclick = () => {
      document.getElementById('wordInput').value = word;
      transcriptionContainer.innerHTML = `Transcription: ${dictionary[word]}`;
      suggestionsContainer.innerHTML = '';
    };
    suggestionsContainer.appendChild(div);
  });
}

function createSoundButtons() {
  const container = document.getElementById('sound-buttons');
  container.innerHTML = '';
  cards.forEach((card, index) => {
    const btn = document.createElement('button');
    btn.innerText = `${card.number}. ${card.ipa}`;
    btn.onclick = () => {
      current = index;
      renderCard();
    };
    container.appendChild(btn);
  });
}

window.onload = () => {
  createSoundButtons();
  renderCard();
};
