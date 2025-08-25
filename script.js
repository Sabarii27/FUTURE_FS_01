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

    // Form submission using Formspree with popup
    const form = document.getElementById('contact-form');
    if (form) {
        // Create popup modal
        let popup = document.createElement('div');
        popup.id = 'contact-popup-modal';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100vw';
        popup.style.height = '100vh';
        popup.style.background = 'rgba(34, 34, 34, 0.25)';
        popup.style.display = 'none';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.zIndex = '9999';
        popup.innerHTML = `<div style="background:#fff;padding:32px 36px 28px 36px;border-radius:18px;box-shadow:0 8px 32px rgba(63,81,181,0.13);font-size:1.15em;color:#222;text-align:center;max-width:90vw;min-width:220px;position:relative;"><span id='close-contact-popup' style='position:absolute;top:10px;right:18px;font-size:1.5em;cursor:pointer;color:#888;'>&times;</span><div id='contact-popup-message'></div></div>`;
    popup.innerHTML = `<div style="background:#fff;padding:48px 60px 44px 60px;border-radius:22px;box-shadow:0 12px 40px rgba(63,81,181,0.16);font-size:1.25em;color:#222;text-align:center;max-width:480px;min-width:260px;width:90vw;position:relative;"><span id='close-contact-popup' style='position:absolute;top:14px;right:28px;font-size:2em;cursor:pointer;color:#888;'>&times;</span><div id='contact-popup-message'></div></div>`;
        document.body.appendChild(popup);
        const showPopup = (msg, color) => {
            document.getElementById('contact-popup-message').textContent = msg;
            document.getElementById('contact-popup-message').style.color = color;
            popup.style.display = 'flex';
        };
        document.getElementById('close-contact-popup').onclick = () => {
            popup.style.display = 'none';
        };
        popup.onclick = (e) => {
            if (e.target === popup) popup.style.display = 'none';
        };
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                showPopup('Thank you for your message! I will get back to you soon.', 'green');
                form.reset();
            } else {
                showPopup('Oops! There was a problem sending your message. Please try again later.', 'red');
            }
            setTimeout(() => {
                popup.style.display = 'none';
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
