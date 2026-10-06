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
      'Diseño y desarrollo soluciones de software con foco en la automatizacion, rendimiento y calidad de código.',
    availability: 'Disponible para nuevos proyectos',
  };

  readonly stats = [
    { value: '3+', label: 'años de experiencia' },
    { value: '4+', label: 'proyectos' },
    { value: '100%', label: 'compromiso' },
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
      period: '2022 — Actualidad',
      title: 'Desarrollador Web Full Stack',
      company: 'Proyectos personales y freelance',
      description:
        'Creación de interfaces modernas, APIs y proyectos de software con enfoque en experiencia de usuario y lógica de negocio.',
    },
    {
      period: '2020 — 2022',
      title: 'Desarrollador Frontend / Backend',
      company: 'Entornos educativos y profesionales',
      description:
        'Implementación de soluciones digitales para gestión, procesos internos y experiencias de usuario más limpias y funcionales.',
    },
    {
      period: '2019 — 2020',
      title: 'Estudiante de DAW / Desarrollo de software',
      company: 'Formación profesional',
      description:
        'Adquisición de bases sólidas en programación, diseño web, bases de datos, despliegue y metodologías de trabajo.',
    },
  ];

  readonly projects = [
    {
      title: 'Portfolio personal',
      tag: 'Frontend',
      description:
        'Sitio web profesional con enfoque visual premium, narrativa personal y diseño adaptable para dispositivos móviles y escritorio.',
    },
    {
      title: 'Dashboard de gestión',
      tag: 'Full Stack',
      description:
        'Aplicación para monitorizar datos, procesos y rendimiento con interfaz clara y lógica de negocio enfocada en productividad.',
    },
    {
      title: 'E-commerce / catálogo',
      tag: 'UX + Desarrollo',
      description:
        'Proyecto orientado a presentar productos, mejorar la navegación y potenciar la conversión con un diseño moderno y escalable.',
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
