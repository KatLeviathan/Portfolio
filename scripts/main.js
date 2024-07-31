document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    
    // Highlight the current section in the navigation
    window.addEventListener('hashchange', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        const currentSection = window.location.hash || '#about-me';
        document.querySelector(`nav ul li a[href="${currentSection}"]`).classList.add('active');
        sections.forEach(section => section.style.display = section.id === currentSection.substring(1) ? 'block' : 'none');
    });

    // Show the About Me section by default
    if (!window.location.hash) {
        window.location.hash = '#about-me';
    } else {
        window.dispatchEvent(new Event('hashchange'));
    }

    // Form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', event => {
        const emailField = form.querySelector('input[name="email"]');
        const emailValue = emailField.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
        }
    });
});
