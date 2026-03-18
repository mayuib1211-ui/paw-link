/* =========================
   汎用フェード（既存）
========================= */
const targets = document.querySelectorAll('.fade-in, .fade-curve');

if (targets.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-show');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '0px 0px -100px 0px',
        }
    );

    targets.forEach(target => observer.observe(target));
}

/* =========================
   譲渡フロー専用（GSAP）
========================= */
gsap.registerPlugin(ScrollTrigger);

const isSP = window.matchMedia('(max-width: 767px)').matches;

gsap.utils.toArray('.adoption__flow-item').forEach((item) => {
    const isReverse = item.classList.contains('is-reverse');

    gsap.from(item, {
        opacity: 0,
        x: isSP ? 0 : (isReverse ? 24 : -24),
        y: isSP ? 24 : 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true
        }
    });
});




