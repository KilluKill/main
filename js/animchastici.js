document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ["#cdd4ff", "#8f94fb", "#ffffff", "#4e5dff"];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.8,
            vx: 0,
            vy: 0
        });
    }

    let mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = dist < 100 ? (100 - dist) / 100 : 0;

            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * -0.5;
            p.vy += Math.sin(angle) * force * -0.5;

            p.vx *= 0.95;
            p.vy *= 0.95;

            p.x += p.vx;
            p.y += p.vy;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
});