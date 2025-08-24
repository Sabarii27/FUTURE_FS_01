document.addEventListener('DOMContentLoaded', () => {
    // Ensure modal is hidden on page load
    var certModal = document.getElementById('certModal');
    if (certModal) certModal.style.display = 'none';
    // Certificate modal logic for all certificates
    // use the already declared certModal
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalDesc = document.getElementById('certModalDesc');
    const certModalIcon = document.getElementById('certModalIcon');
    const closeCertModal = document.getElementById('closeCertModal');
    document.querySelectorAll('.cert-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const certItem = btn.closest('.cert-item');
            if (!certItem) return;
            certModal.style.display = 'flex';
            certModalTitle.textContent = certItem.querySelector('p') ? certItem.querySelector('p').innerText.trim() : certItem.innerText.trim();
            certModalDesc.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum urna, nec dictum velit enim nec urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer facilisis, enim nec cursus dictum, enim urna facilisis enim, nec cursus enim urna nec enim. Proin euismod, urna nec cursus dictum, enim urna facilisis enim, nec cursus enim urna nec enim. Suspendisse potenti. Mauris euismod, urna nec cursus dictum, enim urna facilisis enim, nec cursus enim urna nec enim.';
            certModalIcon.innerHTML = certItem.querySelector('i') ? certItem.querySelector('i').outerHTML : '';
        });
    });
    if (closeCertModal) {
        closeCertModal.onclick = function() {
            certModal.style.display = 'none';
        };
    }
    window.addEventListener('mousedown', function(e) {
        if (e.target === certModal) certModal.style.display = 'none';
    });

    // Hamburger menu toggle for mobile
    const burger = document.querySelector('#hamburger-nav .burger');
    const mobileNav = document.querySelector('#hamburger-nav .mobile-links');
    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
        // Close mobile nav when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Form submission using Formspree
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const statusMessage = document.createElement('div');
            statusMessage.style.marginTop = '20px';
            statusMessage.style.textAlign = 'center';
            statusMessage.style.fontSize = '1.1em';

            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                statusMessage.style.color = 'green';
                form.reset(); // Clear the form
            } else {
                statusMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                statusMessage.style.color = 'red';
            }
            form.parentNode.insertBefore(statusMessage, form.nextSibling);

            // Hide the message after 5 seconds
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    }

    // Dynamic animation for hero section on load
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
            heroImage.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
            heroContent.style.opacity = '1';
            heroImage.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroImage.style.transform = 'translateY(0)';
        }, 300);
    }
});
