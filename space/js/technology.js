// Seletores principais
const tabs = document.querySelectorAll('.tech-tabs .tech-tab');
const techImages = document.querySelectorAll('.tech-hero .tech-image');
const techTitle = document.querySelector('.tech-title');
const techSubtitle = document.querySelector('.tech-subtitle');
const techDescription = document.querySelector('.tech-description');

// Dados das seções (garanta que as chaves batam com data-tech dos botões)
const techData = {
  vehicle: {
    subtitle: 'THE TERMINOLOGY',
    title: 'LAUNCH VEHICLE',
    description: `A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!`
  },
  payload: {
    subtitle: 'THE TERMINOLOGY',
    title: 'SPACEPORT',
    description: `A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.`
  },
  structure: {
    subtitle: 'THE TERMINOLOGY',
    title: 'SPACE CAPSULE',
    description: `A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.`
  }
};

// Helper: limpa estados de transição existentes
function clearTransitionClasses(el) {
  el.classList.remove('enter-right', 'exit-left');
}

// Atualiza estado visual da tab
function setActiveTab(clickedTab) {
  const previous = document.querySelector('.tech-tabs .active');
  if (previous && previous !== clickedTab) previous.classList.remove('active');
  clickedTab.classList.add('active');
}

// Troca de imagem com sincronização por transitionend
function switchImage(techKey) {
  if (!techKey) return;
  const nextImg = document.querySelector(`#${techKey}-img`);
  const current = document.querySelector('.tech-hero .tech-image.active');

  if (!nextImg || current === nextImg) return;

  // Prepara saída da atual e entrada da próxima
  current.classList.remove('active');
  clearTransitionClasses(current);
  current.classList.add('exit-left');

  // Marcar next como entrando
  clearTransitionClasses(nextImg);
  nextImg.classList.add('enter-right');

  // Após a transição do next (propriedade transform), finalizar troca
  const onTransitionEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    nextImg.removeEventListener('transitionend', onTransitionEnd);

    // limpar estados e ativar próximo
    clearTransitionClasses(current);
    clearTransitionClasses(nextImg);
    nextImg.classList.add('active');
  };

  nextImg.addEventListener('transitionend', onTransitionEnd);
}

// Atualiza textos com dados seguros
function updateTexts(key) {
  const data = techData[key];
  if (!data) return;
  if (techSubtitle) techSubtitle.textContent = data.subtitle;
  if (techTitle) techTitle.textContent = data.title;
  if (techDescription) techDescription.textContent = data.description;
}

// Handler para clique nas tabs
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const techKey = tab.dataset?.tech;
    if (!techKey) return;

    // Atualiza visual da tab
    setActiveTab(tab);

    // Troca imagem e textos
    switchImage(techKey);
    updateTexts(techKey);
  });
});

// Acessibilidade: permitir seleção via teclado (Enter / Space) quando o foco estiver na tab
tabs.forEach(tab => {
  tab.setAttribute('role', 'button');
  tab.setAttribute('tabindex', '0');
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tab.click();
    }
  });
});
