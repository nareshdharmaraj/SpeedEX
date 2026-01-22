document.addEventListener('DOMContentLoaded', () => {
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;

    // Check for saved preference
    const savedRtl = localStorage.getItem('rtl');
    if (savedRtl === 'true') {
        html.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        // Initial state
        rtlToggle.addEventListener('click', () => {
            const isRtl = html.getAttribute('dir') === 'rtl';
            if (isRtl) {
                html.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
            // Trigger a custom event for other scripts to respond to RTL change if needed
            window.dispatchEvent(new CustomEvent('rtlChanged', { detail: { isRtl: !isRtl } }));
        });
    }
});
