// ========== PANTALLA DE CARGA ==========
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const deviceModal = document.getElementById('deviceModal');

// Verificar si ya se seleccionó dispositivo antes
let devicePreference = localStorage.getItem('devicePreference');

// Simular carga
window.addEventListener('load', function() {
    // Esperar a que la barra de carga complete (2.5s de animación)
    setTimeout(function() {
        // Fade out de la pantalla de carga
        loadingScreen.classList.add('fade-out');
        
        // Después del fade out, mostrar el modal de dispositivo si es necesario
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            
            // Si ya tiene preferencia guardada, aplicarla y no mostrar modal
            if (devicePreference) {
                document.body.classList.add(devicePreference);
                // Iniciar mensajes del chibi después de cargar
                setTimeout(showRandomMessage, 2000);
                setInterval(showRandomMessage, 15000);
            } else {
                // Primera vez, mostrar modal de selección
                deviceModal.classList.add('show');
            }
        }, 800); // Duración del fade-out
    }, 2500); // Duración de la barra de carga
});

// ========== PARTÍCULAS ANIMADAS ==========
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    const colors = [
        'rgba(138, 43, 226, 0.6)',
        'rgba(255, 0, 102, 0.6)',
        'rgba(0, 255, 255, 0.6)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particlesContainer.appendChild(particle);
}

// ========== SELECCIÓN DE DISPOSITIVO ==========
const pcBtn = document.getElementById('pcBtn');
const mobileBtn = document.getElementById('mobileBtn');

// Selección PC
pcBtn.addEventListener('click', function() {
    localStorage.setItem('devicePreference', 'pc-mode');
    document.body.classList.remove('mobile-mode');
    document.body.classList.add('pc-mode');
    deviceModal.classList.remove('show');
    
    // Iniciar mensajes del chibi
    setTimeout(showRandomMessage, 2000);
    setInterval(showRandomMessage, 15000);
});

// Selección Mobile
mobileBtn.addEventListener('click', function() {
    localStorage.setItem('devicePreference', 'mobile-mode');
    document.body.classList.remove('pc-mode');
    document.body.classList.add('mobile-mode');
    deviceModal.classList.remove('show');
    
    // Iniciar mensajes del chibi
    setTimeout(showRandomMessage, 2000);
    setInterval(showRandomMessage, 15000);
});

// ========== MODALES ==========
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

// Modal de Quejas
const quejasModal = document.getElementById('quejasModal');
const quejasBtn = document.getElementById('quejasBtn');
const quejasCloseBtn = document.getElementById('quejasCloseBtn');
const quejasModalCloseBtn = document.getElementById('quejasModalCloseBtn');
const copyEmailBtn = document.getElementById('copyEmailBtn');

// Modal de Juego de Energía
const energyGameModal = document.getElementById('energyGameModal');
const energyGameBtn = document.getElementById('energyGameBtn');
const energyGameCloseBtn = document.getElementById('energyGameCloseBtn');
const generateEnergyBtn = document.getElementById('generateEnergyBtn');
const energyCounter = document.getElementById('energyCounter');
const totalEnergy = document.getElementById('totalEnergy');
const bestStreak = document.getElementById('bestStreak');
const energyLevel = document.getElementById('energyLevel');
const resetEnergyBtn = document.getElementById('resetEnergyBtn');
const energyParticles = document.getElementById('energyParticles');

// Modal de Estadísticas
const statsModal = document.getElementById('statsModal');
const statsBtn = document.getElementById('statsBtn');
const statsCloseBtn = document.getElementById('statsCloseBtn');
const memberCount = document.getElementById('memberCount');
const onlineCount = document.getElementById('onlineCount');

// Modal de Secretos
const secretsModal = document.getElementById('secretsModal');
const secretsBtn = document.getElementById('secretsBtn');
const secretsCloseBtn = document.getElementById('secretsCloseBtn');
const easterEggOverlay = document.getElementById('easterEggOverlay');

// Input de secretos móvil
const secretCodeInput = document.getElementById('secretCodeInput');
const submitSecretBtn = document.getElementById('submitSecretBtn');

// Variables del juego de energía
let currentEnergy = 0;
let totalEnergyGenerated = 0;
let clickStreak = 0;
let maxStreak = 0;

// Niveles de energía
const energyLevels = [
    { threshold: 0, name: 'Grado 4' },
    { threshold: 50, name: 'Grado 3' },
    { threshold: 150, name: 'Grado 2' },
    { threshold: 300, name: 'Grado 1' },
    { threshold: 500, name: 'Grado Especial' },
    { threshold: 1000, name: 'Rey de las Maldiciones' }
];

// Easter Eggs
const secretCodes = {
    sukuna: ['s', 'u', 'k', 'u', 'n', 'a'],
    gojo: ['g', 'o', 'j', 'o'],
    domain: ['d', 'o', 'm', 'a', 'i', 'n'],
    curse: ['c', 'u', 'r', 's', 'e'],
    era: ['e', 'r', 'a'],
    dusk: ['d', 'u', 's', 'k']
};

const secretGifs = {
    sukuna: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374458975912113/descarga.gif?ex=6983c9c8&is=69827848&hm=50b5bd2a8278314daa5ad95ebe48c563181ae7090f161d53b37be57e9ee1a322&',
    gojo: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374437433708781/descarga_1.gif?ex=6983c9c2&is=69827842&hm=77e967bfa342f3ee25e2de532f013d564fde59ff97cee957f7520e0dc5149d26&',
    domain: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374411299000555/GOJO_USES_HIS_DOMAIN_EXPANSION___Jujutsu_Kaisen_-_4K_on_Make_a_GIF.gif?ex=6983c9bc&is=6982783c&hm=94950845fd8e0f907c39350f67d1f2bea8014831c2db2225b1f1a2ecfbe1fc07&',
    curse: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374418970509414/descarga_2.gif?ex=6983c9be&is=6982783e&hm=71b330f63c7a059f5638e214f163b7c6e65a6608a0236e47bb13c2bc1eb6947e&',
    era: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468377281310363841/yuta-okkotsu-cursed-energy.gif?ex=6983cc68&is=69827ae8&hm=f4095524c8624b1055deaca82331ed01354fbc1c482e87031059196adce6b45e&',
    dusk: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468395480898867250/descarga.jpg?ex=6983dd5c&is=69828bdc&hm=61a43f838180faaa004fa597572ae366e5b5a8ebd601dd7f2c5b77f0a1a97b4e&'
}; 

const secretNames = {
    sukuna: 'Rey de las Maldiciones',
    gojo: 'Infinito',
    domain: 'Expansión de Dominio',
    curse: 'Energía Maldita',
    era: 'Cursed Era',
    dusk: 'Ocaso'
};

const secretIcons = {
    sukuna: '👹',
    gojo: '♾️',
    domain: '🌀',
    curse: '⚡',
    era: '💀',
    dusk: '🌙'
};

let keySequence = [];
let discoveredSecrets = JSON.parse(localStorage.getItem('discoveredSecrets')) || {
    sukuna: false,
    gojo: false,
    domain: false,
    curse: false,
    era: false,
    dusk: false  // <-- AGREGAR
};

// ========== FUNCIONALIDAD DE INPUT MÓVIL PARA SECRETOS ==========
function checkSecretFromInput(inputValue) {
    const normalizedInput = inputValue.toLowerCase().trim();
    
    // Verificar cada código secreto
    for (const [key, code] of Object.entries(secretCodes)) {
        const codeString = code.join('');
        if (normalizedInput === codeString) {
            if (!discoveredSecrets[key]) {
                // Nuevo secreto descubierto
                discoveredSecrets[key] = true;
                saveDiscoveredSecrets();
                
                // Activar efecto visual
                switch(key) {
                    case 'sukuna':
                        triggerSukunaEffect();
                        break;
                    case 'gojo':
                        triggerGojoEffect();
                        break;
                    case 'domain':
                        triggerDomainEffect();
                        break;
                    case 'curse':
                        triggerCurseEffect();
                        break;
                    case 'era':
                        triggerEraEffect();
                        break;
                        case 'dusk':
                        triggerDuskEffect();
                        break;
                }
                
                // Actualizar UI
                updateSecretsUI();
                
                // Limpiar input
                secretCodeInput.value = '';
                
                // Mostrar notificación de éxito
                showSuccessNotification(`¡Secreto desbloqueado: ${secretNames[key]}! ${secretIcons[key]}`);
                
                return true;
            } else {
                // Secreto ya descubierto
                showInfoNotification(`Ya descubriste este secreto: ${secretNames[key]} ${secretIcons[key]}`);
                secretCodeInput.value = '';
                return true;
            }
        }
    }
    
    // Código incorrecto
    return false;
}

// Event listener para el botón de submit
if (submitSecretBtn) {
    submitSecretBtn.addEventListener('click', function() {
        const inputValue = secretCodeInput.value;
        
        if (!inputValue.trim()) {
            showErrorNotification('Por favor, escribe un código secreto');
            return;
        }
        
        const found = checkSecretFromInput(inputValue);
        
        if (!found) {
            showErrorNotification('Código incorrecto. ¡Sigue intentando!');
            secretCodeInput.classList.add('shake-animation');
            setTimeout(() => {
                secretCodeInput.classList.remove('shake-animation');
            }, 500);
        }
    });
}

// Event listener para Enter en el input
if (secretCodeInput) {
    secretCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitSecretBtn.click();
        }
    });
}

// Función para mostrar notificación de éxito
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'secret-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #00ff00, #00cc00);
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 255, 0, 0.8);
        animation: slideDown 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Función para mostrar notificación de info
function showInfoNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'secret-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #00ffff, #0088ff);
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 255, 255, 0.8);
        animation: slideDown 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Función para mostrar notificación de error
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'secret-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff0066, #cc0044);
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(255, 0, 102, 0.8);
        animation: slideDown 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

// Actualizar UI de secretos al cargar
function updateSecretsUI() {
    let discovered = 0;
  const secrets = ['sukuna', 'gojo', 'domain', 'curse', 'era', 'dusk'];
    
    secrets.forEach((key, index) => {
        const secretCard = document.getElementById(`secretCard${index + 1}`);
        if (secretCard) {
            if (discoveredSecrets[key]) {
                secretCard.classList.add('discovered');
                secretCard.innerHTML = `
                    <div class="secret-icon">${secretIcons[key]}</div>
                    <div class="secret-name">${secretNames[key]}</div>
                `;
                discovered++;
            } else {
                secretCard.classList.remove('discovered');
                secretCard.innerHTML = `
                    <div class="secret-lock">🔒</div>
                    <div class="secret-icon">${secretIcons[key]}</div>
                    <div class="secret-name">???</div>
                `;
            }
        }
    });
    
    const progress = (discovered / 6) * 100;
    const progressBar = document.getElementById('secretsProgress');
    const progressText = document.getElementById('secretsText');
    
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressText) progressText.textContent = `${discovered} / 6`;
}

// ========== CHIBI ASSISTANT ==========
const chibiAssistant = document.getElementById('chibiAssistant');
const speechBubble = document.getElementById('speechBubble');

// Mensajes aleatorios para el chibi
const chibiMessages = [
    "¡Hola! ¿Necesitas ayuda? 😊",
    "¡Bienvenido a Cursed Era II! ✨",
    "¿Listo para una aventura? 🎭",
    "¡Haz click para chatear conmigo! 💬",
    "¿Tienes alguna pregunta? 🤔",
    "¡Explora el servidor! ⚔️",
    "¡Despierta tu energía maldita! 🌟",
    "¿Necesitas orientación? Estoy aquí 💜"
];

let currentMessageIndex = 0;

// Mostrar burbuja de diálogo aleatoriamente
function showRandomMessage() {
    if (!speechBubble) return;
    
    currentMessageIndex = Math.floor(Math.random() * chibiMessages.length);
    speechBubble.textContent = chibiMessages[currentMessageIndex];
    speechBubble.classList.add('show');
    
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 4000);
}

// ========== MENSAJES PERSONALIZADOS PARA SECCIONES ==========
const sectionMessages = {
    'sugerencias': {
        title: 'Sugerencias',
        text: '¡Pronto podrás enviarnos tus sugerencias! Esta sección está en desarrollo. Estamos trabajando para que puedas compartir tus ideas y mejorar Cursed Era II.'
    },
    'reclamar': {
        title: 'Reclamar',
        text: '¡Sección de reclamos en construcción! Pronto podrás reclamar recompensas, códigos especiales y más. ¡No te lo pierdas!'
    }
};

// Agregar eventos a los links de navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const section = this.getAttribute('data-section');
        
        if (section && modal && modalTitle && modalText) {
            e.preventDefault();
            const message = sectionMessages[section];
            modalTitle.textContent = message.title;
            modalText.textContent = message.text;
            modal.style.display = 'block';
        }
    });
});

// Abrir modal de quejas
if (quejasBtn && quejasModal) {
    quejasBtn.addEventListener('click', function(e) {
        e.preventDefault();
        quejasModal.style.display = 'block';
    });
}

// ========== JUEGO DE ENERGÍA MALDITA ==========
if (energyGameBtn && energyGameModal) {
    energyGameBtn.addEventListener('click', function(e) {
        e.preventDefault();
        energyGameModal.style.display = 'block';
        loadEnergyStats();
    });
}

function generateEnergy() {
    const amount = Math.floor(Math.random() * 10) + 5;
    currentEnergy += amount;
    totalEnergyGenerated += amount;
    clickStreak++;
    
    if (clickStreak > maxStreak) {
        maxStreak = clickStreak;
    }
    
    // Actualizar UI
    if (energyCounter) energyCounter.textContent = currentEnergy;
    if (totalEnergy) totalEnergy.textContent = totalEnergyGenerated;
    if (bestStreak) bestStreak.textContent = maxStreak;
    
    // Actualizar nivel
    updateEnergyLevel();
    
    // Guardar stats
    saveEnergyStats();
    
    // Crear partículas
    createEnergyParticles();
    
    // Animación del botón
    if (generateEnergyBtn) {
        generateEnergyBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            generateEnergyBtn.style.transform = 'scale(1)';
        }, 100);
    }
}

function createEnergyParticles() {
    if (!energyParticles) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = '50%';
        particle.style.top = '50%';
        
        energyParticles.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function updateEnergyLevel() {
    let currentLevel = 'Grado 4';
    for (let i = energyLevels.length - 1; i >= 0; i--) {
        if (totalEnergyGenerated >= energyLevels[i].threshold) {
            currentLevel = energyLevels[i].name;
            break;
        }
    }
    if (energyLevel) energyLevel.textContent = currentLevel;
}

function saveEnergyStats() {
    localStorage.setItem('energyStats', JSON.stringify({
        currentEnergy,
        totalEnergyGenerated,
        maxStreak
    }));
}

function loadEnergyStats() {
    const saved = localStorage.getItem('energyStats');
    if (saved) {
        const stats = JSON.parse(saved);
        currentEnergy = stats.currentEnergy || 0;
        totalEnergyGenerated = stats.totalEnergyGenerated || 0;
        maxStreak = stats.maxStreak || 0;
        
        if (energyCounter) energyCounter.textContent = currentEnergy;
        if (totalEnergy) totalEnergy.textContent = totalEnergyGenerated;
        if (bestStreak) bestStreak.textContent = maxStreak;
        updateEnergyLevel();
    }
}

function resetEnergyStats() {
    if (confirm('¿Estás seguro de que quieres resetear todas tus estadísticas de energía?')) {
        currentEnergy = 0;
        totalEnergyGenerated = 0;
        clickStreak = 0;
        maxStreak = 0;
        
        if (energyCounter) energyCounter.textContent = '0';
        if (totalEnergy) totalEnergy.textContent = '0';
        if (bestStreak) bestStreak.textContent = '0';
        if (energyLevel) energyLevel.textContent = 'Grado 4';
        
        localStorage.removeItem('energyStats');
    }
}

if (generateEnergyBtn) {
    generateEnergyBtn.addEventListener('click', generateEnergy);
}

if (resetEnergyBtn) {
    resetEnergyBtn.addEventListener('click', resetEnergyStats);
}

// ========== ESTADÍSTICAS DEL SERVIDOR ==========
if (statsBtn && statsModal) {
    statsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        statsModal.style.display = 'block';
        fetchDiscordStats();
    });
}

async function fetchDiscordStats() {
    try {
        // Usar Discord Widget API para obtener stats reales
        const response = await fetch('https://discord.com/api/guilds/1436664023205191681/widget.json');
        const data = await response.json();
        
        if (data) {
            const totalMembers = data.presence_count || data.members?.length || 0;
            
            // Contar usuarios y bots
            let userCount = 0;
            let botCount = 0;
            
            if (data.members) {
                data.members.forEach(member => {
                    if (member.bot) {
                        botCount++;
                    } else {
                        userCount++;
                    }
                });
            }
            
            // Actualizar UI con animación
            if (memberCount) animateCounter(memberCount, userCount + botCount);
            if (onlineCount) animateCounter(onlineCount, totalMembers);
            
            // Actualizar el texto del tercer stat
            const statCards = document.querySelectorAll('.stat-card');
            if (statCards[2]) {
                statCards[2].querySelector('.stat-number').textContent = botCount;
                statCards[2].querySelector('.stat-title').textContent = 'Bots en Total';
            }
        }
    } catch (error) {
        console.log('Error al obtener stats de Discord:', error);
        // Valores por defecto si falla
        if (memberCount) memberCount.textContent = '1,234';
        if (onlineCount) onlineCount.textContent = '432';
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// ========== SECRETOS / EASTER EGGS ==========
if (secretsBtn && secretsModal) {
    secretsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        secretsModal.style.display = 'block';
        updateSecretsUI();
    });
}

// Detectar secuencias de teclas (solo para PC)
document.addEventListener('keydown', function(e) {
    // Solo funciona en modo PC
    if (!document.body.classList.contains('mobile-mode')) {
        keySequence.push(e.key.toLowerCase());
        
        // Mantener solo las últimas 10 teclas
        if (keySequence.length > 10) {
            keySequence.shift();
        }
        
        // Verificar códigos secretos
        checkSecretCodes();
    }
});

function checkSecretCodes() {
    const sequenceStr = keySequence.join('');
    
    // SUKUNA
    if (sequenceStr.includes(secretCodes.sukuna.join(''))) {
        triggerSukunaEffect();
        if (!discoveredSecrets.sukuna) {
            discoveredSecrets.sukuna = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
    
    // GOJO
    if (sequenceStr.includes(secretCodes.gojo.join(''))) {
        triggerGojoEffect();
        if (!discoveredSecrets.gojo) {
            discoveredSecrets.gojo = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
    
    // DOMAIN
    if (sequenceStr.includes(secretCodes.domain.join(''))) {
        triggerDomainEffect();
        if (!discoveredSecrets.domain) {
            discoveredSecrets.domain = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
    
    // CURSE
    if (sequenceStr.includes(secretCodes.curse.join(''))) {
        triggerCurseEffect();
        if (!discoveredSecrets.curse) {
            discoveredSecrets.curse = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
    
    // ERA
    if (sequenceStr.includes(secretCodes.era.join(''))) {
        triggerEraEffect();
        if (!discoveredSecrets.era) {
            discoveredSecrets.era = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
// DUSK
    if (sequenceStr.includes(secretCodes.dusk.join(''))) {
        triggerDuskEffect();
        if (!discoveredSecrets.dusk) {
            discoveredSecrets.dusk = true;
            saveDiscoveredSecrets();
            updateSecretsUI();
        }
        keySequence = [];
    }
}
function triggerDuskEffect() {
    if (!easterEggOverlay) return;
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <img src="${secretGifs.sukuna}" alt="Sukuna" class="easter-egg-gif">
            <div class="easter-egg-text">👹 ¡Rey de las Maldiciones Invocado! 👹</div>
        </div>
    `;
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
    }, 3000);
    
    showSecretNotification('¡Sukuna ha sido invocado! 👹');
}

function triggerGojoEffect() {
    if (!easterEggOverlay) return;
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <img src="${secretGifs.gojo}" alt="Gojo" class="easter-egg-gif">
            <div class="easter-egg-text">♾️ ¡Infinito Activado! ♾️</div>
        </div>
    `;
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
    }, 3000);
    
    showSecretNotification('¡El Infinito de Gojo se ha activado! ♾️');
}

function triggerDomainEffect() {
    if (!easterEggOverlay) return;
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <img src="${secretGifs.domain}" alt="Domain" class="easter-egg-gif">
            <div class="easter-egg-text">🌀 ¡Expansión de Dominio! 🌀</div>
        </div>
    `;
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
    }, 3000);
    
    showSecretNotification('¡Expansión de Dominio activada! 🌀');
}

function triggerCurseEffect() {
    if (!easterEggOverlay) return;
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <img src="${secretGifs.curse}" alt="Curse" class="easter-egg-gif">
            <div class="easter-egg-text">⚡ ¡Energía Maldita Liberada! ⚡</div>
        </div>
    `;
    
    // Crear partículas adicionales
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #ff0066, #8a2be2);
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
            z-index: 9999;
            animation: float 3s ease-in-out;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
    }, 3000);
    
    showSecretNotification('¡Energía Maldita Liberada! ⚡');
}
function triggerDuskEffect() {
    if (!easterEggOverlay) return;
    
    // Desbloquear juego de terror
    localStorage.setItem('duskUnlocked', 'true');
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 1)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content" style="width: 100%; height: 100%;">
            <img src="${secretGifs.dusk}" 
                 alt="Dusk" 
                 class="easter-egg-gif" 
                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 0; position: absolute; top: 0; left: 0;">
            <div class="easter-egg-text dusk-text">Te veo</div>
        </div>
    `;
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
        
        // Mostrar notificación de juego desbloqueado
        showSecretNotification('🌙 Nuevo juego desbloqueado: "La Biblioteca Maldita" 🌙');
        
        setTimeout(() => {
            const unlockNotif = document.createElement('div');
            unlockNotif.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #1a0a1a, #0a0a1a);
                border: 3px solid #8a2be2;
                border-radius: 20px;
                padding: 40px;
                z-index: 10001;
                text-align: center;
                box-shadow: 0 0 50px rgba(138, 43, 226, 0.8);
                animation: fadeIn 0.5s ease;
            `;
            unlockNotif.innerHTML = `
                <h2 style="color: #ff0066; margin-bottom: 20px; font-size: 2rem;">🎮 Juego Desbloqueado 🎮</h2>
                <p style="color: #fff; margin-bottom: 30px; font-size: 1.1rem;">
                    Has desbloqueado "La Biblioteca Maldita"<br>
                    Un juego de terror psicológico
                </p>
                <button onclick="this.parentElement.remove()" style="
                    background: linear-gradient(45deg, #8a2be2, #ff0066);
                    color: #fff;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ¡Entendido!
                </button>
            `;
            document.body.appendChild(unlockNotif);
        }, 1000);
        
    }, 4000);
    
    showSecretNotification('🌙 Código "Dusk" activado 🌙');
}

function triggerEraEffect() {
    if (!easterEggOverlay) return;
    
    easterEggOverlay.classList.add('active');
    easterEggOverlay.style.background = 'rgba(0, 0, 0, 0.98)';
    easterEggOverlay.innerHTML = `
        <div class="easter-egg-content">
            <img src="${secretGifs.era}" alt="Era" class="easter-egg-gif" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;">
            <div class="easter-egg-text terrorific-text">No pienses en detenerme, no lograrás ni siquiera eso.</div>
        </div>
    `;
    
    setTimeout(() => {
        easterEggOverlay.classList.remove('active');
        easterEggOverlay.innerHTML = '';
    }, 4000);
    
    showSecretNotification('💀 Cursed Era 💀');
}



function showSecretNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #8a2be2, #ff0066);
        color: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(138, 43, 226, 0.8);
        animation: slideDown 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

function saveDiscoveredSecrets() {
    localStorage.setItem('discoveredSecrets', JSON.stringify(discoveredSecrets));
}

// ========== COPIAR EMAIL ==========
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function() {
        const email = 'cursed.era2@gmail.com';
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(function() {
                copyEmailBtn.textContent = '✅ ¡Copiado!';
                copyEmailBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                
                setTimeout(function() {
                    copyEmailBtn.textContent = '📋 Copiar';
                    copyEmailBtn.style.background = 'linear-gradient(45deg, #00ffff, #8a2be2)';
                }, 2000);
            }).catch(function() {
                alert('Email: cursed.era2@gmail.com');
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                copyEmailBtn.textContent = '✅ ¡Copiado!';
                copyEmailBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                
                setTimeout(function() {
                    copyEmailBtn.textContent = '📋 Copiar';
                    copyEmailBtn.style.background = 'linear-gradient(45deg, #00ffff, #8a2be2)';
                }, 2000);
            } catch (err) {
                alert('Email: cursed.era2@gmail.com');
            }
            
            document.body.removeChild(textArea);
        }
    });
}

// ========== CERRAR MODALES ==========
if (closeBtn && modal) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

if (modalCloseButton && modal) {
    modalCloseButton.onclick = function() {
        modal.style.display = 'none';
    }
}

if (quejasCloseBtn && quejasModal) {
    quejasCloseBtn.onclick = function() {
        quejasModal.style.display = 'none';
    }
}

if (quejasModalCloseBtn && quejasModal) {
    quejasModalCloseBtn.onclick = function() {
        quejasModal.style.display = 'none';
    }
}

if (energyGameCloseBtn && energyGameModal) {
    energyGameCloseBtn.onclick = function() {
        energyGameModal.style.display = 'none';
    }
}

if (statsCloseBtn && statsModal) {
    statsCloseBtn.onclick = function() {
        statsModal.style.display = 'none';
    }
}

if (secretsCloseBtn && secretsModal) {
    secretsCloseBtn.onclick = function() {
        secretsModal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == quejasModal) {
        quejasModal.style.display = 'none';
    }
    if (event.target == energyGameModal) {
        energyGameModal.style.display = 'none';
    }
    if (event.target == statsModal) {
        statsModal.style.display = 'none';
    }
    if (event.target == secretsModal) {
        secretsModal.style.display = 'none';
    }
}

// ========== RESETEAR PREFERENCIA DE DISPOSITIVO ==========
const resetDeviceBtn = document.getElementById('resetDevice');
if (resetDeviceBtn) {
    resetDeviceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('devicePreference');
        location.reload();
    });
}