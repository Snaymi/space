// Seletores principais
const tabs = document.querySelectorAll('.crew-tabs .crew-tab');
const crewPhotos = document.querySelectorAll('.crew-hero .crew-photo');
const roleEl = document.querySelector('.role');
const nameEl = document.querySelector('.crew-name');
const bioEl = document.querySelector('.crew-bio');

// Dados dos membros
const crew = {
  douglas: {
    role: 'COMMANDER',
    name: 'DOUGLAS HURLEY',
    img: 'img/douglas.webp',
    bio: `Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.`
  },
  mark: {
    role: 'PILOT',
    name: 'MARK SHUTTLEWORTH',
    img: 'img/mark.webp',
    bio: `Mark Richard Shuttleworth is a South African entrepreneur and space tourist.`
  },
  victor: {
    role: 'MISSION SPECIALIST',
    name: 'VICTOR GLOVER',
    img: 'img/victor.webp',
    bio: `Victor Jerome Glover is an American naval aviator and NASA astronaut.`
  },
  anousheh: {
    role: 'FLIGHT ENGINEER',
    name: 'ANOUSHEH ANSARI',
    img: 'img/anousheh.webp',
    bio: `Anousheh Ansari is an Iranian American engineer and the first female private space explorer.`
  }
};

// Função utilitária para obter membro selecionado
function getMemberFromTab(tab) {
  return tab.querySelector('a')?.dataset?.member || tab.textContent.trim().toLowerCase();
}

// Atualiza estado visual das tabs
function setActiveTab(tab) {
  const previous = document.querySelector('.crew-tabs .active');
  if (previous) previous.classList.remove('active');
  tab.classList.add('active');
}

// Troca de foto com sincronização via transitionend
function switchPhoto(nextId) {
  const current = document.querySelector('.crew-hero .crew-photo.active');
  const next = document.querySelector(`#${nextId}-img`);
  if (!next || current === next) return;

  // prepara transição
  current.classList.remove('active');
  current.classList.add('exit-left');

  next.classList.add('enter-right');

  // aguarda evento de transição do elemento next
  function onNextTransition(e) {
    if (e.propertyName !== 'transform') return;
    next.removeEventListener('transitionend', onNextTransition);
    // limpa estados e ativa próximo
    current.classList.remove('exit-left');
    next.classList.remove('enter-right');
    next.classList.add('active');
  }
  next.addEventListener('transitionend', onNextTransition);
}

// Atualiza textos
function updateTexts(data) {
  roleEl.textContent = data.role;
  nameEl.textContent = data.name;
  bioEl.textContent = data.bio;
}

// Handler de clique nas tabs
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const member = getMemberFromTab(tab);
    const data = crew[member];
    if (!data) return;

    setActiveTab(tab);
    switchPhoto(member);
    updateTexts(data);
  });
});