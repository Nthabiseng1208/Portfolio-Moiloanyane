window.addEventListener('DOMContentLoaded', () => {
  new Typed(".text", {
    strings: ["Aspiring Software Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });

  document.querySelectorAll('.radial-bar').forEach(bar => {
    const circle = bar.querySelector('.progress-bar');
    const percentageText = bar.querySelector('.percentage');
    const percent = parseInt(percentageText.textContent);

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    setTimeout(() => {
      const targetOffset = circumference - (percent / 100) * circumference;
      circle.style.transition = "stroke-dashoffset 1s linear"; 
      circle.style.strokeDashoffset = targetOffset;

      setTimeout(() => {
        let direction = 1; 
        let start = null;
        const duration = 2000;

        function animate(timestamp) {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          let progress = Math.min(elapsed / duration, 1);

          if (direction === 1) {
            circle.style.strokeDashoffset = targetOffset + progress * (circumference - targetOffset);
          } else {
            circle.style.strokeDashoffset = circumference - progress * (circumference - targetOffset);
          }

          if (progress === 1) {
            direction *= -1;
            start = timestamp;
          }

          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      }, 1200);
    }, 300);
  });
});
