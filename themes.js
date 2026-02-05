// ==================== TEMAS DISPONIBLES ====================

window.TEMAS_DISPONIBLES = {
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
    },
    mahito: {
        name: 'Mahito',
        icon: '🧬',
        primaryColor: '#00ff66',
        secondaryColor: '#00dd88',
        background: 'linear-gradient(135deg, #001a1a 0%, #003333 50%, #0a1a1a 100%)',
        glowColor: 'rgba(0, 255, 102, 0.8)'
    },
    zenin: {
        name: 'Clan Zenin',
        icon: '⚔️',
        primaryColor: '#ffd700',
        secondaryColor: '#ffaa00',
        background: 'linear-gradient(135deg, #2d2600 0%, #1a1a00 50%, #0a0a00 100%)',
        glowColor: 'rgba(255, 215, 0, 0.8)'
    },
    todo: {
        name: 'Todo Aoi',
        icon: '🌊',
        primaryColor: '#0099ff',
        secondaryColor: '#00ccff',
        background: 'linear-gradient(135deg, #000055 0%, #001a55 50%, #0a0a2a 100%)',
        glowColor: 'rgba(0, 153, 255, 0.8)'
    },
    jogo: {
        name: 'Jogo',
        icon: '🔥',
        primaryColor: '#ff6600',
        secondaryColor: '#ff8800',
        background: 'linear-gradient(135deg, #2d1100 0%, #1a0a00 50%, #0d0300 100%)',
        glowColor: 'rgba(255, 102, 0, 0.8)'
    },
    matrix: {
        name: 'Matrix',
        icon: '💚',
        primaryColor: '#00ff00',
        secondaryColor: '#00cc00',
        background: 'linear-gradient(135deg, #001100 0%, #002200 50%, #000d00 100%)',
        glowColor: 'rgba(0, 255, 0, 0.8)'
    },
    retro: {
        name: 'Retro Pixel',
        icon: '🎮',
        primaryColor: '#ff00ff',
        secondaryColor: '#ffff00',
        background: 'linear-gradient(135deg, #1a0033 0%, #330055 50%, #1a0a2a 100%)',
        glowColor: 'rgba(255, 0, 255, 0.8)'
    },
    shibuya: {
        name: 'Shibuya',
        icon: '🔴',
        primaryColor: '#ff1a1a',
        secondaryColor: '#ff3333',
        background: 'linear-gradient(135deg, #2d0000 0%, #330000 50%, #1a0000 100%)',
        glowColor: 'rgba(255, 26, 26, 0.8)'
    },
    claro: {
        name: 'Claro',
        icon: '☀️',
        primaryColor: '#6a5acd',
        secondaryColor: '#ff69b4',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
        glowColor: 'rgba(106, 90, 205, 0.8)'
    },
    hakari: {
        name: 'Hakari Kinji',
        icon: '🎰',
        primaryColor: '#ffd700',
        secondaryColor: '#ffaa00',
        background: 'linear-gradient(135deg, #2a2a00 0%, #1a1a00 50%, #0a0a00 100%)',
        glowColor: 'rgba(255, 215, 0, 0.8)'
    },
    kenjaku: {
        name: 'Kenjaku',
        icon: '🧠',
        primaryColor: '#8b008b',
        secondaryColor: '#4b0082',
        background: 'linear-gradient(135deg, #1a001a 0%, #0a000a 50%, #000000 100%)',
        glowColor: 'rgba(139, 0, 139, 0.8)'
    },
    uraume: {
        name: 'Uraume',
        icon: '❄️',
        primaryColor: '#87ceeb',
        secondaryColor: '#4682b4',
        background: 'linear-gradient(135deg, #001a33 0%, #000a1a 50%, #000000 100%)',
        glowColor: 'rgba(135, 206, 235, 0.8)'
    },
    kirara: {
        name: 'Kirara Hoshi',
        icon: '🌟',
        primaryColor: '#ff69b4',
        secondaryColor: '#ff1493',
        background: 'linear-gradient(135deg, #33001a 0%, #1a000a 50%, #0a0000 100%)',
        glowColor: 'rgba(255, 105, 180, 0.8)'
    },
    itadori: {
        name: 'Yuji Itadori',
        icon: '👊',
        primaryColor: '#ff4500',
        secondaryColor: '#ff8c00',
        background: 'linear-gradient(135deg, #2a0a00 0%, #1a0a00 50%, #0a0500 100%)',
        glowColor: 'rgba(255, 69, 0, 0.8)'
    }
};

// ==================== FUNCIÓN APLICAR TEMA ====================

window.aplicarTema = function(nombreTema) {
    const tema = window.TEMAS_DISPONIBLES[nombreTema];
    
    if (!tema) {
        console.error(`Tema '${nombreTema}' no encontrado`);
        return;
    }
    
    // Aplicar fondo
    document.body.style.background = tema.background;
    localStorage.setItem('currentTheme', nombreTema);
    
    // Crear o actualizar estilos dinámicos
    let styleTag = document.getElementById('tema-estilos');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'tema-estilos';
        document.head.appendChild(styleTag);
    }
    
    styleTag.textContent = `
        body { background: ${tema.background} !important; }
        h1, .welcome-title, .modal-content h2, .config-modal-content h2 {
            color: ${tema.primaryColor} !important;
        }
        .nav-link:hover {
            color: ${tema.secondaryColor} !important;
            border-color: ${tema.primaryColor} !important;
            box-shadow: 0 5px 15px ${tema.glowColor} !important;
        }
        .modal-button, .energy-btn {
            background: linear-gradient(45deg, ${tema.primaryColor}, ${tema.secondaryColor}) !important;
            box-shadow: 0 5px 15px ${tema.glowColor} !important;
        }
        .modal-button:hover, .energy-btn:hover {
            box-shadow: 0 8px 25px ${tema.glowColor} !important;
        }
        .close-btn:hover {
            color: ${tema.secondaryColor} !important;
        }
        .modal-content, .config-modal-content {
            border-color: ${tema.primaryColor} !important;
            box-shadow: 0 0 50px ${tema.glowColor} !important;
        }
        .stat-card {
            border-color: ${tema.primaryColor} !important;
        }
        .stat-number {
            color: ${tema.primaryColor} !important;
        }
    `;
    
    mostrarNotificacionTema(`Tema "${tema.name}" aplicado ✨`);
};

// ==================== NOTIFICACIÓN DE TEMA ====================

function mostrarNotificacionTema(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
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
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}

// ==================== CARGAR TEMA AL INICIAR ====================

document.addEventListener('DOMContentLoaded', function() {
    const temaguardado = localStorage.getItem('currentTheme') || 'oscuro';
    if (window.TEMAS_DISPONIBLES[temaguardado]) {
        window.aplicarTema(temaguardado);
    } else {
        window.aplicarTema('oscuro');
    }
    // Abrir modal de temas
window.openThemesModal = function() {
    const modal = document.getElementById('themesModal');
    if (modal) {
        modal.style.display = 'block';
        if (typeof cargarTemas === 'function') cargarTemas();
    }
};
});
document.getElementById('applyCustomThemeBtn')?.addEventListener('click', function() {
    const bg1 = document.getElementById('customBg1').value;
    const bg2 = document.getElementById('customBg2').value;
    const primary = document.getElementById('customPrimary').value;
    const secondary = document.getElementById('customSecondary').value;

    document.body.style.background = `linear-gradient(135deg, ${bg1} 0%, ${bg2} 50%, ${bg1} 100%)`;

    const styleTag = document.getElementById('tema-estilos') || document.createElement('style');
    styleTag.id = 'tema-estilos';
    styleTag.textContent = `
        body { background: linear-gradient(135deg, ${bg1} 0%, ${bg2} 50%, ${bg1} 100%) !important; }
        h1, h2, .welcome-title { color: ${primary} !important; }
        .nav-link:hover, .modal-button { background: linear-gradient(45deg, ${primary}, ${secondary}) !important; }
    `;
    if (!document.getElementById('tema-estilos')) document.head.appendChild(styleTag);

    mostrarNotificacionTema('✅ Tema personalizado aplicado');
});
// Función para cargar todos los temas en el grid
window.cargarTemas = function() {
    const grid = document.getElementById('themesGrid');
    if (!grid || !window.TEMAS_DISPONIBLES) return;

    grid.innerHTML = '';

    Object.entries(window.TEMAS_DISPONIBLES).forEach(([key, tema]) => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: linear-gradient(135deg, rgba(138,43,226,0.3), rgba(255,0,102,0.3));
            border: 2px solid ${tema.primaryColor || '#8a2be2'};
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        `;

        card.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 15px;">${tema.icon}</div>
            <div style="font-weight: bold; font-size: 1.2rem; color: ${tema.primaryColor}; margin-bottom: 10px;">${tema.name}</div>
            <div style="height: 40px; border-radius: 10px; background: ${tema.background}; margin-bottom: 15px; border: 2px solid ${tema.primaryColor};"></div>
            <button onclick="window.aplicarTema('${key}')" style="
                background: linear-gradient(45deg, ${tema.primaryColor}, ${tema.secondaryColor});
                border: none; padding: 12px; border-radius: 10px; color: white; width: 100%; font-weight: bold;
            ">Aplicar</button>
        `;

        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-6px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');

        grid.appendChild(card);
    });
};

// Función para abrir el modal de temas
window.openThemesModal = function() {
    const modal = document.getElementById('themesModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(cargarTemas, 10);   // pequeño delay para que el DOM esté listo
    }
};
// Cerrar modal de Temas (la X)
const themesCloseBtn = document.getElementById('themesCloseBtn');
if (themesCloseBtn) {
    themesCloseBtn.addEventListener('click', function() {
        const themesModal = document.getElementById('themesModal');
        if (themesModal) themesModal.style.display = 'none';
    });
}

// Cerrar temas haciendo clic fuera del modal
window.addEventListener('click', function(e) {
    const themesModal = document.getElementById('themesModal');
    if (e.target === themesModal) {
        themesModal.style.display = 'none';
    }
});

// ===theme.js===