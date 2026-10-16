import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import config from './site.config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') heroCanvas?: ElementRef<HTMLCanvasElement>;

  readonly config = config;
  currentProjectIndex = 0;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private heroGroup?: THREE.Group;
  private animationFrame = 0;

  get visibleProjects() {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (this.currentProjectIndex + offset) % this.config.projects.length;
      return this.config.projects[index];
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    this.camera.position.z = 5.2;

    const ambientLight = new THREE.AmbientLight(0xffe3bf, 1.4);
    const pointLight = new THREE.PointLight(0xff9b4d, 3.5, 30, 2);
    pointLight.position.set(3, 2, 4);
    this.scene.add(ambientLight, pointLight);

    const heroGroup = new THREE.Group();
    const accentSpheres: THREE.Mesh[] = [];

    const colors = [0xffc781, 0xff9f5a, 0xf57f2c, 0xf7d8be];
    const accentData = [
      { x: -3.2, y: 1.2, z: -1.6, r: 0.42 },
      { x: -2.5, y: -1.2, z: -0.7, r: 0.31 },
      { x: -1.4, y: 1.9, z: 0.2, r: 0.25 },
      { x: 1.7, y: 2.1, z: -1.2, r: 0.35 },
      { x: 2.8, y: 0.3, z: -0.6, r: 0.28 },
      { x: 3.3, y: -1.5, z: 0.4, r: 0.38 },
      { x: 0.6, y: -2.3, z: 0.6, r: 0.2 },
      { x: -0.9, y: 2.5, z: 0.8, r: 0.22 },
    ];

    for (let index = 0; index < accentData.length; index++) {
      const { x, y, z, r } = accentData[index];
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(r, 32, 32),
        new THREE.MeshStandardMaterial({
          color: colors[index % colors.length],
          emissive: colors[index % colors.length],
          emissiveIntensity: 0.12,
          transparent: true,
          opacity: 0.42,
          metalness: 0.25,
          roughness: 0.75,
        }),
      );
      sphere.position.set(x, y, z);
      sphere.userData = {
        phase: index * 0.8 + 0.4,
        baseX: x,
        baseY: y,
        baseZ: z,
      };
      accentSpheres.push(sphere);
      heroGroup.add(sphere);
    }

    this.heroGroup = heroGroup;
    this.scene.add(heroGroup);

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.resizeHeroScene();

    const animate = () => {
      if (!this.scene || !this.camera || !this.heroGroup || !this.renderer) {
        return;
      }

      const elapsed = performance.now() * 0.001;
      this.heroGroup.rotation.y = elapsed * 0.24;
      this.heroGroup.rotation.x = Math.sin(elapsed * 0.8) * 0.08;
      this.heroGroup.position.y = Math.sin(elapsed * 1.2) * 0.18;

      accentSpheres.forEach((sphere, index) => {
        const { baseX, baseY, baseZ, phase } = sphere.userData as {
          baseX: number;
          baseY: number;
          baseZ: number;
          phase: number;
        };
        const driftX = Math.sin(elapsed * 1.1 + phase) * 0.18;
        const driftY = Math.cos(elapsed * 0.85 + index * 0.7) * 0.16;
        const driftZ = Math.sin(elapsed * 1.4 + phase * 1.35) * 0.22;

        sphere.position.x = baseX + driftX;
        sphere.position.y = baseY + driftY;
        sphere.position.z = baseZ + driftZ;
      });

      this.renderer.render(this.scene, this.camera);
      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.handleResize);
    this.renderer?.dispose();
  }

  private resizeHeroScene(): void {
    const canvas = this.heroCanvas?.nativeElement;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || !this.camera || !this.renderer) {
      return;
    }

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private handleResize = (): void => {
    this.resizeHeroScene();
  };

  showPrevious(): void {
    this.currentProjectIndex = (this.currentProjectIndex - 1 + this.config.projects.length) % this.config.projects.length;
  }

  showNext(): void {
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.config.projects.length;
  }
}
