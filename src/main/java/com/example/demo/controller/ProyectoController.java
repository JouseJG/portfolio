package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    @GetMapping
    public String lista(@RequestParam(name = "estado", defaultValue = "todos") String estado) {
        if(estado.equals("activo")){
            return "Lista de proyectos con estado activo";
        }
        return "Lista de proyectos";
         
    }

    @GetMapping("/{id}")
    public String ficha_proyecto(@PathVariable(name = "id") int id){
        return "Ficha del proyecto "+id;
    }

    @GetMapping("/{id}/incidencias")
    public String incidencias_proyecto(@PathVariable(name = "id") int id){
        return "Incidencias del proyecto "+id;
    }
}