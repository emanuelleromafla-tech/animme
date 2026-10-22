document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualizar Ano Automaticamente
    const yearElements = document.querySelectorAll('#current-year, #current-year-footer');
    yearElements.forEach(el => el.textContent = new Date().getFullYear());

    // 2. Dark Mode Toggle com LocalStorage
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☀️';
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '🌙';
            }
        });
    }

    // 3. Header Glassmorphism no Scroll & Back to Top
    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
            backToTop?.classList.add('visible');
        } else {
            header?.classList.remove('scrolled');
            backToTop?.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Menu Mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 5. Intersection Observer para Animações (Performance)
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Otimização: para de observar após animar
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // 6. Accordion FAQ Acessível
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos os outros (opcional, remova se quiser múltiplos abertos)
            document.querySelectorAll('.accordion-header').forEach(otherBtn => {
                if (otherBtn !== button) {
                    otherBtn.classList.remove('active');
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });

            button.classList.toggle('active');
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 7. Rastreamento de UTMs Avançado
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
        source: urlParams.get('utm_source') || 'direto',
        medium: urlParams.get('utm_medium') || 'none',
        campaign: urlParams.get('utm_campaign') || 'none'
    };
    
    // Salva no LocalStorage e no campo oculto do formulário
    localStorage.setItem('utm_data', JSON.stringify(utmData));
    const utmInput = document.getElementById('utm_data');
    if (utmInput) {
        utmInput.value = `Fonte: ${utmData.source} | Mídia: ${utmData.medium} | Campanha: ${utmData.campaign}`;
    }

    // 8. Função de Rastreamento de Eventos (Respeitando LGPD)
    window.trackEvent = function(eventName, params = {}) {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'accepted') {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, params);
            }
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', eventName, params);
            }
        }
        console.log(`[Analytics] Evento: ${eventName}`, params);
    };

    // Rastrear cliques no WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            window.trackEvent('whatsapp_click', { method: link.id || 'sticky_bar' });
        });
    });

    // 9. Formulário Inteligente com Validação e Modal
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalConfirm = document.getElementById('modal-confirm-btn');
    let finalWaLink = '';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação Simples
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const subject = document.getElementById('subject');

            // Reset errors
            [name, email, message].forEach(el => el.parentElement.classList.remove('error'));

            if (name.value.trim().length < 3) { name.parentElement.classList.add('error'); isValid = false; }
            if (!email.value.includes('@')) { email.parentElement.classList.add('error'); isValid = false; }
            if (message.value.trim().length < 10) { message.parentElement.classList.add('error'); isValid = false; }

            if (!isValid) return;

            // Simular envio (UX)
            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';

            setTimeout(() => {
                // Construir mensagem do WhatsApp
                const utmString = document.getElementById('utm_data').value;
                const waMessage = `Olá Emma! Me chamo *${name.value}*.\nAssunto: *${subject.value}*\n\n${message.value}\n\n*(Origem: ${utmString})*`;
                finalWaLink = `https://wa.me/5511961844457?text=${encodeURIComponent(waMessage)}`;
                
                // Salvar rascunho (opcional, limpo após sucesso)
                localStorage.removeItem('form_draft');
                
                // Mostrar Modal
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                
                // Resetar formulário
                form.reset();
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                
                window.trackEvent('form_submission_success');
            }, 1500);
        });

        // Restaurar rascunho se existir
        const draft = localStorage.getItem('form_draft');
        if (draft) {
            const data = JSON.parse(draft);
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('message').value = data.message || '';
        }

        // Salvar rascunho a cada digitação
        form.addEventListener('input', () => {
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            localStorage.setItem('form_draft', JSON.stringify(data));
        });
    }

    // Lógica do Modal
    if (modalConfirm) {
        modalConfirm.addEventListener('click', () => {
            window.open(finalWaLink, '_blank');
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // 10. Banner de Cookies LGPD
    const cookieBanner = document.getElementById('cookie-banner');
    const consent = localStorage.getItem('cookie_consent');

    if (!consent && cookieBanner) {
        // Pequeno delay para não ser intrusivo imediatamente
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }

    const btnAccept = document.getElementById('cookie-accept');
    const btnReject = document.getElementById('cookie-reject');

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            cookieBanner.style.display = 'none';
            window.trackEvent('cookie_consent_accepted');
        });
    }

    if (btnReject) {
        btnReject.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'rejected');
            cookieBanner.style.display = 'none';
            window.trackEvent('cookie_consent_rejected');
        });
    }
});