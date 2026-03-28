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

// ========== Service Modal ==========
const serviceCards = document.querySelectorAll('.service-card');
const serviceModalWeb = document.getElementById('serviceModalWeb');
const serviceModalMobile = document.getElementById('serviceModalMobile');
const serviceModalUiux = document.getElementById('serviceModalUiux');
const closeModalBtns = document.querySelectorAll('.close-modal');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        
        // Close all modals first
        serviceModalWeb.classList.remove('active');
        serviceModalMobile.classList.remove('active');
        serviceModalUiux.classList.remove('active');
        
        // Open the correct modal based on service type
        if(serviceType === 'web') {
            serviceModalWeb.classList.add('active');
        } else if(serviceType === 'mobile') {
            serviceModalMobile.classList.add('active');
        } else if(serviceType === 'uiux') {
            serviceModalUiux.classList.add('active');
        }
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        serviceModalWeb.classList.remove('active');
        serviceModalMobile.classList.remove('active');
        serviceModalUiux.classList.remove('active');
        
        // Close all portfolio modals
        Object.values(portfolioModals).forEach(m => m.classList.remove('active'));
        
        certificateModal.classList.remove('active');
    });
});

// Close modal when clicking outside
[serviceModalWeb, serviceModalMobile, serviceModalUiux].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
        }
    });
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
const portfolioModals = {
    1: document.getElementById('portfolioModal1'),
    2: document.getElementById('portfolioModal2'),
    3: document.getElementById('portfolioModal3'),
    4: document.getElementById('portfolioModal4'),
    5: document.getElementById('portfolioModal5'),
    6: document.getElementById('portfolioModal6'),
    7: document.getElementById('portfolioModal7')
};

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const portfolioId = item.getAttribute('data-portfolio');
        const modal = portfolioModals[portfolioId];
        
        if(modal) {
            // Close all portfolio modals first
            Object.values(portfolioModals).forEach(m => {
                if(m) m.classList.remove('active');
            });
            // Open the selected modal
            modal.classList.add('active');
        } else {
            console.error('Modal not found for portfolio ID:', portfolioId);
        }
    });
});

// Close portfolio modals when clicking outside
Object.values(portfolioModals).forEach(modal => {
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
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
        
        certificateModal.classList.add('active');
    });
});

closeCertificate.addEventListener('click', () => {
    certificateModal.classList.remove('active');
});

certificateModal.addEventListener('click', (e) => {
    if(e.target === certificateModal) {
        certificateModal.classList.remove('active');
    }
});

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

// ========== Contact Form ==========
const contactFormNew = document.getElementById('contactFormNew');

if(contactFormNew) {
    contactFormNew.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactFormNew);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link with form data
        const mailtoLink = `mailto:zaenarifputraainurdin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
        )}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Terima kasih! Aplikasi email Anda akan terbuka untuk mengirim pesan.');
        
        // Reset form
        contactFormNew.reset();
    });
}

// Old contact form - keep for backward compatibility
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim.');
        contactForm.reset();
    });
}

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
