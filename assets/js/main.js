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
//  Interactive 3D Three.js Hero Canvas & Tilt
// =========================================
function init3DExperience() {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(520, 520);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Colors matching HSL theme
    const isLight = document.body.classList.contains('light-theme');
    const primaryColorHex = isLight ? 0x4f46e5 : 0x3b82f6; // Indigo/Blue glow
    const secondaryColorHex = isLight ? 0x9333ea : 0x8b5cf6; // Purple glow

    // 2. 3D Geometries
    // Outer Torus Knot Ring (Wireframe Glowing Core)
    const torusGeometry = new THREE.TorusKnotGeometry(1.6, 0.22, 120, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: primaryColorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusKnot);

    // Inner Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.9, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: secondaryColorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.65
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    // Floating 3D Particles Field
    const particlesCount = 90;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.045,
        color: primaryColorHex,
        transparent: true,
        opacity: 0.7
    });
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 3. Mouse Parallax Movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.001;
        mouseY = (e.clientY - windowHalfY) * 0.001;
    });

    // 4. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation
        torusKnot.rotation.x = elapsedTime * 0.25;
        torusKnot.rotation.y = elapsedTime * 0.35;

        icosahedron.rotation.x = -elapsedTime * 0.3;
        icosahedron.rotation.y = -elapsedTime * 0.4;

        particleSystem.rotation.y = elapsedTime * 0.05;

        // Smooth lerp mouse tracking
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        scene.rotation.y = targetX * 1.5;
        scene.rotation.x = targetY * 1.5;

        renderer.render(scene, camera);
    }
    animate();

    // 5. Theme Toggle Listener Integration
    if (typeof themeBtn !== 'undefined' && themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTimeout(() => {
                const isLightNow = document.body.classList.contains('light-theme');
                const newPrimary = isLightNow ? 0x4f46e5 : 0x3b82f6;
                const newSecondary = isLightNow ? 0x9333ea : 0x8b5cf6;

                torusMaterial.color.setHex(newPrimary);
                icoMaterial.color.setHex(newSecondary);
                particlesMaterial.color.setHex(newPrimary);
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

