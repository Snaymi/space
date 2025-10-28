// Seletores principais
const tabs = document.querySelectorAll('.planet-tabs .tab');
const planetImages = document.querySelectorAll('.planet-hero .planet');
const planetTitle = document.querySelector('.right-destination h1');
const planetDescription = document.querySelector('.planet-description');
const planetStats = document.querySelectorAll('.stat .value');

// Dados dos planetas
const planets = {
    moon: {
        name: 'MOON',
        img: 'img/moon.webp',
        description: `See our planet as you’ve never seen it before. 
    A perfect relaxing trip away to help regain perspective and come back refreshed. 
    While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.`,
        distance: '384,400 KM',
        travel: '3 DAYS'
    },
    mars: {
        name: 'MARS',
        img: 'img/mars.webp',
        description: `Don’t forget to pack your hiking boots. 
    You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. 
    It’s two and a half times the size of Everest!`,
        distance: '225 MIL. KM',
        travel: '9 MONTHS'
    },
    europa: {
        name: "EUROPA",
        image: "img/europe.webp",
        description:
            "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
        distance: "628 MIL. KM",
        travel:'3 YEARS'
    },
  titan: {
        name: 'TITAN',
        img: 'img/titan.webp',
        description: `The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.`,
        distance: '1.6 BIL. KM',
        travel: '7 YEARS'
    }
};

// Função principal de troca
tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();

        // Remove estado ativo anterior
        document.querySelector('.planet-tabs .active')?.classList.remove('active');
        tab.classList.add('active');

        // Identifica planeta selecionado
        const selected = tab.textContent.trim().toLowerCase();
        const newData = planets[selected];

        // Animação de transição de imagem
        const currentActive = document.querySelector('.planet-hero .planet.active');
        const nextImage = document.querySelector(`#${selected}-img`);

        if (currentActive !== nextImage) {
            // Sai a imagem atual
            currentActive.classList.remove('active');
            currentActive.classList.add('exit-left');

            // Entra a nova imagem
            nextImage.classList.add('enter-right');

            // Reseta as classes após a transição
            setTimeout(() => {
                currentActive.classList.remove('exit-left');
                nextImage.classList.remove('enter-right');
                nextImage.classList.add('active');
            }, 800);
        }

        // Atualiza textos
        planetTitle.textContent = newData.name;
        planetDescription.textContent = newData.description;
        planetStats[0].textContent = newData.distance;
        planetStats[1].textContent = newData.travel;
    });
});
