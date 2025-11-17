// script.js — Handles UI interactions: typing, navbar behavior, filters, fade-in, scroll-to-top

document.addEventListener('DOMContentLoaded', () => {
    console.log('[portfolio] DOMContentLoaded - script running');
    // Elements
    const header = document.getElementById('site-header');
    const mobileBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollTopBtn = document.getElementById('scroll-top');
    const navLinks = document.querySelectorAll('.nav-link');

    // ---------- Mobile menu toggle ----------
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ---------- Header background on scroll ----------
    function updateHeader() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('backdrop-blur-md');
            header.style.background = 'linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.4))';
        } else {
            header.classList.remove('backdrop-blur-md');
            header.style.background = 'transparent';
        }
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader);

    // ---------- Typing animation ----------
    const typeEl = document.getElementById('type-text');
    const phrases = [
        "Software Developer & AI Enthusiast",
        "Full-Stack Developer — React · Node · TypeScript",
        "Building responsive UIs and reliable backends"
    ];

    function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

    async function typeLoop(el, words) {
        if (!el) return;
        let i = 0;
        while (true) {
            const word = words[i % words.length];
            // type
            for (let j = 0; j <= word.length; j++) {
                el.textContent = word.slice(0, j);
                await sleep(40 + Math.random() * 40);
            }
            await sleep(900);
            // delete
            for (let j = word.length; j >= 0; j--) {
                el.textContent = word.slice(0, j);
                await sleep(20 + Math.random() * 30);
            }
            await sleep(200);
            i++;
        }
    }
    // Start typing animation
    typeLoop(typeEl, phrases).catch(err => console.error('[portfolio] typeLoop error:', err));

    // ---------- Project filtering ----------
    if (filterButtons && projectCards.length) {
        console.log('[portfolio] filterButtons:', filterButtons.length, 'projectCards:', projectCards.length);
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                // UI state
                filterButtons.forEach(b => b.classList.remove('ring', 'ring-2', 'ring-[#60a5fa]'));
                btn.classList.add('ring', 'ring-2', 'ring-[#60a5fa]');
                // Show/hide
                projectCards.forEach(card => {
                    const tags = card.getAttribute('data-tags') || '';
                    if (filter === 'all' || tags.split(',').map(t=>t.trim()).includes(filter)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ---------- Fade-in-up on scroll (sections) using IntersectionObserver ----------
    // Adds the `in-view` class to each section.fade-section when it enters the viewport.
    const sectionRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.fade-section').forEach(s => sectionRevealObserver.observe(s));

    // ---------- Highlight nav links while scrolling ----------
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-link[href='#${id}']`);
            if (entry.isIntersecting) {
                navLinks.forEach(n => n.classList.remove('text-[#60a5fa]','font-semibold'));
                if (link) link.classList.add('text-[#60a5fa]','font-semibold');
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

    // ---------- Scroll to top button ----------
    function updateScrollTop() {
        if (!scrollTopBtn) return;
        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    }
    updateScrollTop();
    window.addEventListener('scroll', updateScrollTop);
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Smooth close mobile menu after clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    // Defensive: if no filter selected, activate 'All'
    const activeBtn = document.querySelector('.filter-btn.ring');
    if (!activeBtn) {
        const first = document.querySelector('.filter-btn[data-filter="all"]');
        if (first) first.classList.add('ring','ring-2','ring-[#60a5fa]');
    }

        // ---------- Download resume button animation & fallback ----------
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', async (e) => {
                // Animate button
                downloadBtn.classList.add('download-animate');
                setTimeout(() => downloadBtn.classList.remove('download-animate'), 600);

                // Try to fetch the file to check availability (prevents browser silent failures)
                const href = downloadBtn.getAttribute('href');
                try {
                    const res = await fetch(href, { method: 'HEAD' });
                    if (!res.ok) throw new Error('Not found');
                    // show brief label change
                    const span = downloadBtn.querySelector('span');
                    const original = span.textContent;
                    span.textContent = 'Downloading...';
                    setTimeout(() => span.textContent = original, 1200);
                } catch (err) {
                    // Prevent default download and give feedback
                    e.preventDefault();
                    downloadBtn.classList.add('shake');
                    setTimeout(() => downloadBtn.classList.remove('shake'), 600);
                }
            });
        }

    // ---------- Project modal logic ----------
    let activeModalOverlay = null;

    function escapeHtml(str){
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function openModalFromCard(card){
        if (!card) return;
        const title = card.querySelector('h3')?.textContent?.trim() || 'Project';
        const desc = card.querySelector('p')?.textContent?.trim() || '';
        const tagEls = card.querySelectorAll('.tag');
        const tags = Array.from(tagEls).map(t => t.textContent.trim());
        const codeAnchor = card.querySelector('a[href*="github.com"]');
        const liveAnchor = card.querySelector('a[href][target="_blank"]:not([href*="github.com"])');
        const codeHref = codeAnchor ? codeAnchor.href : '';
        const liveHref = liveAnchor ? liveAnchor.href : '';

        // build modal
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)} details">
                <div class="modal-header">
                    <div>
                        <div class="modal-title">${escapeHtml(title)}</div>
                    </div>
                    <button class="modal-close" aria-label="Close modal">✕</button>
                </div>
                <div class="modal-body">
                    <p>${escapeHtml(desc)}</p>
                    <div class="modal-tags">${tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
                </div>
                <div class="modal-footer">
                    ${codeHref?`<a class="btn" href="${escapeHtml(codeHref)}" target="_blank" rel="noopener">View Code</a>`:''}
                    ${liveHref?`<a class="btn outline" href="${escapeHtml(liveHref)}" target="_blank" rel="noopener">Live Demo</a>`:''}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        activeModalOverlay = overlay;

        // focus close button
        const closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();

        function handleKey(e){
            if (e.key === 'Escape') closeModal();
        }

        function handleOverlayClick(e){
            if (e.target === overlay) closeModal();
        }

        function closeModal(){
            if (!activeModalOverlay) return;
            document.removeEventListener('keydown', handleKey);
            activeModalOverlay.removeEventListener('click', handleOverlayClick);
            activeModalOverlay.remove();
            activeModalOverlay = null;
        }

        // wire events
        closeBtn && closeBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', handleKey);
        overlay.addEventListener('click', handleOverlayClick);
    }

    // Attach click handler to project cards (but don't intercept clicks on links inside card)
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            console.log('[portfolio] project card clicked:', card.querySelector('h3')?.textContent?.trim());
            // if clicked an anchor or inside an anchor, don't open modal
            if (e.target.closest('a')) return;
            openModalFromCard(card);
        });
    });

    // ---------- Skills interactivity: clickable pills that filter projects ----------
    const skillPills = document.querySelectorAll('.skill-pill');
    function updateProjectFilterFromSkills(){
        const activeSkills = Array.from(skillPills).filter(p=>p.getAttribute('aria-pressed')==='true').map(p=>p.textContent.trim().toLowerCase());
        if (activeSkills.length === 0) {
            projectCards.forEach(c => c.style.display = '');
            return;
        }
        projectCards.forEach(c => {
            const tags = (c.getAttribute('data-tags')||'').toLowerCase();
            const matches = activeSkills.every(skill => tags.includes(skill) );
            c.style.display = matches ? '' : 'none';
        });
    }

    skillPills.forEach(p => {
        p.setAttribute('tabindex','0');
        p.setAttribute('role','button');
        p.setAttribute('aria-pressed','false');
        p.addEventListener('click', () => {
            const pressed = p.getAttribute('aria-pressed') === 'true';
            p.setAttribute('aria-pressed', String(!pressed));
            updateProjectFilterFromSkills();
        });
        p.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.click(); }
        });
    });
});

