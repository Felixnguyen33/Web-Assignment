document.addEventListener('DOMContentLoaded', () => {
    const congratsMessage = document.getElementById('congratsMessage');
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const ctx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            showEffects();
        }
    });

    function showEffects() {
        congratsMessage.classList.remove('hidden');
        congratsMessage.classList.add('show');
        launchFireworks();
        setTimeout(() => {
            congratsMessage.classList.remove('show');
            congratsMessage.classList.add('hidden');
        }, 5000); // 5 giây
    }

    function launchFireworks() {
        let fireworks = [];
        let particles = [];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        function createFirework() {
            const x = Math.random() * fireworksCanvas.width;
            const y = Math.random() * fireworksCanvas.height / 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            fireworks.push({ x, y, color });
        }

        function createParticles(firework) {
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: firework.x,
                    y: firework.y,
                    angle: Math.random() * 2 * Math.PI,
                    speed: Math.random() * 30 + 4, 
                    color: firework.color,
                    life: Math.random() * 30 + 30,
                    size: Math.random() * 20 + 2 
                });
            }
        }
        function updateParticles() {
            particles.forEach((particle, index) => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.life -= 1;
                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });
        }

        function drawFireworks() {
            ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
            fireworks.forEach(firework => {
                createParticles(firework);
            });
            fireworks = [];
            particles.forEach(particle => {
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        function loop() {
            updateParticles();
            drawFireworks();
            requestAnimationFrame(loop);
        }
        setInterval(createFirework, 500);
        loop();
    }
});
