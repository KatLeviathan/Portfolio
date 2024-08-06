document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    // Highlight the current section in the navigation
    const updateSection = () => {
        navLinks.forEach(link => link.classList.remove('active'));
        const currentSection = window.location.hash || '#about-me';
        document.querySelector(`nav ul li a[href="${currentSection}"]`).classList.add('active');
        sections.forEach(section => section.style.display = section.id === currentSection.substring(1) ? 'block' : 'none');
    };

    window.addEventListener('hashchange', updateSection);

    // Show the About Me section by default
    if (!window.location.hash) {
        window.location.hash = '#about-me';
    } else {
        updateSection();
    }

    // Form validation
    form.addEventListener('submit', event => {
        const emailField = form.querySelector('input[name="email"]');
        const emailValue = emailField.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
        }
    });

    // Handle form submission with feedback
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successMessage.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            errorMessage.style.display = 'block';
        }
    });
});
