import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('sceneCanvas', { static: true }) private readonly sceneCanvas!: ElementRef<HTMLCanvasElement>;

  readonly profile = {
    name: 'José Ramón Jiménez García',
    role: 'Desarrollador Full Stack',
    summary:
      'Desarrollador y emprendedor con experiencia liderando productos digitales, startups y equipos de tecnología en entornos reales de negocio.',
    availability: 'Disponible para nuevas oportunidades',
  };

  readonly stats = [
    { value: '4+', label: 'años en tecnología' },
    { value: '3', label: 'roles de liderazgo' },
    { value: '€250k+', label: 'facturación generada' },
  ];

  readonly skills = [
    'Angular',
    'JavaScript',
    'Python',
    'Java',
    'Spring Boot',
    'HTML5',
    'CSS3',
    'SQL',
    'Git',
    'AWS',
    'UX/UI',
  ];

  readonly experience = [
    {
      period: 'dic. 2024 - jul. 2026 · 1 año 8 meses',
      title: 'CTO & Co-Founder',
      company: 'Reditorial',
      location: 'Comunidad Valenciana / Comunitat Valenciana, España · Presencial',
      description:
        'Lideré la puesta en marcha de la empresa y aporté visión estratégica, ejecución y desarrollo del producto digital, junto con el crecimiento de la marca y la operación del negocio.',
    },
    {
      period: 'jun. 2023 - dic. 2024 · 1 año 7 meses',
      title: 'CTO & Co-Founder',
      company: 'TwinTune',
      location: 'Valencia/Valencia, Comunidad Valenciana / Comunitat Valenciana, España · Presencial',
      description:
        'Participé en la dirección tecnológica y el desarrollo de soluciones con enfoque en automatización, producto digital y gestión de proyectos. Finalistas del BIME en 2023.',
    },
    {
      period: 'may. 2023 - nov. 2023 · 7 meses',
      title: 'CTO',
      company: 'Aspiro',
      location: 'Presencial',
      description:
        'Automatización de procesos y desarrollo back-end para mejorar la eficiencia operativa y la arquitectura de la solución tecnológica.',
    },
    {
      period: 'mar. 2023 - ago. 2023 · 6 meses',
      title: 'Accelerator Program',
      company: 'Lanzadera',
      location: 'Valencia/Valencia, Comunidad Valenciana / Comunitat Valenciana, España',
      description:
        'Acompañamiento en validación de negocio, estrategia empresarial, estructura inicial y desarrollo del modelo de crecimiento.',
    },
    {
      period: 'nov. 2022 - may. 2023 · 7 meses',
      title: 'Incubation Program',
      company: 'STARS',
      location: 'Valencia/Valencia, Comunidad Valenciana / Comunitat Valenciana, España · Presencial',
      description:
        'Formación y apoyo en estrategia empresarial y desarrollo empresarial para materializar la idea de negocio y dar forma al producto.',
    },
  ];

  readonly projects = [
    {
      title: 'Reditorial',
      tag: 'Co-Founder',
      description:
        'Puesta en marcha de una empresa con foco en crecimiento, operación y construcción del producto digital desde cero.',
    },
    {
      title: 'TwinTune',
      tag: 'CTO & Co-Founder',
      description:
        'Lideré parte del desarrollo tecnológico con enfoque en automatización, infraestructura y gestión de proyectos, logrando reconocimiento institucional en el BIME.',
    },
    {
      title: 'Aspiro',
      tag: 'CTO',
      description:
        'Automatización de procesos y desarrollo de backend para optimizar operación y mejora funcional de la solución tecnológica.',
    },
  ];

  readonly values = [
    'Pensamiento orientado a producto',
    'Código limpio y mantenible',
    'Enfoque en experiencia de usuario',
    'Trabajo en equipo y comunicación',
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private readonly animatedMeshes: THREE.Mesh[] = [];

  private readonly handleResize = () => {
    if (!this.sceneCanvas || !this.camera || !this.renderer) {
      return;
    }

    const canvas = this.sceneCanvas.nativeElement;
    const width = canvas.clientWidth || 700;
    const height = canvas.clientHeight || 700;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };

  ngAfterViewInit(): void {
    const canvas = this.sceneCanvas.nativeElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 7);

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    const ambient = new THREE.AmbientLight(0x8ec5ff, 1.2);
    const point = new THREE.PointLight(0xff4fd8, 2.5, 40);
    point.position.set(4, 2, 5);
    this.scene.add(ambient, point);

    const group = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(1.3, 1);
    const wireMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.92,
    });
    const core = new THREE.Mesh(geometry, wireMaterial);
    group.add(core);

    for (let i = 0; i < 18; i++) {
      const particleGeometry = new THREE.SphereGeometry(Math.random() * 0.12 + 0.05, 16, 16);
      const particleMaterial = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x7dd3fc : 0xf472b6,
        emissive: i % 2 === 0 ? 0x1d4ed8 : 0x831843,
        emissiveIntensity: 0.4,
      });

      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
      );
      particle.userData = {
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2,
      };

      this.animatedMeshes.push(particle);
      group.add(particle);
    }

    this.scene.add(group);
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.renderer.setAnimationLoop(() => {
      const t = performance.now() * 0.001;
      core.rotation.x = t * 0.28;
      core.rotation.y = t * 0.42;
      group.rotation.y = t * 0.25;

      this.animatedMeshes.forEach((mesh, index) => {
        const offset = mesh.userData['offset'] as number;
        mesh.position.x += Math.sin(t + offset) * 0.0015;
        mesh.position.y += Math.cos(t * 0.9 + index) * 0.0012;
      });

      this.renderer.render(this.scene, this.camera);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);

    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
    }
  }
}
