import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15); // Density based on width
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1, // Square particles
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use standard CSS color matching 'text-emerald-500' but with opacity
      ctx.fillStyle = '#10b981'; 

      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x, p.y, p.size, p.size); // Draw square (Minecraft style)
        
        // Update position (float up)
        p.y -= p.speed;

        // Reset if off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
};

export default ParticleBackground;