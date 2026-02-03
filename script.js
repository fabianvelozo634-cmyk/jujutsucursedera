// Crear partículas animadas
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    // Variar colores de partículas
    const colors = [
        'rgba(138, 43, 226, 0.6)',
        'rgba(255, 0, 102, 0.6)',
        'rgba(0, 255, 255, 0.6)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particlesContainer.appendChild(particle);
}

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

// Mensajes personalizados para cada sección
const sectionMessages = {
    'sugerencias': {
        title: 'Sugerencias',
        text: '¡Pronto podrás enviarnos tus sugerencias! Esta sección está en desarrollo. Estamos trabajando para que puedas compartir tus ideas y mejorar Cursed Era II.'
    },
    'servidor': {
        title: 'Servidor',
        text: '¡El servidor estará disponible muy pronto! Aquí podrás conectarte con otros jugadores y formar parte de la comunidad de Cursed Era II.'
    },
    'cursed-ia': {
        title: 'Cursed IA',
        text: '¡La inteligencia artificial maldita está en desarrollo! Esta revolucionaria función cambiará tu experiencia. Mantente atento a las actualizaciones.'
    },
    'reclamar': {
        title: 'Reclamar',
        text: '¡Sección de reclamos en construcción! Pronto podrás reclamar recompensas, códigos especiales y más. ¡No te lo pierdas!'
    }
};

// Agregar eventos a los links de navegación (excepto quejas)
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
    
    // Método moderno de copiar al portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
            // Cambiar texto del botón temporalmente
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
        // Fallback para navegadores antiguos
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

// Cerrar modal de desarrollo
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

modalCloseButton.onclick = function() {
    modal.style.display = 'none';
}

// Cerrar modal de quejas
quejasCloseBtn.onclick = function() {
    quejasModal.style.display = 'none';
}

quejasModalCloseBtn.onclick = function() {
    quejasModal.style.display = 'none';
}

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == quejasModal) {
        quejasModal.style.display = 'none';
    }
}