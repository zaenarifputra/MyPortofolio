// ========== Theme Toggle ==========
const themeBtn = document.querySelector('.theme-btn');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const body = document.body;

// Check for saved theme preference or default to 'dark' mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
});

// ========== Bottom Navigation Menu ==========
const menuShowBtn = document.querySelector('.menu-show-btn');
const menuHideBtn = document.querySelector('.menu-hide-btn');
const bottomNav = document.querySelector('.bottom-nav .menu');
const bottomNavContainer = document.querySelector('.bottom-nav');

// Check if menu should be hidden - works on all devices
let isMenuHidden = false;

// Show menu
menuShowBtn.addEventListener('click', () => {
    bottomNav.style.display = 'flex';
    menuShowBtn.classList.remove('show');
    menuHideBtn.style.opacity = '1';
    menuHideBtn.style.pointerEvents = 'all';
    isMenuHidden = false;
    
    // Save state to localStorage
    localStorage.setItem('menuHidden', 'false');
});

// Hide menu
menuHideBtn.addEventListener('click', () => {
    bottomNav.style.display = 'none';
    menuShowBtn.classList.add('show');
    menuHideBtn.style.opacity = '0';
    menuHideBtn.style.pointerEvents = 'none';
    isMenuHidden = true;
    
    // Save state to localStorage
    localStorage.setItem('menuHidden', 'true');
});

// Restore menu state from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedMenuState = localStorage.getItem('menuHidden');
    
    if (savedMenuState === 'true') {
        // Hide menu
        bottomNav.style.display = 'none';
        menuShowBtn.classList.add('show');
        menuHideBtn.style.opacity = '0';
        menuHideBtn.style.pointerEvents = 'none';
        isMenuHidden = true;
    } else {
        // Show menu (default)
        bottomNav.style.display = 'flex';
        menuShowBtn.classList.remove('show');
        menuHideBtn.style.opacity = '1';
        menuHideBtn.style.pointerEvents = 'all';
        isMenuHidden = false;
    }
});

// ========== Active Menu Link ==========
const menuLinks = document.querySelectorAll('.bottom-nav .menu li a');

menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuLinks.forEach(l => l.classList.remove('current'));
        this.classList.add('current');
    });
});

// ========== Resume Tabs ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if(content.id === targetTab) {
                content.classList.add('active');
            }
        });
    });
});

// ========== Helper for Modal Scroll Lock ==========
function openModal(modalElement) {
    if (modalElement) {
        modalElement.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('active');
    }
    // Check if any modal is still active
    const activeModals = document.querySelectorAll('.service-modal.active, .portfolio-modal.active, .certificate-modal.active');
    if (activeModals.length === 0) {
        document.body.classList.remove('modal-open');
    }
}

function closeAllModals() {
    document.querySelectorAll('.service-modal.active, .portfolio-modal.active, .certificate-modal.active').forEach(m => {
        m.classList.remove('active');
    });
    document.body.classList.remove('modal-open');
}

// Global ESC key listener to close modals
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ========== Service Modal ==========
const serviceCards = document.querySelectorAll('.service-card');
const serviceModalWeb = document.getElementById('serviceModalWeb');
const serviceModalMobile = document.getElementById('serviceModalMobile');
const serviceModalUiux = document.getElementById('serviceModalUiux');
const closeModalBtns = document.querySelectorAll('.close-modal');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        closeAllModals();
        
        if(serviceType === 'web') {
            openModal(serviceModalWeb);
        } else if(serviceType === 'mobile') {
            openModal(serviceModalMobile);
        } else if(serviceType === 'uiux') {
            openModal(serviceModalUiux);
        }
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeAllModals();
    });
});

// Close modal when clicking outside
[serviceModalWeb, serviceModalMobile, serviceModalUiux].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal(modal);
            }
        });
    }
});

// ========== Portfolio Filter ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        portfolioItems.forEach(item => {
            if(filterValue === 'all') {
                item.classList.remove('hide');
            } else {
                if(item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
});

// ========== Portfolio Modal ==========
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const portfolioId = item.getAttribute('data-portfolio');
        const modal = document.getElementById(`portfolioModal${portfolioId}`);
        
        if(modal) {
            closeAllModals();
            openModal(modal);
        } else {
            console.error('Modal not found for portfolio ID:', portfolioId);
        }
    });
});

// Close portfolio modals when clicking outside
document.querySelectorAll('.portfolio-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal(modal);
        }
    });
});

// ========== Certificate Modal ==========
const certificateCards = document.querySelectorAll('.certificate-card');
const certificateModal = document.getElementById('certificateModal');
const closeCertificate = document.querySelector('.close-certificate');
const certificateModalImage = document.getElementById('certificateModalImage');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalIssuer = document.getElementById('certificateModalIssuer');

certificateCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('.certificate-img img').src;
        const title = card.querySelector('.certificate-info h4').textContent;
        const issuer = card.querySelector('.certificate-info p').textContent;
        
        certificateModalImage.src = imgSrc;
        certificateModalTitle.textContent = title;
        certificateModalIssuer.textContent = 'Issued by: ' + issuer;
        
        closeAllModals();
        openModal(certificateModal);
    });
});

if (closeCertificate) {
    closeCertificate.addEventListener('click', () => {
        closeModal(certificateModal);
    });
}

if (certificateModal) {
    certificateModal.addEventListener('click', (e) => {
        if(e.target === certificateModal) {
            closeModal(certificateModal);
        }
    });
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Glassmorphic Toast Notification ==========
const toast = document.getElementById('toastNotification');
const toastTitle = document.getElementById('toastTitle');
const toastMsg = document.getElementById('toastMsg');
let toastTimeout;

function showToast(title, message, iconClass = 'ri-checkbox-circle-fill') {
    if (!toast) return;
    
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    
    const icon = toast.querySelector('.toast-icon');
    if (icon) icon.className = `toast-icon ${iconClass}`;

    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// ========== Typewriter Effect ==========
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ["Mobile & Web Developer", "Android Developer (Kotlin)", "Flutter Specialist", "UI/UX Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    type();
}

// ========== Animated Counter Up ==========
const counters = document.querySelectorAll('.counter-number');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target > 5 ? 150 : 300;
        const increment = target / (speed / 16);

        function updateCount() {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count).toString().padStart(2, '0');
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toString().padStart(2, '0');
            }
        }
        updateCount();
    });
}

const aboutSection = document.getElementById('about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(aboutSection);
}

// ========== Skill Fill Animation ==========
function animateSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const progress = fill.getAttribute('data-progress');
        if (progress) {
            fill.style.width = progress;
        }
    });
}

const skillsSection = document.getElementById('resume');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.2 });
    observer.observe(skillsSection);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.getAttribute('data-tab') === 'skills') {
            setTimeout(animateSkills, 100);
        }
    });
});

// ========== Contact Form ==========
const contactFormNew = document.getElementById('contactFormNew');

if(contactFormNew) {
    contactFormNew.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactFormNew);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const mailtoLink = `mailto:zaenarifputraainurdin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
        )}`;
        
        window.location.href = mailtoLink;
        
        showToast('Pesan Terkirim!', 'Terima kasih, aplikasi email Anda akan terbuka.');
        contactFormNew.reset();
    });
}

// Download CV toast trigger
document.querySelectorAll('a[download]').forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('Mengunduh CV', 'File CV Zaenarif Putra sedang diunduh.', 'ri-file-download-line');
    });
});

// ========== Scroll Active Link ==========
const sections = document.querySelectorAll('.nav-menu-section, .nav-menu');
const navLinks = document.querySelectorAll('.bottom-nav .menu li a');

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('current');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('current');
        }
    });
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// ========== Header Background on Scroll ==========
const header = document.querySelector('.ptr-header');

const handleHeaderScroll = debounce(() => {
    if (window.scrollY > 50) {
        header.style.background = 'var(--bottom-nav-bg)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = '1px solid hsl(var(--hue) 45% 98% / .1)';
        header.style.padding = '20px 0';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = 'none';
        header.style.padding = '30px 0';
    }
}, 100);

window.addEventListener('scroll', handleHeaderScroll, { passive: true });


// ========== Logo Click to Top ==========
const logo = document.querySelector('.ptr-logo a');
logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Responsive Menu Handling ==========
// Restore menu state on resize
window.addEventListener('resize', () => {
    const savedMenuState = localStorage.getItem('menuHidden');
    
    // Keep user's preference across all screen sizes
    if (savedMenuState === 'true' && isMenuHidden) {
        bottomNav.style.display = 'none';
        menuShowBtn.classList.add('show');
    } else if (savedMenuState === 'false' || !savedMenuState) {
        bottomNav.style.display = 'flex';
        menuShowBtn.classList.remove('show');
    }
});

// =========================================
//  Award-Winning High-End 3D WebGL Engine
// =========================================
function init3DExperience() {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    
    let width = heroSection.clientWidth || window.innerWidth;
    let height = heroSection.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. High-End Glossy Metallic Geometries
    const group3D = new THREE.Group();
    scene.add(group3D);

    // Responsive 3D Group Position (Encircling avatar photo on the left so hero text on the right stays clean & readable)
    function update3DGroupPosition() {
        const winW = window.innerWidth;
        if (winW > 992) {
            // Desktop: Position behind avatar photo on the left
            group3D.position.set(-2.3, 0.1, 0);
            group3D.scale.set(0.85, 0.85, 0.85);
        } else if (winW > 576) {
            // Tablet: Position top around avatar
            group3D.position.set(0, 1.4, 0);
            group3D.scale.set(0.7, 0.7, 0.7);
        } else {
            // Mobile: Position top scaled
            group3D.position.set(0, 1.6, 0);
            group3D.scale.set(0.55, 0.55, 0.55);
        }
    }
    update3DGroupPosition();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        width = heroSection.clientWidth || window.innerWidth;
        height = heroSection.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        update3DGroupPosition();
    });

    // 2. Dynamic Interactive Lighting System
    const isLight = document.body.classList.contains('light-theme');
    
    const ambientLight = new THREE.AmbientLight(isLight ? 0xffffff : 0x1e1b4b, isLight ? 1.2 : 0.8);
    scene.add(ambientLight);

    // Glowing Neon Point Light 1 (Cyan/Indigo)
    const pointLight1 = new THREE.PointLight(isLight ? 0x4f46e5 : 0x3b82f6, 3, 20);
    pointLight1.position.set(3, 3, 4);
    scene.add(pointLight1);

    // Glowing Neon Point Light 2 (Violet/Purple)
    const pointLight2 = new THREE.PointLight(isLight ? 0x9333ea : 0xa855f7, 2.5, 20);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    // 3. High-End Glossy Metallic Geometries
    // Central Torus Knot (Metallic Phong Shading)
    const torusGeo = new THREE.TorusKnotGeometry(1.8, 0.35, 140, 20);
    const torusMat = new THREE.MeshPhongMaterial({
        color: isLight ? 0x4338ca : 0x2563eb,
        emissive: isLight ? 0x3730a3 : 0x1e40af,
        specular: 0x60a5fa,
        shininess: 80,
        wireframe: true,
        transparent: true,
        opacity: 0.55
    });
    const mainTorus = new THREE.Mesh(torusGeo, torusMat);
    group3D.add(mainTorus);

    // Inner Glowing Crystal (Glossy Octahedron)
    const octGeo = new THREE.OctahedronGeometry(1.0, 0);
    const octMat = new THREE.MeshPhongMaterial({
        color: isLight ? 0x7c3aed : 0x8b5cf6,
        specular: 0xffffff,
        shininess: 100,
        flatShading: true,
        transparent: true,
        opacity: 0.75
    });
    const innerCrystal = new THREE.Mesh(octGeo, octMat);
    group3D.add(innerCrystal);

    // 4. Orbiting Tech Nodes (3D Tech Spheres)
    const orbitingGroup = new THREE.Group();
    const sphereCount = 5;
    const spheres = [];
    const techColors = [0x0284c7, 0x7c3aed, 0xec4899, 0x10b981, 0xf59e0b];

    for (let i = 0; i < sphereCount; i++) {
        const radius = 0.28 + (i % 2) * 0.08;
        const sphereGeo = new THREE.SphereGeometry(radius, 24, 24);
        const sphereMat = new THREE.MeshPhongMaterial({
            color: techColors[i],
            specular: 0xffffff,
            shininess: 90
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        
        const angle = (i / sphereCount) * Math.PI * 2;
        const orbitRadius = 3.2;
        sphereMesh.position.set(
            Math.cos(angle) * orbitRadius,
            Math.sin(angle) * orbitRadius,
            (Math.random() - 0.5) * 1.5
        );
        
        orbitingGroup.add(sphereMesh);
        spheres.push({ mesh: sphereMesh, angle: angle, orbitRadius: orbitRadius, speed: 0.008 + i * 0.003 });
    }
    group3D.add(orbitingGroup);

    // 5. 3D Cyber Wave Particle Grid (Background Stars & Ripple)
    const particlesCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const initialY = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        positions[idx] = (Math.random() - 0.5) * 18;
        positions[idx + 1] = (Math.random() - 0.5) * 14;
        positions[idx + 2] = (Math.random() - 0.5) * 12;
        initialY[i] = positions[idx + 1];
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
        size: 0.06,
        color: isLight ? 0x4f46e5 : 0x38bdf8,
        transparent: true,
        opacity: 0.65
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    scene.add(group3D);

    // 6. Interactive Mouse & Cursor Light Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // 7. Animation Loop (Smooth Lerp & Fluid Motion)
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // 3D Object Motion
        mainTorus.rotation.x = elapsedTime * 0.2;
        mainTorus.rotation.y = elapsedTime * 0.3;

        innerCrystal.rotation.x = -elapsedTime * 0.35;
        innerCrystal.rotation.y = -elapsedTime * 0.45;

        // Orbiting spheres motion
        spheres.forEach((s) => {
            s.angle += s.speed;
            s.mesh.position.x = Math.cos(s.angle) * s.orbitRadius;
            s.mesh.position.y = Math.sin(s.angle) * s.orbitRadius + Math.sin(elapsedTime + s.angle) * 0.3;
        });
        orbitingGroup.rotation.z = elapsedTime * 0.1;

        // Particle wave animation
        const particlePos = particlesGeo.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const idx = i * 3;
            particlePos[idx + 1] = initialY[i] + Math.sin(elapsedTime * 1.5 + particlePos[idx] * 0.5) * 0.25;
        }
        particlesGeo.attributes.position.needsUpdate = true;

        // Fluid Mouse Dampening
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        group3D.rotation.y = targetX * 0.8;
        group3D.rotation.x = -targetY * 0.8;

        // Dynamic Point Lights Follow Cursor
        pointLight1.position.x = targetX * 6 + 2;
        pointLight1.position.y = -targetY * 6 + 2;

        pointLight2.position.x = -targetX * 6 - 2;
        pointLight2.position.y = targetY * 6 - 2;

        renderer.render(scene, camera);
    }
    animate();

    // 8. Theme Toggle Listener Integration
    if (typeof themeBtn !== 'undefined' && themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTimeout(() => {
                const isLightNow = document.body.classList.contains('light-theme');
                
                pointLight1.color.setHex(isLightNow ? 0x4f46e5 : 0x3b82f6);
                pointLight2.color.setHex(isLightNow ? 0x9333ea : 0xa855f7);
                ambientLight.color.setHex(isLightNow ? 0xffffff : 0x1e1b4b);
                ambientLight.intensity = isLightNow ? 1.2 : 0.8;

                torusMat.color.setHex(isLightNow ? 0x4338ca : 0x2563eb);
                torusMat.emissive.setHex(isLightNow ? 0x3730a3 : 0x1e40af);
                octMat.color.setHex(isLightNow ? 0x7c3aed : 0x8b5cf6);
                particlesMat.color.setHex(isLightNow ? 0x4f46e5 : 0x38bdf8);
            }, 50);
        });
    }
}

// Inisialisasi Vanilla-Tilt pada kartu UI
function init3DTiltCards() {
    if (typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(document.querySelectorAll('.service-card, .portfolio-item, .certificate-card, .stat-box, .floating-badge'), {
        max: 12,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        perspective: 1000
    });
}

// Boot up 3D experience when DOM is ready or fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init3DExperience();
        init3DTiltCards();
    });
} else {
    init3DExperience();
    init3DTiltCards();
}


