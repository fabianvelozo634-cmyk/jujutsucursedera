// Crear partículas animadas
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

// Modal de selección de dispositivo
const deviceModal = document.getElementById('deviceModal');
const pcBtn = document.getElementById('pcBtn');
const mobileBtn = document.getElementById('mobileBtn');

// Verificar si ya se seleccionó antes
const devicePreference = localStorage.getItem('devicePreference');

if (devicePreference) {
    deviceModal.classList.add('hidden');
    document.body.classList.add(devicePreference);
} else {
    // Mostrar modal
    deviceModal.style.display = 'flex';
}

// Selección PC
pcBtn.addEventListener('click', function() {
    localStorage.setItem('devicePreference', 'pc-mode');
    document.body.classList.add('pc-mode');
    deviceModal.classList.add('hidden');
    setTimeout(() => {
        deviceModal.style.display = 'none';
    }, 300);
});

// Selección Mobile
mobileBtn.addEventListener('click', function() {
    localStorage.setItem('devicePreference', 'mobile-mode');
    document.body.classList.add('mobile-mode');
    deviceModal.classList.add('hidden');
    setTimeout(() => {
        deviceModal.style.display = 'none';
    }, 300);
});

// Modal de secciones en desarrollo
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

// Chibi Assistant
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

// Mostrar mensaje inicial después de 2 segundos (solo si ya seleccionó dispositivo)
if (devicePreference) {
    setTimeout(showRandomMessage, 2000);
    setInterval(showRandomMessage, 15000);
}

// Click en el chibi - redirigir al chat IA
chibiIcon.addEventListener('click', function() {
    modalTitle.textContent = 'Cursed IA';
    modalText.textContent = '¡La inteligencia artificial maldita está en desarrollo! Pronto podrás chatear con nuestro asistente AI especializado en Jujutsu Kaisen. ¡Mantente atento!';
    modal.style.display = 'block';
});

// Mensajes personalizados para cada sección
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

// Copiar email al portapapeles
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

// Cerrar modales
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

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == quejasModal) {
        quejasModal.style.display = 'none';
    }
}