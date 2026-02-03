// ========== PANTALLA DE CARGA ==========
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const deviceModal = document.getElementById('deviceModal');

// Verificar si ya se seleccionó dispositivo antes
const devicePreference = localStorage.getItem('devicePreference');

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
    document.body.classList.add('pc-mode');
    deviceModal.classList.remove('show');
    
    // Iniciar mensajes del chibi
    setTimeout(showRandomMessage, 2000);
    setInterval(showRandomMessage, 15000);
});

// Selección Mobile
mobileBtn.addEventListener('click', function() {
    localStorage.setItem('devicePreference', 'mobile-mode');
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
    era: ['e', 'r', 'a']
};

const secretGifs = {
    sukuna: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374458975912113/descarga.gif?ex=6983c9c8&is=69827848&hm=50b5bd2a8278314daa5ad95ebe48c563181ae7090f161d53b37be57e9ee1a322&',
    gojo: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374437433708781/descarga_1.gif?ex=6983c9c2&is=69827842&hm=77e967bfa342f3ee25e2de532f013d564fde59ff97cee957f7520e0dc5149d26&',
    domain: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374411299000555/GOJO_USES_HIS_DOMAIN_EXPANSION___Jujutsu_Kaisen_-_4K_on_Make_a_GIF.gif?ex=6983c9bc&is=6982783c&hm=94950845fd8e0f907c39350f67d1f2bea8014831c2db2225b1f1a2ecfbe1fc07&',
    curse: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468374418970509414/descarga_2.gif?ex=6983c9be&is=6982783e&hm=71b330f63c7a059f5638e214f163b7c6e65a6608a0236e47bb13c2bc1eb6947e&',
    era: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468377281310363841/yuta-okkotsu-cursed-energy.gif?ex=6983cc68&is=69827ae8&hm=f4095524c8624b1055deaca82331ed01354fbc1c482e87031059196adce6b45e&'
};

const secretNames = {
    sukuna: 'Rey de las Maldiciones',
    gojo: 'Infinito',
    domain: 'Expansión de Dominio',
    curse: 'Energía Maldita',
    era: 'Cursed Era'
};

const secretIcons = {
    sukuna: '👹',
    gojo: '♾️',
    domain: '🌀',
    curse: '⚡',
    era: '💀'
};

let keySequence = [];
let discoveredSecrets = JSON.parse(localStorage.getItem('discoveredSecrets')) || {
    sukuna: false,
    gojo: false,
    domain: false,
    curse: false,
    era: false
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
    notification.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
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
    notification.style.background = 'linear-gradient(45deg, #00ffff, #0088ff)';
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
    notification.style.background = 'linear-gradient(45deg, #ff0066, #cc0044)';
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
    const secrets = ['sukuna', 'gojo', 'domain', 'curse', 'era'];
    
    secrets.forEach((key, index) => {
        const secretCard = document.getElementById(`secretCard${index + 1}`);
        if (discoveredSecrets[key]) {
            secretCard.classList.add('discovered');
            secretCard.innerHTML = `
                <div class="secret-icon">${secretIcons[key]}</div>
                <div class="secret-name">${secretNames[key]}</div>
            `;
            discovered++;
        }
    });
    
    const progress = (discovered / 5) * 100;
    document.getElementById('secretsProgress').style.width = progress + '%';
    document.getElementById('secretsText').textContent = `${discovered} / 5`;
}

// ========== CHIBI ASSISTANT ==========
const chibiAssistant = document.getElementById('chibiAssistant');
const chibiIcon = document.getElementById('chibiIcon');
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
    currentMessageIndex = Math.floor(Math.random() * chibiMessages.length);
    speechBubble.textContent = chibiMessages[currentMessageIndex];
    speechBubble.classList.add('show');
    
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 4000);
}

// Click en el chibi - redirigir al chat IA
chibiIcon.addEventListener('click', function() {
    modalTitle.textContent = 'Cursed IA';
    modalText.textContent = '¡La inteligencia artificial maldita está en desarrollo! Pronto podrás chatear con nuestro asistente AI especializado en Jujutsu Kaisen. ¡Mantente atento!';
    modal.style.display = 'block';
});

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
        
        if (section) {
            e.preventDefault();
            const message = sectionMessages[section];
            modalTitle.textContent = message.title;
            modalText.textContent = message.text;
            modal.style.display = 'block';
        }
    });
});

// Abrir modal de quejas
quejasBtn.addEventListener('click', function(e) {
    e.preventDefault();
    quejasModal.style.display = 'block';
});

// ========== JUEGO DE ENERGÍA MALDITA ==========
energyGameBtn.addEventListener('click', function(e) {
    e.preventDefault();
    energyGameModal.style.display = 'block';
    loadEnergyStats();
});

function generateEnergy() {
    const amount = Math.floor(Math.random() * 10) + 5;
    currentEnergy += amount;
    totalEnergyGenerated += amount;
    clickStreak++;
    
    if (clickStreak > maxStreak) {
        maxStreak = clickStreak;
    }
    
    // Actualizar UI
    energyCounter.textContent = currentEnergy;
    totalEnergy.textContent = totalEnergyGenerated;
    bestStreak.textContent = maxStreak;
    
    // Actualizar nivel
    updateEnergyLevel();
    
    // Guardar stats
    saveEnergyStats();
    
    // Crear partículas
    createEnergyParticles();
    
    // Animación del botón
    generateEnergyBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        generateEnergyBtn.style.transform = 'scale(1)';
    }, 100);
}

function createEnergyParticles() {
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
    energyLevel.textContent = currentLevel;
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
        
        energyCounter.textContent = currentEnergy;
        totalEnergy.textContent = totalEnergyGenerated;
        bestStreak.textContent = maxStreak;
        updateEnergyLevel();
    }
}

function resetEnergyStats() {
    if (confirm('¿Estás seguro de que quieres resetear todas tus estadísticas de energía?')) {
        currentEnergy = 0;
        totalEnergyGenerated = 0;
        clickStreak = 0;
        maxStreak = 0;
        
        energyCounter.textContent = '0';
        totalEnergy.textContent = '0';
        bestStreak.textContent = '0';
        energyLevel.textContent = 'Grado 4';
        
        localStorage.removeItem('energyStats');
    }
}

generateEnergyBtn.addEventListener('click', generateEnergy);
resetEnergyBtn.addEventListener('click', resetEnergyStats);

// ========== ESTADÍSTICAS DEL SERVIDOR ==========
statsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    statsModal.style.display = 'block';
    fetchDiscordStats();
});

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
            animateCounter(memberCount, userCount + botCount);
            animateCounter(onlineCount, totalMembers);
            
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
        memberCount.textContent = '1,234';
        onlineCount.textContent = '432';
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
secretsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    secretsModal.style.display = 'block';
    updateSecretsUI();
});

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
    
    // SUKUNA - Siempre se puede activar
    if (sequenceStr.includes(secretCodes.sukuna.join(''))) {
        triggerSukunaEffect();
        if (!discoveredSecrets.sukuna) {
            discoveredSecrets.sukuna = true;
            saveDiscoveredSecrets();
        }
        keySequence = []; // Limpiar secuencia
    }
    
    // GOJO - Siempre se puede activar
    if (sequenceStr.includes(secretCodes.gojo.join(''))) {
        triggerGojoEffect();
        if (!discoveredSecrets.gojo) {
            discoveredSecrets.gojo = true;
            saveDiscoveredSecrets();
        }
        keySequence = [];
    }
    
    // DOMAIN - Siempre se puede activar
    if (sequenceStr.includes(secretCodes.domain.join(''))) {
        triggerDomainEffect();
        if (!discoveredSecrets.domain) {
            discoveredSecrets.domain = true;
            saveDiscoveredSecrets();
        }
        keySequence = [];
    }
    
    // CURSE - Siempre se puede activar
    if (sequenceStr.includes(secretCodes.curse.join(''))) {
        triggerCurseEffect();
        if (!discoveredSecrets.curse) {
            discoveredSecrets.curse = true;
            saveDiscoveredSecrets();
        }
        keySequence = [];
    }
    
    // ERA - Nuevo secreto especial
    if (sequenceStr.includes(secretCodes.era.join(''))) {
        triggerEraEffect();
        if (!discoveredSecrets.era) {
            discoveredSecrets.era = true;
            saveDiscoveredSecrets();
        }
        keySequence = [];
    }
}

function triggerSukunaEffect() {
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
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = 'linear-gradient(45deg, #ff0066, #8a2be2)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.8)';
        particle.style.zIndex = '9999';
        particle.style.animation = 'float 3s ease-in-out';
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

function triggerEraEffect() {
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
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'linear-gradient(45deg, #8a2be2, #ff0066)';
    notification.style.color = '#fff';
    notification.style.padding = '20px 40px';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '1.2rem';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 10px 40px rgba(138, 43, 226, 0.8)';
    notification.style.animation = 'slideDown 0.5s ease';
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

// ========== CERRAR MODALES ==========
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

modalCloseButton.onclick = function() {
    modal.style.display = 'none';
}

quejasCloseBtn.onclick = function() {
    quejasModal.style.display = 'none';
}

quejasModalCloseBtn.onclick = function() {
    quejasModal.style.display = 'none';
}

energyGameCloseBtn.onclick = function() {
    energyGameModal.style.display = 'none';
}

statsCloseBtn.onclick = function() {
    statsModal.style.display = 'none';
}

secretsCloseBtn.onclick = function() {
    secretsModal.style.display = 'none';
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