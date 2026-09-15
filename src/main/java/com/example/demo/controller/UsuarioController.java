package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @GetMapping("/usuarios/{id}")
    public String usuario(@PathVariable(name = "id") int id) {
        return "Ficha del usuario " + id;
    }
    
    @GetMapping("/proyectos/{proyectoId}/incidencias/{incidenciaId}")
    public String incidenciaDeProyecto(
            @PathVariable(name = "proyectoId") int proyectoId,
            @PathVariable(name = "incidenciaId") int incidenciaId) {

        return "Incidencia " + incidenciaId + " del proyecto " + proyectoId;
    }
}