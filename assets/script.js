/* ---------------------------
   Contador (só sobe)
   --------------------------- */
(function() {
  const playerCountEl = document.querySelector('.players span');
  if (!playerCountEl) return;
  let playerCount = Number(playerCountEl.textContent.replace(/[^\d]/g, '')) || 100;
  playerCountEl.textContent = `⚽️ ${playerCount}`;
  
  function aumentarContador() {
    const incremento = Math.floor(Math.random() * 5) + 1; // 1..5
    playerCount += incremento;
    playerCountEl.textContent = `⚽️ ${playerCount}`;
    const intervalo = Math.random() * 2000 + 1000; // 1..3s
    setTimeout(aumentarContador, intervalo);
  }
  setTimeout(aumentarContador, 1200);
})();

/* ---------------------------
   Menu lateral (hamburger)
   --------------------------- */
const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');

if (menuIcon && sideMenu) {
  menuIcon.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
  });
  // fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });
}

/* ---------------------------
   Idiomas (troca de texto + bandeira)
   --------------------------- */
const i18n = {
  pt: {
    'menu.campeoes': '🏆 Campeões',
    'menu.times': '⚽ Times',
    'hero.subtitle': 'O MELHOR E MAIS COMPLETO SERVIDOR DE',
    'hero.highlight': 'BATTLE',
    'hero.title': 'ROYALE!',
    'hero.description': 'Alcance o auge da competição e enfrente os melhores jogadores no mais épico Battle Royale de todos os tempos!',
    'hero.play': 'JOGUE AGORA'
  },
  en: {
    'menu.campeoes': '🏆 Champions',
    'menu.times': '⚽ Teams',
    'hero.subtitle': 'THE LARGEST AND MOST COMPLETE SERVER OF',
    'hero.highlight': 'BATTLE',
    'hero.title': 'ROYALE!',
    'hero.description': 'Reach the peak of competition and face the best players in the most epic Battle Royale of all time!',
    'hero.play': 'PLAY NOW'
  },
  es: {
    'menu.campeoes': '🏆 Campeones',
    'menu.times': '⚽ Equipos',
    'hero.subtitle': 'EL SERVIDOR MÁS GRANDE Y COMPLETO DE',
    'hero.highlight': 'BATTLE',
    'hero.title': 'ROYALE!',
    'hero.description': 'Alcanza la cima de la competición y enfrenta a los mejores en el Battle Royale más épico de todos los tiempos!',
    'hero.play': 'JUGAR AHORA'
  }
};

const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const mainFlag = document.getElementById('mainFlag');
let currentLang = 'pt';

if (langBtn) {
  // abrir dropdown
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langBtn.classList.toggle('open');
  });
  // fechar clicando fora
  document.addEventListener('click', () => {
    langBtn.classList.remove('open');
  });
  
  // botões de bandeira
  document.querySelectorAll('.flag-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const selected = btn.getAttribute('data-lang');
      if (!selected) return;
      currentLang = selected;
      // troca emoji principal
      if (selected === 'pt') mainFlag.textContent = '🇧🇷';
      if (selected === 'en') mainFlag.textContent = '🇺🇸';
      if (selected === 'es') mainFlag.textContent = '🇪🇸'
      
      // aplica traduções nos elementos que têm atributo data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const parts = key.split('.');
        // suporte a keys compostas (menu.campeoes etc.)
        const txt = i18n[selected][key] || i18n[selected][parts.join('.')] || i18n[selected][key];
        if (txt !== undefined) {
          if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
            el.placeholder = txt;
          } else {
            el.innerText = txt;
          }
        }
      });
      
      // fechar dropdown
      langBtn.classList.remove('open');
    });
  });
}

/* ---------------------------
   Fechar sideMenu com ESC
   --------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sideMenu.classList.remove('open');
    langBtn.classList.remove('open');
  }
});
