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