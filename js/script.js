document.addEventListener('DOMContentLoaded', () => {
    // Show welcome popup
    function showWelcomePopup() {
        let userName = prompt("Please enter your name:");
        if (userName && userName.trim() !== '') {
            const welcomeUser = document.getElementById('welcome-user');
            if (welcomeUser) welcomeUser.textContent = userName;
        }
    }
    showWelcomePopup();

    // Validate form
    const nameInput = document.getElementById('name-input');
    const messageOutput = document.getElementById('message-output');
    const sendButton = document.querySelector('button[onclick="validateForm();"]');

    if (sendButton) {
        sendButton.addEventListener('click', () => {
            if (nameInput.value.trim() === '') {
                alert('Please enter your name.');
            } else {
                if (messageOutput) messageOutput.innerHTML = `Thank you, ${nameInput.value}, for your message!`;
                nameInput.value = '';
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }
        });
    });

    // Active nav link
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('nav-active');
        });
    });

    // Typing animation
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const texts = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Problem Solver'];
        let count = 0, index = 0;
        function type() {
            if (count === texts.length) count = 0;
            let currentText = texts[count];
            typingText.textContent = currentText.slice(0, ++index);
            if (index === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
        type();
    }

    // Skill bars animation
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillsSection && skillBars.length > 0) {
        const animateSkills = () => {
            skillBars.forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        };
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) animateSkills();
            });
        }, { threshold: 0.5 });
        skillsObserver.observe(skillsSection);
    }

    // Back to top
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});




  document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Tampilkan di sebelah kanan dalam format text
            const displayArea = document.getElementById('form-display');
            displayArea.innerHTML = `
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-3">Data yang Dikirim:</h4>
                    <div class="space-y-2">
                        <p><strong>Nama:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subjek:</strong> ${subject}</p>
                        <p><strong>Pesan:</strong></p>
                        <p class="bg-white p-3 rounded border-l-4 border-blue-500 whitespace-pre-wrap">${message}</p>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p class="text-green-700 text-sm">✓ Pesan berhasil dikirim!</p>
                </div>
            `;
            
            // Reset form
            this.reset();
        });

        // Real-time preview (optional)
        const inputs = ['name', 'email', 'subject', 'message'];
        inputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('input', function() {
                updatePreview();
            });
        });

        function updatePreview() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name || email || subject || message) {
                const displayArea = document.getElementById('form-display');
                displayArea.innerHTML = `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-3">Preview:</h4>
                        <div class="space-y-2">
                            <p><strong>Nama:</strong> ${name || '<span class="text-gray-400">-</span>'}</p>
                            <p><strong>Email:</strong> ${email || '<span class="text-gray-400">-</span>'}</p>
                            <p><strong>Subjek:</strong> ${subject || '<span class="text-gray-400">-</span>'}</p>
                            <p><strong>Pesan:</strong></p>
                            <p class="bg-white p-3 rounded border-l-4 border-blue-500 whitespace-pre-wrap">${message || '<span class="text-gray-400">Ketik pesan Anda...</span>'}</p>
                        </div>
                    </div>
                `;
            }
        }