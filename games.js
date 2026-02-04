// ========== SISTEMA DE JUEGOS ========== 

const gamesModal = document.getElementById('gamesModal');
const gamesBtn = document.getElementById('gamesBtn');
const gamesCloseBtn = document.getElementById('gamesCloseBtn');
const gamesContainer = document.getElementById('gamesContainer');

// Lista de juegos disponibles
const availableGames = [
    {
        id: 'energy-clicker',
        name: 'Energía Clicker',
        icon: '⚡',
        description: 'Genera energía maldita haciendo click',
        unlocked: true,
        action: () => {
            // Abrir el juego de energía existente
            document.getElementById('energyGameBtn').click();
        }
    },
    {
        id: 'cursed-library',
        name: 'La Biblioteca Maldita',
        icon: '📚',
        description: 'Un juego de terror psicológico',
        unlocked: false,
        requiresSecret: 'dusk',
        action: () => {
            startCursedLibraryGame();
        }
    },
    {
        id: 'domain-memory',
        name: 'Memoria de Dominio',
        icon: '🧠',
        description: 'Memoriza las técnicas malditas',
        unlocked: true,
        action: () => {
            startDomainMemoryGame();
        }
    },
    {
        id: 'cursed-quiz',
        name: 'Quiz Maldito',
        icon: '❓',
        description: 'Pon a prueba tus conocimientos de JJK',
        unlocked: true,
        action: () => {
            startCursedQuizGame();
        }
    }
];

// Abrir modal de juegos
if (gamesBtn) {
    gamesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadGamesMenu();
        gamesModal.style.display = 'block';
    });
}

// Cerrar modal
if (gamesCloseBtn) {
    gamesCloseBtn.onclick = function() {
        gamesModal.style.display = 'none';
    }
}

// Cargar menú de juegos
function loadGamesMenu() {
    // Verificar juegos desbloqueados
    const duskUnlocked = localStorage.getItem('duskUnlocked') === 'true';
    
    gamesContainer.innerHTML = '';
    
    availableGames.forEach(game => {
        const isUnlocked = game.unlocked || (game.requiresSecret === 'dusk' && duskUnlocked);
        
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.style.cssText = `
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3));
            border: 2px solid ${isUnlocked ? '#8a2be2' : 'rgba(138, 43, 226, 0.3)'};
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: ${isUnlocked ? 'pointer' : 'not-allowed'};
            transition: all 0.3s ease;
            opacity: ${isUnlocked ? '1' : '0.5'};
            position: relative;
            overflow: hidden;
        `;
        
        if (isUnlocked) {
            gameCard.onmouseover = () => {
                gameCard.style.transform = 'translateY(-5px)';
                gameCard.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.6)';
            };
            gameCard.onmouseout = () => {
                gameCard.style.transform = 'translateY(0)';
                gameCard.style.boxShadow = 'none';
            };
        }
        
        gameCard.innerHTML = `
            ${!isUnlocked ? '<div style="position: absolute; top: 10px; right: 10px; font-size: 2rem;">🔒</div>' : ''}
            <div style="font-size: 4rem; margin-bottom: 15px;">${game.icon}</div>
            <h3 style="color: ${isUnlocked ? '#00ffff' : '#888'}; font-size: 1.2rem; margin-bottom: 10px;">${game.name}</h3>
            <p style="color: ${isUnlocked ? '#fff' : '#666'}; font-size: 0.9rem; margin-bottom: 15px;">${game.description}</p>
            ${!isUnlocked ? '<p style="color: #ff0066; font-size: 0.8rem;">🔮 Secreto requerido</p>' : ''}
        `;
        
        if (isUnlocked) {
            gameCard.addEventListener('click', game.action);
        }
        
        gamesContainer.appendChild(gameCard);
    });
}

// ========== JUEGO: LA BIBLIOTECA MALDITA ========== 
function startCursedLibraryGame() {
    // Cerrar modal de juegos
    gamesModal.style.display = 'none';
    
    // Crear contenedor del juego
    const gameContainer = document.createElement('div');
    gameContainer.id = 'cursedLibraryGame';
    gameContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 10000;
        overflow: hidden;
    `;
    
    document.body.appendChild(gameContainer);
    document.body.style.overflow = 'hidden';
    
    // Inicializar juego
    initCursedLibrary(gameContainer);
}

function initCursedLibrary(container) {
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Estado del juego
    const gameState = {
        phase: 'intro', // intro, collect, chase, escape
        booksCollected: 0,
        totalBooks: 8,
        playerX: 400,
        playerY: 300,
        playerSpeed: isMobile ? 4 : 3,
        flashlightOn: false,
        curseSpiritX: 100,
        curseSpiritY: 100,
        curseSpiritSpeed: isMobile ? 1.5 : 2,
        curseSpiritActive: false,
        isHiding: false,
        hidingSpots: [],
        books: [],
        noiseLevel: 0,
        keys: {},
        gameOver: false,
        escaped: false,
        // Controles táctiles
        touchStartX: 0,
        touchStartY: 0,
        touchCurrentX: 0,
        touchCurrentY: 0,
        isTouching: false
    };
    
    // HTML del juego
    container.innerHTML = `
        <canvas id="libraryCanvas" width="${isMobile ? window.innerWidth : 800}" height="${isMobile ? window.innerHeight - 200 : 600}" style="display: block; margin: 0 auto; background: #0a0a0a;"></canvas>
        
        <div id="gameUI" style="position: absolute; top: 10px; left: 10px; color: #fff; font-family: Arial; z-index: 10001;">
            <div style="background: rgba(0, 0, 0, 0.8); padding: ${isMobile ? '10px' : '15px'}; border-radius: 10px; border: 2px solid #8a2be2;">
                <div id="booksCounter" style="font-size: ${isMobile ? '1rem' : '1.2rem'}; margin-bottom: 8px;">📚 Libros: <span id="bookCount">0</span>/${gameState.totalBooks}</div>
                <div id="flashlightStatus" style="font-size: ${isMobile ? '0.9rem' : '1rem'}; margin-bottom: 8px;">🔦 Linterna: <span id="flashStatus">APAGADA</span></div>
                <div id="noiseIndicator" style="font-size: ${isMobile ? '0.9rem' : '1rem'};">🔊 Ruido: <span id="noiseLevel">Bajo</span></div>
            </div>
            
            ${!isMobile ? `
            <div id="controls" style="background: rgba(0, 0, 0, 0.8); padding: 15px; border-radius: 10px; border: 2px solid #8a2be2; margin-top: 10px;">
                <div style="font-size: 0.9rem; margin-bottom: 5px;">⌨️ Controles:</div>
                <div style="font-size: 0.8rem; line-height: 1.5;">
                    WASD / Flechas: Mover<br>
                    F: Linterna<br>
                    E: Esconderse<br>
                    Shift: Correr (hace ruido)
                </div>
            </div>
            ` : ''}
        </div>
        
        ${isMobile ? `
        <!-- Controles táctiles para móvil -->
        <div id="mobileControls" style="position: absolute; bottom: 20px; left: 0; right: 0; z-index: 10001; display: flex; justify-content: space-between; padding: 0 20px; pointer-events: none;">
            <!-- Joystick virtual izquierdo -->
            <div id="joystickContainer" style="position: relative; width: 150px; height: 150px; pointer-events: auto;">
                <div id="joystickBase" style="
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    background: rgba(138, 43, 226, 0.3);
                    border: 3px solid rgba(138, 43, 226, 0.6);
                "></div>
                <div id="joystickStick" style="
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(255, 0, 102, 0.7);
                    border: 3px solid rgba(255, 0, 102, 0.9);
                    left: 45px;
                    top: 45px;
                    transition: all 0.1s ease;
                "></div>
            </div>
            
            <!-- Botones de acción derechos -->
            <div style="display: flex; flex-direction: column; gap: 15px; pointer-events: auto;">
                <button id="flashlightBtn" style="
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255, 200, 0, 0.7), rgba(255, 150, 0, 0.7));
                    border: 3px solid rgba(255, 200, 0, 0.9);
                    color: #fff;
                    font-size: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
                    touch-action: manipulation;
                ">🔦</button>
                
                <button id="hideBtn" style="
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(138, 43, 226, 0.7), rgba(255, 0, 102, 0.7));
                    border: 3px solid rgba(138, 43, 226, 0.9);
                    color: #fff;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
                    font-weight: bold;
                    touch-action: manipulation;
                ">HIDE</button>
                
                <button id="runBtn" style="
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(0, 255, 100, 0.7), rgba(0, 200, 80, 0.7));
                    border: 3px solid rgba(0, 255, 100, 0.9);
                    color: #fff;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
                    font-weight: bold;
                    touch-action: manipulation;
                ">RUN</button>
            </div>
        </div>
        ` : ''}
        
        <div id="gameMessage" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #fff; font-size: ${isMobile ? '1.5rem' : '2rem'}; text-align: center; text-shadow: 0 0 20px rgba(138, 43, 226, 0.8); pointer-events: none; z-index: 10002; max-width: 90%;"></div>
    `;
    
    const canvas = document.getElementById('libraryCanvas');
    const ctx = canvas.getContext('2d');
    const messageDiv = document.getElementById('gameMessage');
    const bookCountSpan = document.getElementById('bookCount');
    const flashStatusSpan = document.getElementById('flashStatus');
    const noiseLevelSpan = document.getElementById('noiseLevel');
    
    // Ajustar canvas para móvil
    if (isMobile) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 200;
        // Escalar el mundo del juego
        gameState.playerX = canvas.width / 2;
        gameState.playerY = canvas.height / 2;
    }
    
    // Generar libros aleatorios
    for (let i = 0; i < gameState.totalBooks; i++) {
        gameState.books.push({
            x: Math.random() * (canvas.width - 100) + 50,
            y: Math.random() * (canvas.height - 100) + 50,
            collected: false
        });
    }
    
    // Generar escondites
    gameState.hidingSpots = [
        { x: 50, y: 50, width: 60, height: 60 },
        { x: canvas.width - 110, y: 50, width: 60, height: 60 },
        { x: 50, y: canvas.height - 110, width: 60, height: 60 },
        { x: canvas.width - 110, y: canvas.height - 110, width: 60, height: 60 },
        { x: canvas.width / 2 - 40, y: canvas.height / 2 - 40, width: 80, height: 80 }
    ];
    
    // ========== CONTROLES TÁCTILES PARA MÓVIL ==========
    if (isMobile) {
        const joystickContainer = document.getElementById('joystickContainer');
        const joystickStick = document.getElementById('joystickStick');
        const flashlightBtn = document.getElementById('flashlightBtn');
        const hideBtn = document.getElementById('hideBtn');
        const runBtn = document.getElementById('runBtn');
        
        let joystickActive = false;
        let joystickCenterX = 75;
        let joystickCenterY = 75;
        
        // Joystick virtual
        joystickContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            joystickActive = true;
            const touch = e.touches[0];
            const rect = joystickContainer.getBoundingClientRect();
            updateJoystick(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        joystickContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!joystickActive) return;
            const touch = e.touches[0];
            const rect = joystickContainer.getBoundingClientRect();
            updateJoystick(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        joystickContainer.addEventListener('touchend', (e) => {
            e.preventDefault();
            joystickActive = false;
            joystickStick.style.left = '45px';
            joystickStick.style.top = '45px';
            gameState.keys = {};
        });
        
        function updateJoystick(x, y) {
            const dx = x - joystickCenterX;
            const dy = y - joystickCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 45;
            
            if (distance > maxDistance) {
                const angle = Math.atan2(dy, dx);
                x = joystickCenterX + Math.cos(angle) * maxDistance;
                y = joystickCenterY + Math.sin(angle) * maxDistance;
            }
            
            joystickStick.style.left = (x - 30) + 'px';
            joystickStick.style.top = (y - 30) + 'px';
            
            // Actualizar teclas según dirección
            const finalDx = x - joystickCenterX;
            const finalDy = y - joystickCenterY;
            
            gameState.keys = {};
            if (Math.abs(finalDx) > 10 || Math.abs(finalDy) > 10) {
                if (finalDy < -15) gameState.keys['w'] = true;
                if (finalDy > 15) gameState.keys['s'] = true;
                if (finalDx < -15) gameState.keys['a'] = true;
                if (finalDx > 15) gameState.keys['d'] = true;
            }
        }
        
        // Botón de linterna
        flashlightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            gameState.flashlightOn = !gameState.flashlightOn;
            flashStatusSpan.textContent = gameState.flashlightOn ? 'ENCENDIDA' : 'APAGADA';
            flashStatusSpan.style.color = gameState.flashlightOn ? '#00ff00' : '#fff';
            flashlightBtn.style.opacity = gameState.flashlightOn ? '1' : '0.6';
        });
        
        // Botón de esconderse
        hideBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!gameState.isHiding) {
                checkHiding();
            } else {
                gameState.isHiding = false;
            }
        });
        
        // Botón de correr
        let runActive = false;
        runBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            runActive = true;
            gameState.keys['shift'] = true;
            runBtn.style.opacity = '1';
            runBtn.style.transform = 'scale(0.95)';
        });
        
        runBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            runActive = false;
            gameState.keys['shift'] = false;
            runBtn.style.opacity = '0.8';
            runBtn.style.transform = 'scale(1)';
        });
    }
    
    // Mostrar mensaje de intro
    showMessage('LA BIBLIOTECA MALDITA', 2000, () => {
        showMessage('Recoge 8 libros...', 2000, () => {
            showMessage('Pero ten cuidado...', 2000, () => {
                gameState.phase = 'collect';
                gameLoop();
            });
        });
    });
    
    function showMessage(text, duration, callback) {
        messageDiv.textContent = text;
        messageDiv.style.opacity = '1';
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            if (callback) {
                setTimeout(callback, 500);
            }
        }, duration);
    }
    
    // Controles de teclado (PC)
    if (!isMobile) {
        document.addEventListener('keydown', (e) => {
            gameState.keys[e.key.toLowerCase()] = true;
            
            // Linterna
            if (e.key.toLowerCase() === 'f') {
                gameState.flashlightOn = !gameState.flashlightOn;
                flashStatusSpan.textContent = gameState.flashlightOn ? 'ENCENDIDA' : 'APAGADA';
                flashStatusSpan.style.color = gameState.flashlightOn ? '#00ff00' : '#fff';
            }
            
            // Esconderse
            if (e.key.toLowerCase() === 'e' && !gameState.isHiding) {
                checkHiding();
            } else if (e.key.toLowerCase() === 'e' && gameState.isHiding) {
                gameState.isHiding = false;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            gameState.keys[e.key.toLowerCase()] = false;
        });
    }
    
    function checkHiding() {
        for (let spot of gameState.hidingSpots) {
            const dx = gameState.playerX - (spot.x + spot.width / 2);
            const dy = gameState.playerY - (spot.y + spot.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50) {
                gameState.isHiding = true;
                showMessage(isMobile ? 'Escondido... Toca HIDE para salir' : 'Escondido... Presiona E para salir', 1500);
                break;
            }
        }
    }
    
    function gameLoop() {
        if (gameState.gameOver || gameState.escaped) return;
        
        // Limpiar canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Movimiento del jugador
        let isRunning = gameState.keys['shift'];
        let currentSpeed = isRunning ? gameState.playerSpeed * 1.8 : gameState.playerSpeed;
        let moved = false;
        
        if (gameState.keys['w'] || gameState.keys['arrowup']) {
            gameState.playerY -= currentSpeed;
            moved = true;
        }
        if (gameState.keys['s'] || gameState.keys['arrowdown']) {
            gameState.playerY += currentSpeed;
            moved = true;
        }
        if (gameState.keys['a'] || gameState.keys['arrowleft']) {
            gameState.playerX -= currentSpeed;
            moved = true;
        }
        if (gameState.keys['d'] || gameState.keys['arrowright']) {
            gameState.playerX += currentSpeed;
            moved = true;
        }
        
        // Límites
        gameState.playerX = Math.max(20, Math.min(canvas.width - 20, gameState.playerX));
        gameState.playerY = Math.max(20, Math.min(canvas.height - 20, gameState.playerY));
        
        // Actualizar nivel de ruido
        if (moved && isRunning) {
            gameState.noiseLevel = Math.min(100, gameState.noiseLevel + 2);
            noiseLevelSpan.textContent = 'ALTO';
            noiseLevelSpan.style.color = '#ff0066';
        } else {
            gameState.noiseLevel = Math.max(0, gameState.noiseLevel - 1);
            if (gameState.noiseLevel > 50) {
                noiseLevelSpan.textContent = 'Medio';
                noiseLevelSpan.style.color = '#ffaa00';
            } else {
                noiseLevelSpan.textContent = 'Bajo';
                noiseLevelSpan.style.color = '#00ff00';
            }
        }
        
        // Dibujar biblioteca (paredes, estantes)
        drawLibrary(ctx, canvas.width, canvas.height);
        
        // Dibujar escondites
        ctx.fillStyle = '#2a1a3a';
        ctx.strokeStyle = '#8a2be2';
        ctx.lineWidth = 2;
        for (let spot of gameState.hidingSpots) {
            ctx.fillRect(spot.x, spot.y, spot.width, spot.height);
            ctx.strokeRect(spot.x, spot.y, spot.width, spot.height);
        }
        
        // Dibujar libros
        for (let book of gameState.books) {
            if (!book.collected) {
                ctx.fillStyle = '#00ffff';
                ctx.font = `${isMobile ? '24px' : '20px'} Arial`;
                ctx.fillText('📚', book.x, book.y);
                
                // Colisión con libros
                const dx = gameState.playerX - book.x;
                const dy = gameState.playerY - book.y;
                if (Math.sqrt(dx * dx + dy * dy) < 30) {
                    book.collected = true;
                    gameState.booksCollected++;
                    bookCountSpan.textContent = gameState.booksCollected;
                    
                    // Activar maldición después de recoger todos
                    if (gameState.booksCollected === gameState.totalBooks) {
                        activateCurseSpirit();
                    }
                }
            }
        }
        
        // Linterna
        if (gameState.flashlightOn && !gameState.isHiding) {
            const gradient = ctx.createRadialGradient(
                gameState.playerX, gameState.playerY, 10,
                gameState.playerX, gameState.playerY, isMobile ? 120 : 150
            );
            gradient.addColorStop(0, 'rgba(255, 255, 200, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Espíritu maldito
        if (gameState.curseSpiritActive && !gameState.isHiding) {
            // IA del espíritu (persigue al jugador)
            const dx = gameState.playerX - gameState.curseSpiritX;
            const dy = gameState.playerY - gameState.curseSpiritY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Velocidad aumenta con el ruido
            let spiritSpeed = gameState.curseSpiritSpeed + (gameState.noiseLevel / 50);
            
            if (distance > 30) {
                gameState.curseSpiritX += (dx / distance) * spiritSpeed;
                gameState.curseSpiritY += (dy / distance) * spiritSpeed;
            }
            
            // Dibujar espíritu
            if (gameState.flashlightOn) {
                ctx.fillStyle = 'rgba(100, 0, 0, 0.8)';
                ctx.font = `${isMobile ? '50px' : '40px'} Arial`;
                ctx.fillText('👻', gameState.curseSpiritX - 25, gameState.curseSpiritY);
            } else {
                // Solo ojos en la oscuridad
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(gameState.curseSpiritX - 10, gameState.curseSpiritY - 10, 3, 0, Math.PI * 2);
                ctx.arc(gameState.curseSpiritX + 10, gameState.curseSpiritY - 10, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Colisión con espíritu
            if (distance < 35) {
                gameOver(false);
                return;
            }
        }
        
        // Dibujar jugador
        if (!gameState.isHiding) {
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.arc(gameState.playerX, gameState.playerY, isMobile ? 12 : 10, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Salida (aparece después de activar la maldición)
        if (gameState.curseSpiritActive) {
            const exitX = canvas.width - 60;
            const exitY = canvas.height / 2 - 25;
            
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(exitX, exitY, 50, 50);
            ctx.fillStyle = '#fff';
            ctx.font = `${isMobile ? '12px' : '14px'} Arial`;
            ctx.fillText('SALIDA', exitX + 5, exitY + 30);
            
            // Verificar si llegó a la salida
            const exitDx = gameState.playerX - (exitX + 25);
            const exitDy = gameState.playerY - (exitY + 25);
            if (Math.sqrt(exitDx * exitDx + exitDy * exitDy) < 40) {
                gameOver(true);
                return;
            }
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    function drawLibrary(ctx, width, height) {
        // Piso con patrón
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, width, height);
        
        // Estantes verticales (adaptar a tamaño de pantalla)
        const shelfCount = isMobile ? 2 : 3;
        const shelfSpacing = width / (shelfCount + 1);
        
        ctx.fillStyle = '#2a1a1a';
        for (let i = 1; i <= shelfCount; i++) {
            const x = shelfSpacing * i - 15;
            ctx.fillRect(x, 50, 30, height - 100);
            
            // Sombras
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(x + 30, 50, 10, height - 100);
            ctx.fillStyle = '#2a1a1a';
        }
    }
    
    function activateCurseSpirit() {
        gameState.phase = 'chase';
        gameState.curseSpiritActive = true;
        gameState.curseSpiritX = Math.random() * (canvas.width - 200) + 100;
        gameState.curseSpiritY = Math.random() * (canvas.height - 200) + 100;
        
        showMessage('¡ALGO DESPERTÓ!', 2000, () => {
            showMessage('¡ESCAPA POR LA SALIDA!', 2000);
        });
    }
    
    function gameOver(escaped) {
        gameState.gameOver = true;
        gameState.escaped = escaped;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10003;
            color: #fff;
            text-align: center;
            padding: 20px;
        `;
        
        overlay.innerHTML = `
            <h1 style="font-size: ${isMobile ? '3rem' : '4rem'}; color: ${escaped ? '#00ff00' : '#ff0000'}; margin-bottom: 20px; text-shadow: 0 0 30px ${escaped ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)'};">
                ${escaped ? '¡ESCAPASTE!' : 'GAME OVER'}
            </h1>
            <p style="font-size: ${isMobile ? '1.2rem' : '1.5rem'}; margin-bottom: 40px; max-width: 90%;">
                ${escaped ? '¡Lograste escapar de la biblioteca maldita!' : 'La maldición te atrapó...'}
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
                <button id="playAgain" style="
                    background: linear-gradient(45deg, #8a2be2, #ff0066);
                    color: #fff;
                    border: none;
                    padding: ${isMobile ? '12px 30px' : '15px 40px'};
                    font-size: ${isMobile ? '1rem' : '1.2rem'};
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    touch-action: manipulation;
                ">Jugar de Nuevo</button>
                <button id="exitGame" style="
                    background: linear-gradient(45deg, #666, #888);
                    color: #fff;
                    border: none;
                    padding: ${isMobile ? '12px 30px' : '15px 40px'};
                    font-size: ${isMobile ? '1rem' : '1.2rem'};
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    touch-action: manipulation;
                ">Salir</button>
            </div>
        `;
        
        container.appendChild(overlay);
        
        document.getElementById('playAgain').addEventListener('click', () => {
            container.remove();
            document.body.style.overflow = 'auto';
            startCursedLibraryGame();
        });
        
        document.getElementById('exitGame').addEventListener('click', () => {
            container.remove();
            document.body.style.overflow = 'auto';
        });
    }
}

// ========== JUEGO: MEMORIA DE DOMINIO ==========
function startDomainMemoryGame() {
    gamesModal.style.display = 'none';
    
    const memoryContainer = document.createElement('div');
    memoryContainer.id = 'domainMemoryGame';
    memoryContainer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #0a0a1a; z-index: 10000; display: flex; flex-direction: column;
        align-items: center; justify-content: center; color: #fff; font-family: Arial;
    `;

    memoryContainer.innerHTML = `
        <div style="text-align:center; margin-bottom:30px;">
            <h2 style="color:#00ffff; font-size:2.5rem;">🧠 Memoria de Dominio</h2>
            <p>Encuentra las parejas de técnicas malditas</p>
            <div id="memoryScore" style="font-size:1.3rem; margin:15px 0;">Parejas: <span id="pairsFound">0</span>/6</div>
        </div>
        <div id="memoryGrid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; max-width:520px;"></div>
        <button onclick="this.closest('#domainMemoryGame').remove(); document.body.style.overflow='auto'" 
                style="margin-top:30px; padding:12px 30px; font-size:1rem; background:#ff0066; border:none; border-radius:10px; color:#fff; cursor:pointer;">
            Salir
        </button>
    `;

    document.body.appendChild(memoryContainer);
    document.body.style.overflow = 'hidden';

    const cards = [
        '⚡ Domain Expansion', '⚡ Domain Expansion',
        '♾️ Infinity', '♾️ Infinity',
        '👹 Malevolent Shrine', '👹 Malevolent Shrine',
        '🌀 Hollow Purple', '🌀 Hollow Purple',
        '🔥 Cleave', '🔥 Cleave',
        '🌸 Flower Bomb', '🌸 Flower Bomb'
    ];

    let flipped = [];
    let matched = 0;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(text) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.style.cssText = `
            width:110px; height:110px; background:#1a0a2a; border:3px solid #8a2be2;
            border-radius:12px; display:flex; align-items:center; justify-content:center;
            font-size:1.8rem; cursor:pointer; transition:all .3s; position:relative;
        `;
        card.dataset.value = text;
        card.innerHTML = `<div style="opacity:0;">${text}</div>`;
        
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

        this.classList.add('flipped');
        this.style.background = '#2a1a4a';
        this.querySelector('div').style.opacity = '1';
        flipped.push(this);

        if (flipped.length === 2) {
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flipped;
        
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matched++;
            document.getElementById('pairsFound').textContent = matched;
            
            if (matched === 6) {
                setTimeout(() => {
                    alert('¡Perfecto! Dominaste la memoria de dominio 🌀');
                    memoryContainer.remove();
                    document.body.style.overflow = 'auto';
                }, 400);
            }
            flipped = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.background = '#1a0a2a';
                card2.style.background = '#1a0a2a';
                card1.querySelector('div').style.opacity = '0';
                card2.querySelector('div').style.opacity = '0';
                flipped = [];
                lockBoard = false;
            }, 1000);
        }
    }

    shuffle(cards);
    const grid = document.getElementById('memoryGrid');
    cards.forEach(card => grid.appendChild(createCard(card)));
}

// ========== JUEGO: QUIZ MALDITO ==========
function startCursedQuizGame() {
    gamesModal.style.display = 'none';
    
    const quizContainer = document.createElement('div');
    quizContainer.id = 'cursedQuizGame';
    quizContainer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #0a0a1a; z-index: 10000; color: #fff; font-family: Arial;
        display: flex; align-items: center; justify-content: center;
    `;

    const questions = [
        {
            q: "¿Cuál es la técnica innata de Gojo Satoru?",
            a: ["Infinity", "Malevolent Shrine", "Boogie Woogie", "Ratio"],
            correct: 0
        },
        {
            q: "¿Qué clan pertenece Megumi Fushiguro?",
            a: ["Zenin", "Gojo", "Kamo", "Inumaki"],
            correct: 0
        },
        {
            q: "¿Quién es el Rey de las Maldiciones?",
            a: ["Mahito", "Jogo", "Sukuna", "Hanami"],
            correct: 2
        },
        {
            q: "¿Cuál es el dominio de Sukuna?",
            a: ["Unlimited Void", "Malevolent Shrine", "Coffin of the Iron Mountain", "Self-Embodiment of Perfection"],
            correct: 1
        },
        {
            q: "¿Qué grado es Yuji Itadori al inicio?",
            a: ["Grado 4", "Grado 3", "Grado 2", "Grado Especial"],
            correct: 0
        }
    ];

    let current = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[current];
        quizContainer.innerHTML = `
            <div style="max-width:500px; text-align:center;">
                <div style="color:#ff0066; font-size:1.1rem; margin-bottom:10px;">Pregunta ${current+1}/${questions.length}</div>
                <div style="font-size:1.6rem; margin:20px 0;">${q.q}</div>
                <div style="display:flex; flex-direction:column; gap:15px; margin-top:30px;">
                    ${q.a.map((option,i) => `
                        <button onclick="answerQuiz(${i})" style="padding:18px; font-size:1.1rem; background:linear-gradient(135deg,#8a2be2,#ff0066); border:none; border-radius:12px; color:#fff; cursor:pointer;">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div style="margin-top:40px; color:#00ffff;">Puntaje: <span id="quizScore">${score}</span></div>
            </div>
        `;
    }

    window.answerQuiz = function(selected) {
        const correct = questions[current].correct;
        if (selected === correct) {
            score++;
            document.getElementById('quizScore').textContent = score;
        }
        
        current++;
        if (current < questions.length) {
            setTimeout(loadQuestion, 800);
        } else {
            setTimeout(() => {
                quizContainer.innerHTML = `
                    <div style="text-align:center;">
                        <h2 style="color:#00ff00; font-size:3rem;">¡Quiz Terminado!</h2>
                        <p style="font-size:2rem; margin:30px 0;">Puntaje final: <strong>${score}</strong>/${questions.length}</p>
                        <button onclick="this.closest('#cursedQuizGame').remove(); document.body.style.overflow='auto'" 
                                style="padding:15px 40px; font-size:1.2rem; background:#8a2be2; border:none; border-radius:10px; color:#fff; cursor:pointer;">
                            Volver al menú
                        </button>
                    </div>
                `;
            }, 800);
        }
    };

    document.body.appendChild(quizContainer);
    document.body.style.overflow = 'hidden';
    loadQuestion();
}
// ========== JUEGO: QUIZ MALDITO ==========
function startCursedQuizGame() {
    gamesModal.style.display = 'none';
    
    const quizContainer = document.createElement('div');
    quizContainer.id = 'cursedQuizGame';
    quizContainer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #0a0a1a; z-index: 10000; color: #fff; font-family: Arial;
        display: flex; align-items: center; justify-content: center;
    `;

    const questions = [
        {
            q: "¿Cuál es la técnica innata de Gojo Satoru?",
            a: ["Infinity", "Malevolent Shrine", "Boogie Woogie", "Ratio"],
            correct: 0
        },
        {
            q: "¿Qué clan pertenece Megumi Fushiguro?",
            a: ["Zenin", "Gojo", "Kamo", "Inumaki"],
            correct: 0
        },
        {
            q: "¿Quién es el Rey de las Maldiciones?",
            a: ["Mahito", "Jogo", "Sukuna", "Hanami"],
            correct: 2
        },
        {
            q: "¿Cuál es el dominio de Sukuna?",
            a: ["Unlimited Void", "Malevolent Shrine", "Coffin of the Iron Mountain", "Self-Embodiment of Perfection"],
            correct: 1
        },
        {
            q: "¿Qué grado es Yuji Itadori al inicio?",
            a: ["Grado 4", "Grado 3", "Grado 2", "Grado Especial"],
            correct: 0
        }
    ];

    let current = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[current];
        quizContainer.innerHTML = `
            <div style="max-width:500px; text-align:center;">
                <div style="color:#ff0066; font-size:1.1rem; margin-bottom:10px;">Pregunta ${current+1}/${questions.length}</div>
                <div style="font-size:1.6rem; margin:20px 0;">${q.q}</div>
                <div style="display:flex; flex-direction:column; gap:15px; margin-top:30px;">
                    ${q.a.map((option,i) => `
                        <button onclick="answerQuiz(${i})" style="padding:18px; font-size:1.1rem; background:linear-gradient(135deg,#8a2be2,#ff0066); border:none; border-radius:12px; color:#fff; cursor:pointer;">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div style="margin-top:40px; color:#00ffff;">Puntaje: <span id="quizScore">${score}</span></div>
            </div>
        `;
    }

    window.answerQuiz = function(selected) {
        const correct = questions[current].correct;
        if (selected === correct) {
            score++;
            document.getElementById('quizScore').textContent = score;
        }
        
        current++;
        if (current < questions.length) {
            setTimeout(loadQuestion, 800);
        } else {
            setTimeout(() => {
                quizContainer.innerHTML = `
                    <div style="text-align:center;">
                        <h2 style="color:#00ff00; font-size:3rem;">¡Quiz Terminado!</h2>
                        <p style="font-size:2rem; margin:30px 0;">Puntaje final: <strong>${score}</strong>/${questions.length}</p>
                        <button onclick="this.closest('#cursedQuizGame').remove(); document.body.style.overflow='auto'" 
                                style="padding:15px 40px; font-size:1.2rem; background:#8a2be2; border:none; border-radius:10px; color:#fff; cursor:pointer;">
                            Volver al menú
                        </button>
                    </div>
                `;
            }, 800);
        }
    };

    document.body.appendChild(quizContainer);
    document.body.style.overflow = 'hidden';
    loadQuestion();
}