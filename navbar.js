updateHamburger();
function updateHamburger() {
    const logo = document.getElementById('logo')
    if (window.innerWidth <= 900) logo.src = 'https://dirgyzwl2hnqq.cloudfront.net/ccf17f3580e19b7680cf1d66e39ded65/dist/img/tiger-head.png';
    else logo.src = 'https://dirgyzwl2hnqq.cloudfront.net/8ab5ccf6483af37484451354a9d9e4e3/dist/img/prince_logo_scrolled.png';
}
function expand() {
    const topNav = document.getElementById('top-nav');
    const menuIcon = document.getElementById('menu-icon');
    const isExpanded = topNav.classList.toggle('expand');
    menuIcon.setAttribute('aria-expanded', String(isExpanded));
    if (!isExpanded) closeCandidates();
}
window.addEventListener("resize", updateHamburger);
const menuIcon = document.getElementById("menu-icon");
if (menuIcon) menuIcon.addEventListener("click", expand);
document.querySelectorAll('#nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        const topNav = document.getElementById('top-nav');
        const menuIcon = document.getElementById('menu-icon');
        closeCandidates();
        topNav.classList.remove('expand');
        menuIcon.setAttribute('aria-expanded', 'false');
    });
});
const candidatesDropdown = document.getElementById('candidates-dropdown');
const candidatesToggle = document.getElementById('candidates-toggle');
const candidatesMenu = document.getElementById('candidates-menu');

function closeCandidates() {
    candidatesToggle.setAttribute('aria-expanded', 'false');
    candidatesMenu.hidden = true;
}

candidatesToggle.addEventListener('click', () => {
    const isExpanded = candidatesToggle.getAttribute('aria-expanded') === 'true';
    candidatesToggle.setAttribute('aria-expanded', String(!isExpanded));
    candidatesMenu.hidden = isExpanded;
});

document.addEventListener('click', (event) => {
    if (!candidatesDropdown.contains(event.target)) closeCandidates();
});

candidatesDropdown.addEventListener('focusout', (event) => {
    if (!candidatesDropdown.contains(event.relatedTarget)) closeCandidates();
});

candidatesDropdown.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCandidates();
        candidatesToggle.focus();
    }
});
