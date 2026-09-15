package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import com.example.demo.model.Tarea;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tareas")
public class TareaController {

    @GetMapping
    public List<Tarea> lista() {
        return List.of(
            new Tarea(1, "Revisar el login", "alta", false),
            new Tarea(2, "Actualizar dependencias", "baja", true)
        );
    }

    @GetMapping("/ejemplo")
    public Tarea ejemplo() {
        return new Tarea(1, "Revisar el login", "alta", false);
    }
}