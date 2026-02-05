// ===== OS Tabs Switcher =====
document.querySelectorAll('.os-tabs').forEach(tabs => {
    const buttons = tabs.querySelectorAll('.os-btn');
    const contents = tabs.parentElement.querySelectorAll('.os-content, .os-panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const os = btn.dataset.os;

            // Update buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update contents
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === os) {
                    content.classList.add('active');
                }
            });
        });
    });
});

// ===== Step Navigation =====
const stepLinks = document.querySelectorAll('.step-link');

stepLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Update active state
            stepLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Intersection Observer for Step Navigation =====
const sections = document.querySelectorAll('.tutorial-section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            stepLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== Copy Code Functionality =====
document.querySelectorAll('.code-block').forEach(block => {
    const pre = block.querySelector('pre');
    if (!pre) return;

    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px 10px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        color: rgba(255,255,255,0.7);
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
    `;

    copyBtn.addEventListener('click', async () => {
        const code = pre.textContent.trim();
        await navigator.clipboard.writeText(code);
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.color = '#10b981';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.style.color = '';
        }, 2000);
    });

    block.style.position = 'relative';
    block.appendChild(copyBtn);
});

// ===== Smooth Scroll for All Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Animation on Scroll =====
const animateElements = document.querySelectorAll('.option-card, .rec-card, .cloud-card, .faq-item, .maintain-card');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animateObserver.observe(el);
});

console.log('🎉 Clawdbot Tutorial V2 Loaded!');
