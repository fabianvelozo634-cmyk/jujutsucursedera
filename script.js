// ========== PANTALLA DE CARGA ==========
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const deviceModal = document.getElementById('deviceModal');

let devicePreference = localStorage.getItem('devicePreference');

window.addEventListener('load', function() {
    setTimeout(function() {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(function() {
                if (loadingScreen) loadingScreen.style.display = 'none';
                
                if (devicePreference) {
                    document.body.classList.add(devicePreference);
                    setTimeout(showRandomMessage, 2000);
                    setInterval(showRandomMessage, 15000);
                } else {
                    if (deviceModal) deviceModal.classList.add('show');
                }
            }, 800);
        }
    }, 2500);
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
    sukuna: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374458975912113/descarga.gif?ex=6985c408&is=69847288&hm=94fb49a1ac48f9f934867e44c27c31629e35cc5b32b4d6ebcc904e01225389e0&',
    gojo: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374437433708781/descarga_1.gif?ex=6985c402&is=69847282&hm=22d6c094db8e2c2b5d734ba73e19702a656238816ae0f22199384ede8ce019f7&',
    domain: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374411299000555/GOJO_USES_HIS_DOMAIN_EXPANSION___Jujutsu_Kaisen_-_4K_on_Make_a_GIF.gif?ex=6985c3fc&is=6984727c&hm=f68b046b6b614a2865fdd9f2aa9235fc11239c7aba5f3590471120620686063e&',
    curse: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374418970509414/descarga_2.gif?ex=6985c3fe&is=6984727e&hm=f1c4b8adbf5a425766a6fad08ac9583bee6374d0953c4725cca9f1960777bba0&',
    era: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468377281310363841/yuta-okkotsu-cursed-energy.gif?ex=6985c6a8&is=69847528&hm=2e4a51c1961ba2191e3713f592b852a3752bfa753613fe96b4b013ade8a5c215&',
    dusk: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468395480898867250/descarga.jpg?ex=6985d79c&is=6984861c&hm=7d6b0a88765cd997037d549ef534eea5113db0c27e0dc4736bb874b56a4dd640&'
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
    dusk: false
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


function triggerSukunaEffect() {
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

// ========== CONFIGURACIÓN Y AJUSTES ==========
const configBtn = document.getElementById('configBtn');
const configModal = document.getElementById('configModal');
const configCloseBtn = document.getElementById('configCloseBtn');

// Abrir modal de configuración (SIN recargar página)
if (configBtn) {
    configBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (configModal) {
            configModal.style.display = 'block';
            loadConfigSettings();
        }
    });
}

// Cerrar modal
if (configCloseBtn) {
    configCloseBtn.addEventListener('click', () => {
        if (configModal) configModal.style.display = 'none';
    });
}

// Cerrar al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === configModal) {
        configModal.style.display = 'none';
    }
});

// Cargar configuración guardada
function loadConfigSettings() {
    // Cargar preferencia de dispositivo
    const savedDevice = localStorage.getItem('devicePreference');
    if (savedDevice) {
        const deviceRadio = document.querySelector(`input[name="deviceType"][value="${savedDevice}"]`);
        if (deviceRadio) deviceRadio.checked = true;
    }
    
    // Cargar tema
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    const themeRadio = document.querySelector(`input[name="themeType"][value="${savedTheme}"]`);
    if (themeRadio) themeRadio.checked = true;
    
    // Cargar color de fondo personalizado
    const savedBgColor = localStorage.getItem('customBgColor');
    const bgColorInput = document.getElementById('customBgColor');
    if (savedBgColor && bgColorInput) {
        bgColorInput.value = savedBgColor;
    }
    
    // Cargar estado de efectos
    const cursedEffects = localStorage.getItem('cursedEffects') !== 'false';
    const effectsCheckbox = document.getElementById('cursedEffectsToggle');
    if (effectsCheckbox) effectsCheckbox.checked = cursedEffects;
    
    const customCursor = localStorage.getItem('customCursor') !== 'false';
    const cursorCheckbox = document.getElementById('customCursorToggle');
    if (cursorCheckbox) cursorCheckbox.checked = customCursor;
}

// Cambiar dispositivo
const deviceRadios = document.querySelectorAll('input[name="deviceType"]');
deviceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const newDevice = e.target.value;
        
        // Remover clases anteriores
        document.body.classList.remove('pc-mode', 'mobile-mode');
        
        // Agregar nueva clase
        document.body.classList.add(newDevice);
        
        // Guardar preferencia
        localStorage.setItem('devicePreference', newDevice);
        
        // Mostrar confirmación
        showConfigNotification('Dispositivo cambiado a ' + (newDevice === 'pc-mode' ? 'PC' : 'Móvil'));
    });
});

// Cambiar tema
const themeRadios = document.querySelectorAll('input[name="themeType"]');
themeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        applyTheme(newTheme);
        localStorage.setItem('siteTheme', newTheme);
        showConfigNotification('Tema aplicado: ' + newTheme);
    });
});

// Aplicar tema
function applyTheme(theme) {
    const body = document.body;
    
    // Remover temas anteriores
    body.classList.remove('theme-dark', 'theme-light', 'theme-shibuya');
    
    // Aplicar nuevo tema
    body.classList.add('theme-' + theme);
    
    // Estilos específicos por tema
    switch(theme) {
        case 'dark':
            body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a1a 100%)';
            break;
        case 'light':
            body.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #f0f0f0 100%)';
            body.style.color = '#222';
            break;
        case 'shibuya':
            body.style.background = 'linear-gradient(135deg, #1a0000 0%, #000000 50%, #0a0000 100%)';
            body.style.color = '#ff4d4d';
            break;
    }
}

// Color de fondo personalizado
const customBgInput = document.getElementById('customBgColor');
if (customBgInput) {
    customBgInput.addEventListener('change', (e) => {
        const color = e.target.value;
        document.body.style.background = color;
        localStorage.setItem('customBgColor', color);
        showConfigNotification('Color de fondo personalizado aplicado');
    });
}

// Toggle de efectos cursed
const cursedEffectsToggle = document.getElementById('cursedEffectsToggle');
if (cursedEffectsToggle) {
    cursedEffectsToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        localStorage.setItem('cursedEffects', enabled);
        
        if (enabled) {
            enableCursedScrollEffects();
            showConfigNotification('Efectos de energía maldita activados ⚡');
        } else {
            disableCursedScrollEffects();
            showConfigNotification('Efectos desactivados');
        }
    });
}

// Toggle de cursor personalizado (Gojo chibi neon)
const customCursorToggle = document.getElementById('customCursorToggle');
if (customCursorToggle) {
    customCursorToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        localStorage.setItem('customCursor', enabled);
        
        if (enabled) {
            enableCustomCursor();   // ← ahora usa la versión Gojo neon
            showConfigNotification('Cursor Gojo activado ✨');
        } else {
            disableCustomCursor();
            showConfigNotification('Cursor normal restaurado');
        }
    });
}

// Función para mostrar notificaciones de configuración
function showConfigNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(45deg, #8a2be2, #00ffff);
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 10001;
        box-shadow: 0 5px 20px rgba(138, 43, 226, 0.6);
        animation: slideInRight 0.4s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ========== EFECTOS DE SCROLL CURSED ENERGY ==========
let scrollParticlesContainer = null;

function enableCursedScrollEffects() {
    if (!scrollParticlesContainer) {
        scrollParticlesContainer = document.createElement('div');
        scrollParticlesContainer.id = 'scrollCursedParticles';
        scrollParticlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(scrollParticlesContainer);
    }
    
    window.addEventListener('scroll', createScrollParticles);
}

function disableCursedScrollEffects() {
    window.removeEventListener('scroll', createScrollParticles);
    if (scrollParticlesContainer) {
        scrollParticlesContainer.remove();
        scrollParticlesContainer = null;
    }
}

function createScrollParticles() {
    if (!scrollParticlesContainer) return;
    
    // Crear 2-3 partículas por evento de scroll
    for (let i = 0; i < 2; i++) {
        const particle = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const y = window.scrollY + Math.random() * window.innerHeight;
        
        const colors = ['#8a2be2', '#ff0066', '#00ffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            animation: cursedParticleFade 1.5s ease-out forwards;
            box-shadow: 0 0 15px ${color};
        `;
        
        scrollParticlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// ========== CURSOR PERSONALIZADO ==========
let customCursorElement = null;
let cursorTrail = [];

function enableCustomCursor() {
    // Crear elemento de cursor
    if (!customCursorElement) {
        customCursorElement = document.createElement('div');
        customCursorElement.id = 'customCursor';
        customCursorElement.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(138, 43, 226, 0.8), rgba(255, 0, 102, 0.8));
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        `;
        document.body.appendChild(customCursorElement);
    }
    
    // Ocultar cursor por defecto
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.style.cursor = 'none';
    });
    
    // Seguir movimiento del mouse
    document.addEventListener('mousemove', updateCustomCursor);
    document.addEventListener('mousedown', scaleDownCursor);
    document.addEventListener('mouseup', scaleUpCursor);
}

function enableCustomCursor() {
    if (customCursorElement) return;

    customCursorElement = document.createElement('div');
    customCursorElement.id = 'customGojoCursor';
    document.body.appendChild(customCursorElement);

    // Ocultar cursor del sistema
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea, .nav-link').forEach(el => {
        el.style.cursor = 'none';
    });

    document.addEventListener('mousemove', moveGojoCursor);
    document.addEventListener('mousedown', scaleGojoCursor);
    document.addEventListener('mouseup', resetGojoCursorScale);
}

function disableCustomCursor() {
    if (customCursorElement) {
        customCursorElement.remove();
        customCursorElement = null;
    }
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, input, textarea, .nav-link').forEach(el => {
        el.style.cursor = 'pointer';
    });

    document.removeEventListener('mousemove', moveGojoCursor);
    document.removeEventListener('mousedown', scaleGojoCursor);
    document.removeEventListener('mouseup', resetGojoCursorScale);
}

function moveGojoCursor(e) {
    if (!customCursorElement) return;
    customCursorElement.style.left = `${e.clientX}px`;
    customCursorElement.style.top = `${e.clientY}px`;
}

function scaleGojoCursor() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'translate(-50%, -50%) scale(0.85)';
    }
}

function resetGojoCursorScale() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}

function disableCustomCursor() {
    if (customCursorElement) {
        customCursorElement.remove();
        customCursorElement = null;
    }
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, input, textarea, .nav-link').forEach(el => {
        el.style.cursor = 'pointer';
    });

    document.removeEventListener('mousemove', moveGojoCursor);
    document.removeEventListener('mousedown', scaleGojoCursor);
    document.removeEventListener('mouseup', resetGojoCursorScale);
}

function moveGojoCursor(e) {
    if (!customCursorElement) return;
    customCursorElement.style.left = `${e.clientX}px`;
    customCursorElement.style.top = `${e.clientY}px`;
}

function scaleGojoCursor() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'translate(-50%, -50%) scale(0.85)';
    }
}

function resetGojoCursorScale() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}
function updateCustomCursor(e) {
    if (!customCursorElement) return;
    
    customCursorElement.style.left = e.clientX - 10 + 'px';
    customCursorElement.style.top = e.clientY - 10 + 'px';
    
    // Crear estela ocasionalmente
    if (Math.random() < 0.3) {
        createCursorTrail(e.clientX, e.clientY);
    }
}

function scaleDownCursor() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'scale(0.8)';
    }
}

function scaleUpCursor() {
    if (customCursorElement) {
        customCursorElement.style.transform = 'scale(1)';
    }
}

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x - 5}px;
        top: ${y - 5}px;
        width: 10px;
        height: 10px;
        background: rgba(138, 43, 226, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
}

// ========== CARGAR CONFIGURACIÓN AL INICIAR ==========
window.addEventListener('load', () => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    applyTheme(savedTheme);
    
    // Cargar efectos
    const cursedEffects = localStorage.getItem('cursedEffects') !== 'false';
    if (cursedEffects) enableCursedScrollEffects();
    
    const customCursor = localStorage.getItem('customCursor') !== 'false';
    if (customCursor) enableCustomCursor();
    
    // Cargar color personalizado si existe
    const savedBgColor = localStorage.getItem('customBgColor');
    if (savedBgColor) {
        document.body.style.background = savedBgColor;
    }
    function openThemesModal() {
   
if (themesBtn) {
    themesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openThemesModal();
    });
}
const themesCloseBtn = document.getElementById('themesCloseBtn');
if (themesCloseBtn) {
    themesCloseBtn.addEventListener('click', () => {
        const themesModal = document.getElementById('themesModal');
        if (themesModal) themesModal.style.display = 'none';
    });
}

// Click fuera del modal
window.addEventListener('click', (e) => {
    const themesModal = document.getElementById('themesModal');
    if (e.target === themesModal) {
        themesModal.style.display = 'none';
    }
});
    
    const grid = document.getElementById('themesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Usar los temas globales definidos en themes.js
    const themesToUse = typeof themes !== 'undefined' ? themes : {
        oscuro: {
            name: 'Oscuro',
            icon: '🌙',
            primaryColor: '#8a2be2',
            secondaryColor: '#00ffff',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a1a 100%)',
            glowColor: 'rgba(138, 43, 226, 0.8)'
        },
        gojo: {
            name: 'Gojo Satoru',
            icon: '♾️',
            primaryColor: '#00ffff',
            secondaryColor: '#0099ff',
            background: 'linear-gradient(135deg, #001a3d 0%, #000055 50%, #0a0a1a 100%)',
            glowColor: 'rgba(0, 255, 255, 0.8)'
        },
        sukuna: {
            name: 'Sukuna',
            icon: '👹',
            primaryColor: '#ff0066',
            secondaryColor: '#ff3366',
            background: 'linear-gradient(135deg, #2d0000 0%, #1a0000 50%, #0a0000 100%)',
            glowColor: 'rgba(255, 0, 102, 0.8)'
        }
    };
    
    // Crear tarjetas de temas
    Object.entries(themesToUse).forEach(([key, theme]) => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3));
            border: 2px solid ${theme.primaryColor};
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        `;
        
        card.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">${theme.icon}</div>
            <div style="font-size: 1.2rem; font-weight: bold; color: ${theme.primaryColor}; margin-bottom: 10px;">${theme.name}</div>
            <div style="width: 100%; height: 40px; border-radius: 10px; background: ${theme.background}; margin-bottom: 15px; border: 2px solid ${theme.primaryColor};"></div>
            <button onclick="applyTheme('${key}')" style="
                background: linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor});
                border: none; padding: 10px 25px; border-radius: 8px;
                color: #fff; font-size: 0.95rem; cursor: pointer; font-weight: bold; width: 100%;
                transition: all 0.3s;
            ">Aplicar</button>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = `0 10px 30px ${theme.glowColor}`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
        
        grid.appendChild(card);
    });
}
});
const applyCustomThemeBtn = document.getElementById('applyCustomThemeBtn');
if (applyCustomThemeBtn) {
    applyCustomThemeBtn.addEventListener('click', () => {
        const customTheme = {
            bg1: document.getElementById('customBg1')?.value || '#0a0a0a',
            bg2: document.getElementById('customBg2')?.value || '#1a0a1a',
            bg3: document.getElementById('customBg3')?.value || '#0a0a1a',
            primary: document.getElementById('customPrimary')?.value || '#8a2be2',
            secondary: document.getElementById('customSecondary')?.value || '#ff0066'
        };
        
        if (typeof createCustomTheme === 'function') {
            createCustomTheme(customTheme);
        }
        // ========== TEMAS ==========
    const themesBtn = document.getElementById('themesBtn');
    const themesModal = document.getElementById('themesModal');
    const themesCloseBtn = document.getElementById('themesCloseBtn');
    const themesGrid = document.getElementById('themesGrid');

    if (themesBtn) {
        themesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (themesModal) {
                themesModal.style.display = 'block';
                cargarTemas();
            }
        });
    }

    if (themesCloseBtn) {
        themesCloseBtn.addEventListener('click', () => {
            if (themesModal) themesModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === themesModal) themesModal.style.display = 'none';
    });

    function cargarTemas() {
        if (!themesGrid || !window.TEMAS_DISPONIBLES) return;
        
        themesGrid.innerHTML = '';
        
        Object.entries(window.TEMAS_DISPONIBLES).forEach(([key, tema]) => {
            const tarjeta = document.createElement('div');
            tarjeta.style.cssText = `
                background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3));
                border: 2px solid ${tema.primaryColor};
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            `;
            
            tarjeta.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 15px;">${tema.icon}</div>
                <div style="font-size: 1.1rem; font-weight: bold; color: ${tema.primaryColor}; margin-bottom: 10px;">${tema.name}</div>
                <div style="width: 100%; height: 30px; border-radius: 10px; background: ${tema.background}; margin-bottom: 15px; border: 2px solid ${tema.primaryColor};"></div>
                <button onclick="window.aplicarTema('${key}')" style="
                    background: linear-gradient(45deg, ${tema.primaryColor}, ${tema.secondaryColor});
                    border: none; padding: 10px 20px; border-radius: 8px;
                    color: #fff; font-size: 0.9rem; cursor: pointer; font-weight: bold; width: 100%;
                ">Aplicar</button>
            `;
            
            tarjeta.addEventListener('mouseenter', () => {
                tarjeta.style.transform = 'translateY(-5px)';
                tarjeta.style.boxShadow = `0 10px 30px ${tema.glowColor}`;
            });
            
            tarjeta.addEventListener('mouseleave', () => {
                tarjeta.style.transform = 'translateY(0)';
                tarjeta.style.boxShadow = 'none';
            });
            
            themesGrid.appendChild(tarjeta);
        });
    }
    });
}
const GUILD_ID = "1462216432094937214";

async function updateOnlineCount() {
    const onlineCountEl = document.getElementById('onlineCount');
    if (!onlineCountEl) return;

    try {
        const response = await fetch(`https://discord.com/api/guilds/1462216432094937214/widget.json`);

        // Si quieres debug temporal, puedes dejar solo el status
        console.log('Status del widget:', response.status);

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        const online = data.presence_count || 0;

        onlineCountEl.textContent = online.toLocaleString();

        // Color según cantidad (opcional)
        if (online < 10) {
            onlineCountEl.style.color = '#ff6666';
        } else {
            onlineCountEl.style.color = '#fff';
        }

    } catch (error) {
        console.error('Error al obtener contador online:', error);
        if (onlineCountEl) {
            onlineCountEl.textContent = '---';
        }
    }
}

// Actualizar cada 40 segundos
setInterval(updateOnlineCount, 40000);

// Ejecutar al cargar la página con pequeño retraso
window.addEventListener('load', () => {
    setTimeout(updateOnlineCount, 1500);
});
// ==================== INICIO DE SESIÓN CON DISCORD ====================

const CLIENT_ID = "1469064025844220099";
const REDIRECT_URI = "https://fabianvelozo634-cmyk.github.io/jujutsucursedera/callback";

// URL completa para autorizar en Discord
const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;

// Abrir Discord al hacer clic en el botón
document.getElementById('discordLoginBtn')?.addEventListener('click', () => {
    window.location.href = discordAuthUrl;
});

// Al cargar la página, verificar si volvimos con ?code=...
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // Limpiar la URL (quitar ?code=... para que no quede visible)
        window.history.replaceState({}, document.title, window.location.pathname);

        console.log("Código recibido:", code.substring(0, 10) + "...");

        // Mostrar el perfil (demo por ahora)
        const loginContainer = document.getElementById('loginContainer');
        const userProfile = document.getElementById('userProfile');

        if (loginContainer && userProfile) {
            loginContainer.style.display = 'none';
            userProfile.style.display = 'flex';

            // Datos simulados (luego vendrán del API real)
            document.getElementById('userName').textContent = "Usuario#1234";
            document.getElementById('userAvatar').src = "https://cdn.discordapp.com/embed/avatars/0.png";
            document.getElementById('userStatus').textContent = "Conectado al servidor (demo)";
        }

        // Mensaje de éxito
        alert("¡Inicio de sesión exitoso!\n\n(Esto es una demo. Próximo paso: obtener tu avatar y nombre real con backend)");
    }
});

// Botón de cerrar sesión (demo)
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    alert("Sesión cerrada (demo)");
});

// script.js es este