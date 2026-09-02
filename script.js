/**
 * PREESHA VASHISTH (PV) — OTHERWORLDLY INTERACTIVE ENGINE
 * Canvas Particle Vortex, 3D Perspective Tilt, Magnetic Physics,
 * Interactive RAG Architecture Visualizer, Custom Cursor & Scrollspy
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Initializing PV Otherworldly Engine...');

  // Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. CUSTOM DUAL-LAYER REACTIVE CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');
  
  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-custom-cursor');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth cursor ring trailing
    const renderCursorRing = () => {
      if (isMoving) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      requestAnimationFrame(renderCursorRing);
    };
    renderCursorRing();

    // Hover triggers
    const interactiveSelectors = 'a, button, [role="button"], .tilt-card, .skill-bento-cell, .interactive-hover';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
  }

  /* ==========================================================================
     2. NEURAL PARTICLE VORTEX CANVAS (HERO BACKGROUND)
     ========================================================================== */
  const heroCanvas = document.getElementById('hero-particle-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.parentElement.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 85);
    let mouse = { x: width / 2, y: height / 2, radius: 140 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.4 ? 'rgba(34, 211, 238,' : 'rgba(167, 139, 250,';
        this.alpha = Math.random() * 0.6 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repulsion & interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 3;
          const directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.baseColor === 'rgba(34, 211, 238,' ? '#22d3ee' : '#a78bfa';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Resize handling
    window.addEventListener('resize', () => {
      if (heroCanvas.parentElement) {
        width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
        height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
      }
    });

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = width / 2;
      mouse.y = height / 2;
    });
  }

  /* ==========================================================================
     3. 3D PERSPECTIVE TILT & SPECULAR GLARE
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    let glare = card.querySelector('.tilt-card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ==========================================================================
     4. MAGNETIC BUTTON HOVER EFFECT
     ========================================================================== */
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  /* ==========================================================================
     5. DYNAMIC TYPEWRITER & ROLE HUD
     ========================================================================== */
  const typeTextEl = document.getElementById('hero-typewriter');
  if (typeTextEl) {
    const roles = [
      'Full-Stack Developer @ Sarvm.AI',
      'React.js · Angular · Node.js · PostgreSQL',
      'AWS Certified Cloud Practitioner',
      'Dockerized Microservices & REST APIs',
      'Designing with Behavioral & Cognitive Psychology',
      'Currently Upskilling in AI & LangChain.js'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function typeStep() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typeTextEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 30;
      } else {
        typeTextEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 1800; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeStep, typingSpeed);
    }

    typeStep();
  }

  /* ==========================================================================
     6. INTERACTIVE BACKEND ORDER & TRANSACTION PIPELINE (QuickBite Deep-Dive)
     ========================================================================== */
  const orderSteps = [
    {
      id: 1,
      title: "1. Client Ingestion & Schema Sanitization",
      desc: "Express REST endpoint ingests structured order payload and validates schema types with strict parameter sanitization.",
      nodeId: "order-step-1",
      terminalOutput: ">> POST /api/v1/orders HTTP/1.1\n>> Payload: { customerId: 'usr_981', items: [{ id: 402, qty: 2 }], total: 32.50 }\n>> Zod Schema Validation: PASSED (0 schema violations)"
    },
    {
      id: 2,
      title: "2. JWT Authentication & Granular RBAC",
      desc: "Middleware verifies signed JWT token against secret, validates user permission flags, and attaches tenant context.",
      nodeId: "order-step-2",
      terminalOutput: ">> Verifying Bearer JWT Token: SIGNATURE_VALID\n>> User Role: 'CUSTOMER_VERIFIED' | Rate limit: 28/100 req/min\n>> RBAC access granted for order placement route"
    },
    {
      id: 3,
      title: "3. PostgreSQL Transaction & Inventory Row Lock",
      desc: "Atomic SQL transaction begins with `SELECT ... FOR UPDATE` row locks to prevent race conditions during inventory decrement.",
      nodeId: "order-step-3",
      terminalOutput: ">> BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;\n>> SELECT stock FROM inventory WHERE item_id = 402 FOR UPDATE;\n>> UPDATE inventory SET stock = stock - 2 WHERE item_id = 402;\n>> INSERT INTO orders (id, user_id, amount, status) VALUES ('ord_7721', 'usr_981', 32.50, 'CONFIRMED');\n>> COMMIT; (Executed in 4.2ms)"
    },
    {
      id: 4,
      title: "4. Dispatch Event & 201 Created Response",
      desc: "Dispatches asynchronous order event notification, generates tracking token, and returns response with 201 status.",
      nodeId: "order-step-4",
      terminalOutput: ">> Emitted event: 'order.created' -> notification worker\n>> Status: 201 Created | Transaction ID: tx_881920\n>> Total response latency: 42ms. 200 OK."
    }
  ];

  let currentOrderIndex = 0;
  const orderTerminal = document.getElementById('order-terminal-display');
  const orderTitle = document.getElementById('order-active-title');
  const orderDesc = document.getElementById('order-active-desc');
  const orderNextBtn = document.getElementById('order-next-step-btn');
  const orderAutoBtn = document.getElementById('order-auto-play-btn');
  let isAutoPlaying = false;
  let autoPlayTimer = null;

  function updateOrderVisualizer(index) {
    currentOrderIndex = index;
    const step = orderSteps[index];

    // Highlight active node
    document.querySelectorAll('.rag-node').forEach((node, i) => {
      if (i === index) {
        node.classList.add('active-step');
      } else {
        node.classList.remove('active-step');
      }
    });

    // Update text content
    if (orderTitle) orderTitle.textContent = step.title;
    if (orderDesc) orderDesc.textContent = step.desc;
    if (orderTerminal) {
      orderTerminal.textContent = step.terminalOutput;
    }
  }

  // Click on specific order node
  document.querySelectorAll('.rag-node').forEach((node, index) => {
    node.addEventListener('click', () => {
      stopAutoPlay();
      updateOrderVisualizer(index);
    });
  });

  if (orderNextBtn) {
    orderNextBtn.addEventListener('click', () => {
      stopAutoPlay();
      const nextIdx = (currentOrderIndex + 1) % orderSteps.length;
      updateOrderVisualizer(nextIdx);
    });
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    if (orderAutoBtn) {
      orderAutoBtn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 mr-1"></i> Auto-Simulate Flow`;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  if (orderAutoBtn) {
    orderAutoBtn.addEventListener('click', () => {
      if (isAutoPlaying) {
        stopAutoPlay();
      } else {
        isAutoPlaying = true;
        orderAutoBtn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5 mr-1"></i> Pause Simulation`;
        if (window.lucide) window.lucide.createIcons();
        
        autoPlayTimer = setInterval(() => {
          const nextIdx = (currentOrderIndex + 1) % orderSteps.length;
          updateOrderVisualizer(nextIdx);
        }, 2600);
      }
    });
  }

  // Initialize first step
  updateOrderVisualizer(0);

  /* ==========================================================================
     7. PROJECT FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => {
        b.classList.remove('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
        b.classList.add('bg-white/5', 'text-gray-300');
      });

      btn.classList.add('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      btn.classList.remove('bg-white/5', 'text-gray-300');

      projectItems.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => (card.style.opacity = '1'), 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 250);
        }
      });
    });
  });

  /* ==========================================================================
     8. SCROLL PROGRESS BAR & SCROLL REVEAL OBSERVER
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress-bar');
  const dockNavLinks = document.querySelectorAll('.dock-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Active dock link update
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    dockNavLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-cyan-400', 'bg-cyan-500/10');
      } else {
        link.classList.remove('text-cyan-400', 'bg-cyan-500/10');
      }
    });
  });

  // Staggered reveal on scroll
  const revealElements = document.querySelectorAll('.reveal-init');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     9. ONE-CLICK EMAIL COPY WITH CYBER TOAST
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (toastNotification && toastMessage) {
      toastMessage.textContent = message;
      toastNotification.classList.add('toast-show');
      setTimeout(() => {
        toastNotification.classList.remove('toast-show');
      }, 3200);
    }
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = copyEmailBtn.getAttribute('data-email') || 'preeshavashisth73@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('✓ Contact: preeshavashisth73@gmail.com');
      });
    });
  }

  /* ==========================================================================
     10. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuDrawer.classList.contains('hidden');
      if (isExpanded) {
        mobileMenuDrawer.classList.remove('hidden');
      } else {
        mobileMenuDrawer.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
      });
    });
  }

  console.log('✨ PV Otherworldly Engine online & ready.');
});
