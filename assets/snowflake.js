document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numberOfSnowflakes = 100;
    const snowflakes = [];

    function Snowflake(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }

    Snowflake.prototype.update = function() {
        this.y += this.speed;

        if (this.y > height) {
            this.y = -this.radius;
            this.x = Math.random() * width;
        }
    }

    Snowflake.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    function createSnowflakes() {
        for (let i = 0; i < numberOfSnowflakes; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 4 + 1;
            const speed = Math.random() * 2 + 0.5;
            snowflakes.push(new Snowflake(x, y, radius, speed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        requestAnimationFrame(animate);
    }

    createSnowflakes();
    animate();

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
});
