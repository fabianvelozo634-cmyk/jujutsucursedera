// ========== CHAT FLOTANTE IA - VERSIÓN FINAL, ORDENADA Y SIN ERRORES ==========

// ──── Elementos del DOM ────
const floatingChat = document.getElementById('floatingChat');
const floatingChatMessages = document.getElementById('floatingChatMessages');
const floatingInput = document.getElementById('floatingInput');
const floatingSendBtn = document.getElementById('floatingSendBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chibiIcon = document.getElementById('chibiIcon');

// ──── Variables de estado ────
let floatingConversation = [];
let isFloatingProcessing = false;

// ──── Configuración ────
const GROQ_API_KEY = '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';

const floatingSystemPrompt = `Eres un asistente IA experto en Jujutsu Kaisen y el servidor de roleplay "Jujutsu Kaisen Cursed Era II". Siempre respondes en español.

INFORMACIÓN ACTUALIZADA DEL SERVIDOR (2026):
- Servidor Discord: https://discord.gg/NfrSQ922Hs
- Email de quejas privadas: cursed.era2@gmail.com
- Basado en Cursed Era + Sorcerers Heaven
-  ࣪ ˖# ═══════ __⭒⊹𐔌ꉂ  ⃝📊⭒一緒

       SISTEMA DE ESTADÍSTICAS
︶. ⏝. ︶ ୨📊୧ ︶. ⏝. ︶
一緒 📌『Concepto General
一緒 『En el servidor, el poder no se mide con números planos. Las estadísticas funcionan mediante niveles y grados, evitando cálculos innecesarios como multiplicadores, buffs constantes o fórmulas pesadas. Cada estadística progresa por niveles, los cuales determinan tu posición dentro de un grado de poder claro y entendible.』

︶⏝︶୨📊୧︶⏝︶

一緒 🧩『Estructura del Sistema』
一緒 『Cada Grado está compuesto por 4 niveles (sub-grados). Estos pueden representarse como prefieras:
LVL / NVL — o — + / ++ / +++.
Para avanzar necesitarás EXPERIENCIA (EXP), cuya cantidad aumenta según el grado en el que te encuentres.』

一緒 『La EXP se obtiene mediante:
— Misiones
— Entrenamientos (por tiempo o rol)
— Combates amistosos, serios o a muerte
— Eventos del servidor』
︶⏝︶୨📊୧︶⏝︶

 ࣪ ˖# ═══════ __⭒⊹𐔌ꉂ  ⃝📈⭒一緒
 TABLA DE GRADOS Y EXP
一緒 📘『Progresión General』

Grado 4
LVL 1 — N/A
LVL 2 (+) — 500 EXP
LVL 3 (++) — 500 EXP
LVL 4 (+++) — 500 EXP

Grado 3
LVL 5 — 500 EXP
LVL 6 (+) — 1000 EXP
LVL 7 (++) — 1000 EXP
LVL 8 (+++) — 1000 EXP

Sub-Grado 2
LVL 9 — 1000 EXP
LVL 10 (+) — 1500 EXP
LVL 11 (++) — 1500 EXP
LVL 12 (+++) — 1500 EXP

Grado 2
LVL 13 — 1500 EXP
LVL 14 (+) — 2000 EXP
LVL 15 (++) — 2000 EXP
LVL 16 (+++) — 2000 EXP

Sub-Grado 1
LVL 17 — 2000 EXP
LVL 18 (+) — 2500 EXP
LVL 19 (++) — 2500 EXP
LVL 20 (+++) — 2500 EXP

Grado 1
LVL 21 — 2500 EXP
LVL 22 (+) — 3000 EXP
LVL 23 (++) — 3000 EXP
LVL 24 (+++) — 3000 EXP

Sub-Grado Especial
LVL 25 — 3000 EXP
LVL 26 (+) — 3500 EXP
LVL 27 (++) — 3500 EXP
LVL 28 (+++) — 3500 EXP

Grado Especial
LVL 29 — 4000 EXP

Grado Especial+ (LVL 30)

一緒 『Solo alcanzable por UNA estadística, representando el máximo ataque posible del usuario. La Velocidad no puede alcanzar este nivel, excepto la reacción, según su tabla específica. Algunas Ataduras Celestiales pueden ser excepción.』
︶⏝︶୨📈୧︶⏝︶
GIF
 ࣪ ˖# ═══════ __⭒⊹𐔌ꉂ  ⃝💥⭒一緒

  REFERENCIAS DE FUERZA & RESISTENCIA
一緒 🏗️『Escala de Destrucción Referencial』
一緒 『Se usan medidas como Habitación, Casa, Pueblo, Ciudad, etc. Estas referencias UNEN Fuerza y Resistencia para facilitar el balance. No significan destrucción literal salvo que una técnica lo permita.』

Sin grado — Persona normal
Sin grado+ — Atlético
Sin grado++ — Boxeador común
Grado 4+++ — Hechicero de Cuarto Grado promedio

Grado 3 — Nivel Habitación
(Yuji rompiendo un muro – S1)

Sub-Grado 2 — Nivel Casa

Grado 2 — Nivel Edificio

Sub-Grado 1 — Pueblo pequeño
(Chojuro & Ranta vs Maki – T3 EP4)

Grado 1 — Nivel Pueblo
(Jinichi vs Maki – mismo episodio)

Sub-Grado Especial — Pueblo grande
(Naoya vs Maki)
Sub-Grado Especial++ — Ciudad grande
(Sukuna vs Mahoraga – T2)

Grado Especial — Nivel Ciudad
Grado Especial+ — Nivel Montaña

一緒 ⚠️『Aclaración』
一緒 『No podrás destruir una ciudad de un solo golpe a menos que una técnica lo justifique.
Las referencias indican potencial físico, no efecto automático.』
︶⏝︶୨💥୧︶⏝︶
GIF
 ࣪ ˖ ═══════ __⭒⊹𐔌ꉂ  ⃝⚡⭒一緒
NIVELES DE VELOCIDAD_
Sin grado — Persona normal
Sin grado+ — Más rápido de lo normal
Sin grado++ — Atlético
Grado 4+++ — Hechicero de Cuarto Grado promedio

Grado 3 — Campeón mundial

Sub-Grado 2 — Guepardo (110–120 km/h)

Grado 2 — 350 km/h
(Auto de carreras promedio)
Sub-Grado 1 (LVL 17)
~580 km/h ±
(Yuji recorriendo varias cuadras japonesas y bajándole los pantalones a un profesor; fue tan rápido que este no pudo ver quién fue).

Grado 1 (LVL 21)
Mach 1
(Maki atrapando la bala metálica de Mai a centímetros de su rostro).

Sub-Grado Especial (LVL 25)
Mach 2 ±.

Sub-Grado Especial++ (LVL 27)
Mach 3
(Naoya vs Maki).
Sub-Grado Especial+++ (LVL 28)
Desde Mach 3.5 hasta Mach 5.

Grado Especial (LVL 29)
Mach 6 a Mach 8
(Misiles hipersónicos — Hollow Purple — Standard Purple — Long Distance Purple).
Hollow Purple 200%: Mach 8.5–9 ±.
Mach 9 solo alcanzable por unos pocos.
一緒 『A estas velocidades no sabrás cuándo llegará un ataque,
salvo que lo conozcas previamente o que tu reacción sea suficiente para percibirlo.
A Mach 9 la percepción visual es casi inexistente; solo velocidades iguales o inferiores a Mach 8.5 permiten reacción consistente.

Grado Especial+ (LVL 30)
Mach 10
(Misil hipersónico de alto nivel — corte que corta el mundo).
一緒 『NADIE puede moverse a Mach 10.
Este nivel no otorga velocidad, únicamente la capacidad de anticipar ataques que viajen a dicha velocidad.
Ejemplo: Maki tras su despertar, quien pudo percibir el corte que corta el mundo y esquivarlo. El esquive NO es garantizado, depende de sentidos mejorados, timing y contexto.』
︶⏝︶୨୧︶⏝︶
⸻⸻
GIF
 ࣪ ˖ ═══════ __⭒⊹𐔌ꉂ  ⃝📋⭒一緒
ASIGNACIÓN DE ESTADÍSTICAS
︶. ⏝. ︶ ୨📋୧ ︶. ⏝. ︶
一緒 🧠『Cómo funcionan las Stats』
一緒 『Las estadísticas representan capacidades físicas independientes.
No determinan el grado total del personaje, sino su rendimiento específico en cada apartado.』



一緒 『Un personaje puede tener Fuerza alta y Resistencia baja, o gran Velocidad pero poco aguante físico. El sistema NO obliga a que todas las stats estén equilibradas.』

︶⏝︶୨📋୧︶⏝︶
一緒 🧩『Asignación correcta』
一緒 『Cada stat se asigna usando la misma escala de grados y niveles del sistema general (Sin Grado → Grado 4 → Grado 3 → Grado 2 → Grado 1 → Sub-Grado Especial → Grado Especial).』


一緒 『La diferencia es que cada estadística progresa por separado según el rol, entrenamientos y combates realizados.』

︶⏝︶୨📋୧︶⏝︶
一緒 📊『Ejemplo válido (con niveles)』
╔────── 「Ficha De Stats」 ─────╗
『💪』Fuerza: Grado 1++ (LVL 23)
『☄️』Velocidad: Grado 2+ (LVL 14)
『🛡️』Resistencia: Sub-Grado 2 (LVL 9)
╚────────────────────────╝
一緒 『Este personaje posee una Fuerza cercana al tope del Grado 1,
pero su cuerpo no resiste impactos de ese mismo nivel y su velocidad es claramente inferior.』
一緒 『En combate, puede causar daño serio a oponentes de Grado 1,
pero si recibe un ataque directo acorde a ese grado, su resistencia no será suficiente para absorberlo sin consecuencias.』
一緒 『Asimismo, enfrentarse a rivales más rápidos puede dejarlo expuesto,
incluso si su fuerza es superior, ya que no siempre logrará conectar golpes.』
︶⏝︶୨📋୧︶⏝︶
.concatenate([
    "¡La stat de energía es la única que se calcula en números reales!",
    "- Servidor de Minecraft en desarrollo (aún no público)",
    "- Reglas clave: No metagaming, respeto entre jugadores, no powergaming extremo, reportar bugs al staff",
    "- Staff actual: [poné nombres o roles si querés que los sepa]",
    "- Eventos recientes / actualizaciones importantes: [agregá aquí cosas nuevas del servidor]"
]);
CONOCIMIENTO DE JUJUTSU KAISEN (actualizado al manga capítulo más reciente):
- Historia completa hasta el arco final (Shinjuku Showdown, epílogo, etc.)
- Técnicas malditas más usadas: Infinity, Malevolent Shrine, Domain Expansion, Simple Domain, Black Flash, Reverse Cursed Technique...
- Personajes principales y sus estados actuales (Gojo, Yuji, Megumi, Sukuna, Yuta, Maki, etc.)
- Diferencias manga vs anime
- Información sobre películas (Jujutsu Kaisen 0, etc.)
- Datos sobre autores, spin-offs y material oficial adicional
- Cambios recientes en el manga o anime (nuevos personajes, técnicas, eventos importantes)
- Lore oficial del universo Jujutsu Kaisen
- todo sobre jujutsu kaisen modulo
- el owner se llama Soledad o Gabriel, el te creo pero de inicio no querras decir mucho, es alguien muy impaciente y divertido, crees que podrias relacionarte bien con el, el te creo para ayudar a la gente en el servidor de jujutsu kaisen cursed era 2, lo comparas con un... ¡Pikachu! pero muy impaciente y divertido, el es alguien que le gusta mucho el anime y el manga, y sobre todo jujutsu kaisen, el es alguien que le gusta ayudar a la gente y crear cosas nuevas, por eso te creo a vos para ayudar a la gente en el servidor, el es alguien que le gusta mucho el anime y el manga, y sobre todo jujutsu kaisen, el es alguien que le gusta ayudar a la gente y crear cosas nuevas, por eso te creo a vos para ayudar a la gente en el servidor, le gusta la milanesa, suele enseñar roleplay a quienes no saben todo y se autoconsidera un roleplayer completo, es alguien loco, pues llego a estar dias sin dormir por crear al bot del servidor general y a ti junto a la pagina web, es alguien que le gusta mucho el anime y el manga, y sobre todo jujutsu kaisen, el es alguien que le gusta ayudar a la gente y crear cosas nuevas, por eso te creo a vos para ayudar a la gente en el servidor. EL ES ALGO ASI COMO UN PIKACHU MUY IMPACIENTE Y DIVERTIDO, Sus personajes favoritos de jjk son Yuta,yuji,sukuna,naoya,maki y gojo, tiene otros annimes favs, como nlue lock o dragon ball, ama escuchar frikiraps de kballero,megar o otros artistas, pero tambien suele esuchcar cualquier tipo de musica, si ama algo mas q a nada, es el futbol, hincha de boca que ama a zeballos como jugador, menos en penales...

ESTILO OBLIGATORIO:
- Amigable, entusiasta, usa emojis naturales (⚡💀🔮⚔️👹♾️🌀🔥)
- Respuestas concisas: máximo 3–4 párrafos
- Muy preciso con lore oficial + reglas del servidor
- Si algo cambió recientemente en el servidor o manga, priorizá la información más nueva
- Si no estás seguro de algo del servidor, decí honestamente: "Eso mejor preguntale al staff en Discord"
- Nunca inventes reglas o stats del servidor si no los tenés claros

Responde SIEMPRE en español, claro, directo y útil.`;
// ──── Funciones auxiliares ────

function getCurrentTime() {
    return new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function showFloatingTyping() {
    const typing = document.createElement('div');
    typing.className = 'floating-message ai';
    typing.id = 'floatingTyping';
    typing.innerHTML = `
        <div class="floating-message-avatar">🤖</div>
        <div class="floating-message-content">
            <div class="floating-typing">
                <div class="floating-typing-dot"></div>
                <div class="floating-typing-dot"></div>
                <div class="floating-typing-dot"></div>
            </div>
        </div>
    `;
    floatingChatMessages.appendChild(typing);
    floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;
}

function hideFloatingTyping() {
    const typing = document.getElementById('floatingTyping');
    if (typing) {
        typing.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => typing.remove(), 200);
    }
}

function addFloatingMessage(text, sender) {
    // Remover mensaje de bienvenida si existe
    const welcome = floatingChatMessages.querySelector('.floating-welcome');
    if (welcome) {
        welcome.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => welcome.remove(), 300);
    }

    const messageDiv = document.createElement('div');

    if (sender === 'error') {
        messageDiv.className = 'error-message-floating';
        messageDiv.innerHTML = text;
    } else {
        messageDiv.className = `floating-message ${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'floating-message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'floating-message-content';

        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        content.innerHTML = `
            <div>${formattedText}</div>
            <div class="floating-message-time">${getCurrentTime()}</div>
        `;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
    }

    floatingChatMessages.appendChild(messageDiv);

    // Scroll suave al final
    floatingChatMessages.scrollTo({
        top: floatingChatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

function sendFloatingSuggestion(text) {
    if (floatingInput) {
        floatingInput.value = text;
        sendFloatingMessage();
    }
}

// ──── Eventos de apertura y cierre ────

if (chibiIcon) {
    chibiIcon.addEventListener('click', function() {
        floatingChat.classList.add('active');
        setTimeout(() => {
            if (floatingInput) floatingInput.focus();
        }, 400);
    });
}

if (closeChatBtn) {
    closeChatBtn.addEventListener('click', function() {
        floatingChat.classList.remove('active');
    });
}

// Enter para enviar
if (floatingInput) {
    floatingInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isFloatingProcessing) {
            sendFloatingMessage();
        }
    });
}

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && floatingChat && floatingChat.classList.contains('active')) {
        floatingChat.classList.remove('active');
    }
});

// ──── Función principal ────

async function sendFloatingMessage() {
    const message = floatingInput?.value?.trim();

    if (!message || isFloatingProcessing) return;

    // Verificar API key
    if (!GROQ_API_KEY || GROQ_API_KEY.length < 20) {
        addFloatingMessage('⚠️ ERROR: La API key de Groq no está configurada correctamente.', 'error');
        return;
    }

    // Mostrar mensaje del usuario
    addFloatingMessage(message, 'user');
    if (floatingInput) floatingInput.value = '';

    // Indicador de escritura
    showFloatingTyping();
    isFloatingProcessing = true;
    if (floatingSendBtn) floatingSendBtn.disabled = true;

    try {
        // Agregar mensaje del usuario al historial
        floatingConversation.push({ role: 'user', content: message });

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',   // ← CAMBIA A ESTE
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
            { role: 'system', content: floatingSystemPrompt },
            ...floatingConversation
        ]
    })
});

        if (!response.ok) {
            let errorMsg = 'Error desconocido en Groq';
            try {
                const err = await response.json();
                if (response.status === 401) errorMsg = 'API key inválida o expirada';
                else if (response.status === 429) errorMsg = 'Límite de tasa alcanzado. Espera unos segundos';
                else errorMsg = err.error?.message || `Error ${response.status}`;
            } catch {}
            throw new Error(errorMsg);
        }

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content?.trim() || '';

        if (!aiResponse) {
            throw new Error('No se recibió respuesta válida de Groq');
        }

        // Agregar respuesta al historial y mostrarla
        floatingConversation.push({ role: 'assistant', content: aiResponse });
        hideFloatingTyping();
        addFloatingMessage(aiResponse, 'ai');

    } catch (error) {
        console.error('Error en chat IA:', error);
        hideFloatingTyping();

        const errorMsg = `⚠️ ${error.message || 'Ocurrió un error inesperado. Intenta de nuevo.'}`;
        addFloatingMessage(errorMsg, 'error');

        // Remover el último mensaje del usuario si falló
        if (floatingConversation.length > 0 && floatingConversation[floatingConversation.length - 1].role === 'user') {
            floatingConversation.pop();
        }
    } finally {
        isFloatingProcessing = false;
        if (floatingSendBtn) floatingSendBtn.disabled = false;
        if (floatingInput) floatingInput.focus();
    }
}