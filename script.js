// Blue Network Particle Animation (Matches image.jpg) + MOUSE MOVE INTERACTION
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle Array
const particles = [];
const particleCount = 150;
const maxDistance = 200;

// Mouse tracking (for move interaction)
let mouse = { x: 0, y: 0 };

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.8;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 2;
  }
  update() {
    // MOUSE REPEL EFFECT (NEW!)
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 100) { // Repel radius
      const force = (100 - dist) / 100 * 0.4; // Smooth strength
      this.speedX += (dx / dist) * force;
      this.speedY += (dy / dist) * force;
    }
    
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce edges gently
    if (this.x > canvas.width || this.x < 0) {
      this.speedX *= -0.9;
      this.x = Math.max(0, Math.min(canvas.width, this.x));
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY *= -0.9;
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
  }
  draw() {
    ctx.save();
    ctx.shadowColor = '#77fffa';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// MOUSE MOVE EVENT (NEW!)
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.hypot(dx, dy);
      
      if (distance < maxDistance) {
        ctx.strokeStyle = `rgba(0, 191, 255, ${0.3 - (distance / maxDistance) * .3})`;
        ctx.lineWidth = 1 + (1 - distance / maxDistance);
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Main Animation Loop
function animate() {
 ctx.fillStyle = 'rgba(21, 39, 68, 10)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// Your ORIGINAL JS (unchanged)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
 
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent. (Add EmailJS for production)');
            form.reset();
        });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(6, 20, 43, 0.98)';
        } else {
            navbar.style.background = 'rgba(6, 20, 43, 0.95)';
        }
    });
});


