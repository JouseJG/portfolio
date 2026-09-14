package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {
    @GetMapping("/hola")
    public String saludo() {
        return "Hola, mundo. Te responde mi servidor.";
    }

    @GetMapping("/anyo")
    public int anyo() {
        return 2026;
    }

    @GetMapping("/estado")
    public String estado() {
        return "Servidor en funcionamiento";
    }

    @GetMapping("/prestamos/resumen")
    public String resumen() {
        return "Esta aplicación gestionará los préstamos de material";
    }
}