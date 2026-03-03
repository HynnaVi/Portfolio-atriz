document.addEventListener('DOMContentLoaded', () => {

    const translations = {
    
        navHome: { pt: "Início", en: "Home" },
        navSkills: { pt: "Habilidades", en: "Skills" },
        navProjects: { pt: "Projetos", en: "Projects" },
        navContact: { pt: "Contato", en: "Contact" },

        heroGreeting: { pt: "Olá, eu sou a", en: "Hello, I am" },
        heroName: { pt: "Anny Vitoria", en: "Anny Vitoria" }, 
        heroBio: { pt: "Sou atriz e gosto de dar vida a personagens que parecem reais, que sentem de verdade. Eu gosto de histórias intensas, principalmente romance e drama, mas topo sair da zona de conforto se o papel for bom. Pra mim, atuar é entrar em outro mundo por um tempo, e fazer as pessoas sentirem junto comigo.", en: "I’m an actress and I like bringing characters to life in a way that feels real, like they truly have emotions. I enjoy intense stories, especially romance and drama, but I’m always open to stepping out of my comfort zone if the role is worth it. For me, acting is about stepping into another world for a while and making people feel it with me." },
        heroButton: { pt: "Ver Meus Filmes", en: "View My Films" },
        
        skillsTitle: { pt: "Minhas Habilidades", en: "My Skills" },
        skill1: { pt: "Atuação para Cinema e TV", en: "Acting for Film and TV" },
        skill2: { pt: "Interpretação Teatral", en: "Theatrical Performance" },
        skill3: { pt: "Expressão Corporal e Vocal", en: "Body and Vocal Expression" },
        skill4: { pt: "Improvisação", en: "Improvisation" },

        projectsTitle: { pt: "Meus Trabalhos em Destaque", en: "Featured Work" },
        
        project1Title: { pt: "A Jornada Da Feiticeira", en: "The Sorceress's Journey" },
        project1Desc: { pt: "Quando uma garota comum descobre que consegue atravessar espelhos e entrar em um reino esquecido pelo tempo, ela percebe que é a única capaz de impedir que a escuridão consuma os dois mundos. Entre magia, segredos antigos e escolhas impossíveis, ela precisa decidir quem está disposta a se tornar.", en: "When an ordinary girl discovers she can walk through mirrors into a forgotten kingdom, she realizes she is the only one capable of stopping the darkness from consuming both worlds. Surrounded by magic, ancient secrets, and impossible choices, she must decide who she is willing to become." },
        
        project2Title: { pt: "O Coração Da Senhorita Bennet", en: "Miss Bennet's Heart" },
        project2Desc: { pt: "Em meio às rígidas regras da sociedade do século XIX, uma jovem determinada luta para ter voz própria enquanto enfrenta um casamento arranjado. Entre cartas secretas, encontros proibidos e expectativas familiares, ela descobre que o amor pode ser o maior ato de coragem.", en: "In the rigid rules of 19th-century high society, a determined young woman fights for her own voice while facing an arranged marriage. Between secret letters, forbidden meetings, and family expectations, she discovers that love can be the greatest act of courage." },
        
        project3Title: { pt: "Nosso Amor Inesquecível", en: "Our Unforgettable Love" },
        project3Desc: { pt: "Depois de uma decepção amorosa, uma jovem decide recomeçar em uma nova cidade, prometendo a si mesma não se apaixonar novamente. Mas quando conhece alguém que desafia todas as suas certezas, ela percebe que o amor pode surgir exatamente quando menos se espera.", en: "After a heartbreak, a young woman decides to start over in a new city, vowing not to fall in love again. But when she meets someone who challenges all her certainties, she realizes that love can emerge exactly when least expected." },

        btnDemo: { pt: "Ver Trailer", en: "Watch Trailer" },
        btnCode: { pt: "Bastidores", en: "Behind the Scenes" },

        contactTitle: { pt: "Vamos Trabalhar Juntos?", en: "Shall We Work Together?" },
        contactSubtitle: { pt: "Entre em contato para testes de elenco, parcerias ou projetos artísticos.", en: "Get in touch for casting calls, partnerships, or artistic projects." },
        formNamePlaceholder: { pt: "Seu Nome", en: "Your Name" },
        formEmailPlaceholder: { pt: "Seu Email", en: "Your Email" },
        formMessagePlaceholder: { pt: "Sua Mensagem", en: "Your Message" },
        formSend: { pt: "Enviar Mensagem", en: "Send Message" },
        
        formSuccess: { pt: "Mensagem enviada com sucesso! Em breve minha equipe entrará em contato.", en: "Message sent successfully! My team will get back to you shortly." },
        
        footerText: { pt: "© 2026 Anny Vitoria.", en: "© 2026 Anny Vitoria." }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('lang') || 'pt'; 

    function translatePage(lang) {
        for (const key in translations) {
            const element = document.querySelector(`[data-key="${key}"]`);
            if (element) {
                const translation = translations[key][lang];
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'BUTTON' && element.type === 'submit') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
        
        langButtons.forEach(btn => {
            btn.classList.remove('active-lang');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active-lang');
            }
        });

        currentLang = lang;
        localStorage.setItem('lang', lang);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });

    translatePage(currentLang);

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        const isDarkMode = body.classList.contains('dark-mode');
        modeToggle.querySelector('i').className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        modeToggle.querySelector('i').className = 'fas fa-moon';
    } else {
        body.classList.add('dark-mode');
        modeToggle.querySelector('i').className = 'fas fa-sun';
    }

    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const textArray = JSON.parse(typingElement.getAttribute('data-text'));
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1500); 
                } else {
                    setTimeout(type, 100);
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length; 
                    setTimeout(type, 500); 
                } else {
                    setTimeout(type, 50);
                }
            }
        }
        type();
    }

    const skillsSection = document.getElementById('habilidades');
    const skillBars = document.querySelectorAll('.bar');
    let hasAnimated = false;

    function animateSkills() {
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 100 && !hasAnimated) {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%'; 
            });
            hasAnimated = true; 
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); 

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
     
        const successMessage = translations.formSuccess[currentLang];
        
        formMessage.style.color = 'var(--primary-color)';
        formMessage.textContent = successMessage;
        
        contactForm.reset();
    });

});