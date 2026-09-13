
document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(
        ".sobre, .c, .doacao, .hero-card, .item-seguranca"
    );

    elementos.forEach((elemento) => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(40px)";
        elemento.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    elementos.forEach((elemento) => {
        observer.observe(elemento);
    });
});

