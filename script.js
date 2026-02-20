// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingProgress = document.getElementById('loadingProgress');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    document.body.style.overflow = 'auto';

                    // Initialize everything
                    initTyped();
                    initProjects();
                    init3DBackground();
                }, 1000);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
});

// Typed Effect
function initTyped() {
    const words = ['Frontend Developer', 'UI Designer', 'Web Devoloper', 'Web Designer'];
    const typedText = document.getElementById('typedText');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Projects Data
const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'React va TypeScript yordamida yaratilgan to\'liq funksional online do\'kon',
        image: 'fa-shopping-cart',
        tech: ['React', 'TypeScript', 'Redux', 'Material UI'],
        live: '#',
        github: '#'
    },
    {
        title: 'Portfolio Website',
        description: '3D elementlar va animatsiyalar bilan boyitilgan shaxsiy portfolio',
        image: 'fa-user-tie',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Three.js'],
        live: '#',
        github: '#'
    },
    {
        title: 'Task Management App',
        description: 'Vazifalarni boshqarish uchun interaktiv web ilova',
        image: 'fa-tasks',
        tech: ['React', 'Context API', 'Tailwind CSS', 'Firebase'],
        live: '#',
        github: '#'
    },
    {
        title: 'Weather App',
        description: 'Real vaqt ob-havo ma\'lumotlarini ko\'rsatuvchi ilova',
        image: 'fa-cloud-sun',
        tech: ['JavaScript', 'API', 'CSS3', 'Responsive'],
        live: '#',
        github: '#'
    }
];

// Initialize Projects
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <i class="fas ${project.image}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.live}" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.github}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// 3D Background
function init3DBackground() {
    const bg = document.getElementById('background3D');

    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${108 + Math.random() * 100}, ${92 + Math.random() * 100}, ${231 + Math.random() * 100}, ${0.1 + Math.random() * 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        bg.appendChild(particle);
    }

    // Add floating cubes
    for (let i = 0; i < 10; i++) {
        const cube = document.createElement('div');
        cube.style.position = 'absolute';
        cube.style.width = Math.random() * 50 + 20 + 'px';
        cube.style.height = cube.style.width;
        cube.style.background = 'transparent';
        cube.style.border = '2px solid rgba(108, 92, 231, 0.1)';
        cube.style.left = Math.random() * 100 + '%';
        cube.style.top = Math.random() * 100 + '%';
        cube.style.animation = `rotate ${10 + Math.random() * 20}s linear infinite`;
        bg.appendChild(cube);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Theme toggle
function toggleTheme() {
    const icon = document.querySelector('.theme-toggle i');
    if (icon.classList.contains('fa-moon')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Light theme
        document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
        document.documentElement.style.setProperty('--darker-bg', '#eaeaea');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
        document.documentElement.style.setProperty('--text-primary', '#333333');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // Dark theme
        document.documentElement.style.setProperty('--dark-bg', '#0a0a0f');
        document.documentElement.style.setProperty('--darker-bg', '#050508');
        document.documentElement.style.setProperty('--card-bg', 'rgba(20, 20, 30, 0.8)');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
    }
}

// Download CV
function downloadCV() {
    // Create a fake link to download CV
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV URL
    link.download = 'Mansurbek_CV.pdf';
    link.click();

    showNotification('CV yuklab olinmoqda...', 'success');
}

// Contact form handler
function handleContact(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the data to a server
    console.log({ name, email, subject, message });

    showNotification('Xabaringiz yuborildi! Tez orada javob beramiz.', 'success');

    // Reset form
    event.target.reset();
}

// ============= TELEGRAM BOT QO'SHILGAN QISM =============
// Telegram bot ma'lumotlari
const BOT_TOKEN = '8295893372:AAGUzovc4nEHpob456WPzr5Cw1ggmbKM6Oo'; // @BotFather dan olgan tokeningiz
const CHAT_ID = '394304823'; // getUpdates dan olgan chat ID

// Telegram form handler (handleContact funksiyasini to'liq almashtiramiz)
function handleContact(event) {
    event.preventDefault();

    // Form ma'lumotlarini olish
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Telegramga yuboriladigan xabar matni
    const telegramMessage = `
📨 *Yangi xabar* 📨

👤 *Ism:* ${name}
📧 *Email:* ${email}
📝 *Mavzu:* ${subject}
💬 *Xabar:*
${message}
    `;

    // Submit tugmasini o'chirish
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
    submitBtn.disabled = true;

    // Telegram API ga so'rov yuborish
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showNotification('Xabaringiz yuborildi! Tez orada javob beramiz.', 'success');
            event.target.reset();
        } else {
            showNotification('Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.', 'error');
        }
    })
    .catch(error => {
        console.error('Xatolik:', error);
        showNotification('Internet aloqasini tekshirib qayta urinib ko\'ring.', 'error');
    })
    .finally(() => {
        // Tugmani qayta tiklash
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}
// ============= TELEGRAM BOT QISM TUGADI =============

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.background = type === 'success' ? 'linear-gradient(135deg, #00b09b, #96c93d)' : 'linear-gradient(135deg, #6c5ce7, #a463f5)';
    notification.style.color = 'white';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span style="margin-left: 0.5rem;">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification {
        display: flex;
        align-items: center;
        font-family: 'Poppins', sans-serif;
    }
`;

document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes rotate {
            from { transform: rotate(0); }
            to { transform: rotate(360deg); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
        }
    `;
    document.head.appendChild(animationStyles);
});
