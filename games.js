// ==================== JUEGOS DISPONIBLES ====================
function cargarJuegos() {
    if (!gamesContainer || !window.JUEGOS_DISPONIBLES) return;
    
    gamesContainer.innerHTML = '';
    
    window.JUEGOS_DISPONIBLES.forEach(juego => {
        const tarjeta = document.createElement('div');
        tarjeta.style.cssText = `
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3));
            border: 2px solid #8a2be2;
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        `;
        
        tarjeta.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 15px;">${juego.icon}</div>
            <h3 style="color: #00ffff; margin-bottom: 10px; font-size: 1.1rem;">${juego.name}</h3>
            <p style="color: #fff; font-size: 0.9rem; margin-bottom: 15px;">${juego.description}</p>
        `;
        
        tarjeta.addEventListener('click', () => {
            if (juego.action) juego.action();
        });
        
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.transform = 'translateY(-5px)';
            tarjeta.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.6)';
        });
        
        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = 'translateY(0)';
            tarjeta.style.boxShadow = 'none';
        });
        
        gamesContainer.appendChild(tarjeta);
    });
}
window.JUEGOS_DISPONIBLES = [
    {
        id: 'energy-clicker',
        name: '⚡ Energía Clicker',
        icon: '⚡',
        description: 'Genera energía maldita haciendo click',
        action: () => {
            alert('⚡ Este juego abre desde el menú de Energía');
        }
    },
    {
        id: 'memoria',
        name: '🧠 Memoria de Dominio',
        icon: '🧠',
        description: 'Encuentra las parejas de técnicas',
        action: () => {
            iniciarMemoria();
        }
    },
    {
        id: 'quiz',
        name: '❓ Quiz Maldito',
        icon: '❓',
        description: 'Prueba tus conocimientos de JJK',
        action: () => {
            iniciarQuiz();
        }
    },
    {
        id: 'batalla',
        name: '⚔️ Batalla RPG',
        icon: '⚔️',
        description: 'Lucha contra enemigos por turnos',
        action: () => {
            iniciarBatallaRPG();
        }
    },
    {
        id: 'proximamente1',
        name: '🎮 Próximamente',
        icon: '🎮',
        description: 'Más juegos en desarrollo',
        action: () => {
            alert('🎮 Próximamente: Más juegos disponibles');
        }
    },
    {
        id: 'proximamente2',
        name: '🎯 Próximamente',
        icon: '🎯',
        description: 'Mantente atento a las actualizaciones',
        action: () => {
            alert('🎯 Próximamente: Nuevos juegos emocionantes');
        }
    }
];

// ==================== JUEGO 1: MEMORIA ====================

function iniciarMemoria() {
    const contenedor = document.createElement('div');
    contenedor.id = 'juegoMemoria';
    contenedor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a1a;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: Arial;
    `;

    const cartas = ['⚡', '⚡', '♾️', '♾️', '👹', '👹', '🌀', '🌀', '🔥', '🔥', '🌸', '🌸'];
    let volteadas = [];
    let emparejadas = 0;
    let tableroOcupado = false;

    function barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function voltearCarta() {
        if (tableroOcupado || this.classList.contains('volteada') || this.classList.contains('emparejada')) return;

        this.classList.add('volteada');
        this.style.background = '#2a1a4a';
        this.innerHTML = this.dataset.valor;
        volteadas.push(this);

        if (volteadas.length === 2) {
            tableroOcupado = true;
            const [carta1, carta2] = volteadas;
            
            if (carta1.dataset.valor === carta2.dataset.valor) {
                carta1.classList.add('emparejada');
                carta2.classList.add('emparejada');
                emparejadas++;
                
                if (emparejadas === 6) {
                    setTimeout(() => {
                        alert('¡Ganaste! 🌀');
                        contenedor.remove();
                        document.body.style.overflow = 'auto';
                    }, 500);
                }
                volteadas = [];
                tableroOcupado = false;
            } else {
                setTimeout(() => {
                    carta1.classList.remove('volteada');
                    carta2.classList.remove('volteada');
                    carta1.style.background = '#1a0a2a';
                    carta2.style.background = '#1a0a2a';
                    carta1.innerHTML = '';
                    carta2.innerHTML = '';
                    volteadas = [];
                    tableroOcupado = false;
                }, 1000);
            }
        }
    }

    barajar(cartas);

    let html = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #00ffff;">🧠 Memoria de Dominio</h2>
            <div style="margin-top: 15px;">Parejas: <span id="parejasEncontradas">0</span>/6</div>
            <button onclick="document.getElementById('juegoMemoria').remove(); document.body.style.overflow='auto';" 
                style="margin-top: 15px; background: #ff0066; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; cursor: pointer;">
                ✕ Salir
            </button>
        </div>
        <div id="tableroMemoria" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 500px; margin-bottom: 30px;">
    `;

    cartas.forEach(carta => {
        html += `
            <div style="width: 110px; height: 110px; background: #1a0a2a; border: 3px solid #8a2be2; border-radius: 12px; 
                display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; transition: all 0.3s;"
                data-valor="${carta}" class="memory-card">
            </div>
        `;
    });

    html += `</div>`;

    contenedor.innerHTML = html;
    document.body.appendChild(contenedor);
    document.body.style.overflow = 'hidden';

    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', voltearCarta);
    });
}

// ==================== JUEGO 2: QUIZ ====================

function iniciarQuiz() {
    const preguntas = [
        {
            q: "¿Cuál es la técnica innata de Gojo Satoru?",
            a: ["Infinity", "Malevolent Shrine", "Boogie Woogie", "Ratio"],
            correcta: 0
        },
        {
            q: "¿Qué clan pertenece Megumi?",
            a: ["Zenin", "Gojo", "Kamo", "Inumaki"],
            correcta: 0
        },
        {
            q: "¿Quién es el Rey de las Maldiciones?",
            a: ["Mahito", "Jogo", "Sukuna", "Hanami"],
            correcta: 2
        },
        {
            q: "¿Cuál es el dominio de Sukuna?",
            a: ["Unlimited Void", "Malevolent Shrine", "Coffin", "Perfect"],
            correcta: 1
        },
        {
            q: "¿Qué grado es Yuji Itadori al inicio?",
            a: ["Grado 4", "Grado 3", "Grado 2", "Grado 1"],
            correcta: 0
        }
    ];

    const contenedor = document.createElement('div');
    contenedor.id = 'juegoQuiz';
    contenedor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a1a;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: Arial;
    `;

    let indice = 0;
    let puntuacion = 0;

    function cargarPregunta() {
        const p = preguntas[indice];
        contenedor.innerHTML = `
            <div style="text-align: center; max-width: 600px; padding: 40px;">
                <button onclick="document.getElementById('juegoQuiz').remove(); document.body.style.overflow='auto';" 
                    style="position: absolute; top: 30px; right: 30px; background: #ff0066; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; cursor: pointer;">
                    ✕ Salir
                </button>
                <div style="color: #ff0066; font-size: 1.1rem; margin-bottom: 20px;">Pregunta ${indice + 1}/${preguntas.length}</div>
                <h2 style="font-size: 1.5rem; margin-bottom: 30px;">${p.q}</h2>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${p.a.map((opt, i) => `
                        <button onclick="responderQuiz(${i})" 
                            style="padding: 15px; font-size: 1rem; background: linear-gradient(135deg, #8a2be2, #ff0066); border: none; border-radius: 10px; color: #fff; cursor: pointer;">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div style="margin-top: 30px; color: #00ffff;">Puntuación: <span id="puntuacionQuiz">${puntuacion}</span></div>
            </div>
        `;
    }

    window.responderQuiz = function(seleccionado) {
        const p = preguntas[indice];
        if (seleccionado === p.correcta) {
            puntuacion++;
        }
        
        indice++;
        if (indice < preguntas.length) {
            setTimeout(cargarPregunta, 800);
        } else {
            setTimeout(() => {
                contenedor.innerHTML = `
                    <div style="text-align: center;">
                        <h2 style="color: #00ff00; font-size: 3rem;">¡Quiz Terminado!</h2>
                        <p style="font-size: 2rem; margin: 30px 0;">Puntuación: ${puntuacion}/${preguntas.length}</p>
                        <button onclick="document.getElementById('juegoQuiz').remove(); document.body.style.overflow='auto';" 
                            style="background: #8a2be2; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 10px; color: #fff; cursor: pointer;">
                            Salir
                        </button>
                    </div>
                `;
            }, 800);
        }
    };

    document.body.appendChild(contenedor);
    document.body.style.overflow = 'hidden';
    cargarPregunta();
}

// ==================== JUEGO 3: BATALLA RPG ====================

function iniciarBatallaRPG() {
    const contenedor = document.createElement('div');
    contenedor.id = 'juegoBatalla';
    contenedor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 100%);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: Arial;
        padding: 40px;
        box-sizing: border-box;
    `;

    const personajes = [
        { name: 'Yuji', hp: 100, maxHp: 100, icon: '👊', ataque: 15 },
        { name: 'Gojo', hp: 120, maxHp: 120, icon: '♾️', ataque: 25 },
        { name: 'Sukuna', hp: 150, maxHp: 150, icon: '👹', ataque: 30 },
        { name: 'Megumi', hp: 90, maxHp: 90, icon: '🐺', ataque: 18 }
    ];

    let jugador = { ...personajes[Math.floor(Math.random() * personajes.length)] };
    let enemigo = { ...personajes[Math.floor(Math.random() * personajes.length)] };

    while (jugador.name === enemigo.name) {
        enemigo = { ...personajes[Math.floor(Math.random() * personajes.length)] };
    }

    let batalla = true;

    function renderizar() {
        if (!batalla) {
            const ganador = jugador.hp > 0 ? jugador.name : enemigo.name;
            const mensaje = jugador.hp > 0 ? '🎉 ¡VICTORIA!' : '💀 DERROTA';
            const color = jugador.hp > 0 ? '#00ff00' : '#ff0000';
            
            contenedor.innerHTML = `
                <h1 style="color: ${color}; font-size: 3rem; margin-bottom: 30px;">${mensaje}</h1>
                <button onclick="document.getElementById('juegoBatalla').remove(); document.body.style.overflow='auto';" 
                    style="background: #8a2be2; border: none; padding: 15px 40px; font-size: 1.2rem; border-radius: 10px; color: #fff; cursor: pointer;">
                    Salir
                </button>
            `;
            return;
        }

        contenedor.innerHTML = `
            <button onclick="document.getElementById('juegoBatalla').remove(); document.body.style.overflow='auto';" 
                style="position: absolute; top: 30px; right: 30px; background: #ff0066; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; cursor: pointer;">
                ✕ Salir
            </button>
            <h2 style="color: #00ffff; margin-bottom: 30px;">⚔️ Batalla de Hechiceros</h2>
            <div style="display: flex; justify-content: space-around; align-items: center; width: 100%; max-width: 800px; margin-bottom: 30px;">
                <div style="flex: 1; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 15px;">${jugador.icon}</div>
                    <div style="color: #00ff00; font-size: 1.5rem; margin-bottom: 10px;">${jugador.name}</div>
                    <div>HP: ${jugador.hp}/${jugador.maxHp}</div>
                    <div style="background: rgba(0,0,0,0.5); height: 20px; border-radius: 10px; overflow: hidden; margin-top: 5px;">
                        <div style="width: ${(jugador.hp/jugador.maxHp)*100}%; height: 100%; background: linear-gradient(90deg, #00ff00, #00cc00);"></div>
                    </div>
                </div>
                <div style="font-size: 3rem; color: #ff0066; padding: 0 40px;">VS</div>
                <div style="flex: 1; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 15px;">${enemigo.icon}</div>
                    <div style="color: #ff0066; font-size: 1.5rem; margin-bottom: 10px;">${enemigo.name}</div>
                    <div>HP: ${enemigo.hp}/${enemigo.maxHp}</div>
                    <div style="background: rgba(0,0,0,0.5); height: 20px; border-radius: 10px; overflow: hidden; margin-top: 5px;">
                        <div style="width: ${(enemigo.hp/enemigo.maxHp)*100}%; height: 100%; background: linear-gradient(90deg, #ff0000, #cc0000);"></div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 20px;">
                <button onclick="atacarBatalla('atacar')" style="
                    padding: 15px 40px;
                    background: linear-gradient(45deg, #ff0066, #8a2be2);
                    border: none;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;">
                    ⚔️ Atacar
                </button>
                <button onclick="atacarBatalla('defender')" style="
                    padding: 15px 40px;
                    background: linear-gradient(45deg, #00ffff, #0099ff);
                    border: none;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;">
                    🛡️ Defender
                </button>
            </div>
        `;
    }

    window.atacarBatalla = function(accion) {
        if (accion === 'atacar') {
            const daño = Math.floor(Math.random() * 10) + jugador.ataque;
            enemigo.hp -= daño;
            
            if (enemigo.hp > 0) {
                setTimeout(() => {
                    const dañoEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;
                    jugador.hp -= dañoEnemigo;
                    
                    if (jugador.hp <= 0 || enemigo.hp <= 0) {
                        batalla = false;
                    }
                    
                    renderizar();
                }, 1500);
            } else {
                batalla = false;
                renderizar();
            }
        }
    };

    document.body.appendChild(contenedor);
    document.body.style.overflow = 'hidden';
    renderizar();
}

// este es el games.js