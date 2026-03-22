// HOW TO USE YOUR OWN PHOTOS:
// 1. Put your mom's photos in the same folder as these files (e.g. mom1.jpg, mom2.jpg).
// 2. Change the filenames inside the 'userImages' array below to match your actual files.
const userImages = [
    // EXAMPLE:
    'Img1.jpg',
    'Img2.jpg',
    'Img3.jpg',
    'Img4.jpg',
    'Img5.jpg',
    'Img6.jpg',
    'Img7.jpg',
    'Img8.jpg',
    'Img9.jpg',
    'Img10.jpg',
    'Img11.jpg',

];

// Fallback high-quality placeholder images if no custom images are specified
const placeholderImages = [
    'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1600', // beautiful flowers
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600', // cake
    'https://images.unsplash.com/photo-1574246604907-db69e30ddb97?q=80&w=1600', // wrapped gift
    'https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?q=80&w=1600'  // balloons
];

// Determine which images to use
const imagesToUse = userImages.length > 0 ? userImages : placeholderImages;

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');
const audio = document.getElementById('bg-music');
const slideshowContainer = document.querySelector('.slideshow');

// Function to initialize slideshow images
function setupSlideshow() {
    imagesToUse.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'slide';
        if (index === 0) {
            img.className = 'slide active t0';
        }
        slideshowContainer.appendChild(img);
    });
}

setupSlideshow();

let currentSlide = 0;
let slides;

// Function to move to the next slide with animation
function nextSlide() {
    if (!slides) slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) return; // Need at least 2 images to animate

    // Pick a random transition style (t0, t1, t2, or t3)
    const randomClass = 't' + Math.floor(Math.random() * 4);

    // The current slide transitions out
    slides[currentSlide].className = 'slide prev ' + randomClass;

    // Calculate next slide index
    currentSlide = (currentSlide + 1) % slides.length;

    // The new slide transitions in
    slides[currentSlide].className = 'slide active ' + randomClass;

    // Reset the "prev" slide offscreen 
    const prevPrevSlide = (currentSlide - 2 + slides.length) % slides.length;
    slides[prevPrevSlide].className = 'slide';
}

// Handle the starting action
startBtn.addEventListener('click', () => {
    // 1. Hide the start screen
    startScreen.classList.add('hidden');

    // 2. Show the main screen
    mainScreen.classList.remove('hidden');
    mainScreen.style.zIndex = '10'; // Ensure it comes to foreground

    // 3. Play the audio (Requires user interaction first, hence the start button)
    audio.play().catch(e => {
        console.log('Audio playback failed or file not found. Put song.mp3 in the folder.', e);
    });

    // 4. Start the slideshow timer to change image every 2.3 seconds (2300 milliseconds)
    setInterval(nextSlide, 3150);
});

// --- PARTICLE NETWORK EFFECT (Like aqbit.in) ---
function createParticleNetwork() {
    // Canvas setup
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.getElementById('main-screen').prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Slow, graceful random velocities
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Bounce off edges gently
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(129, 140, 248, 0.5)'; // Faint indigo
            ctx.fill();
        }
    }

    // Number of particles depends on screen size to maintain density
    const particleCount = Math.floor((width * height) / 10000);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connector lines for nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Line opacity fades as distance increases
                    ctx.strokeStyle = `rgba(129, 140, 248, ${0.3 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// Initialize
createParticleNetwork();
