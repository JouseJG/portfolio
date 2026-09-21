package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Proyecto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    private final List<Proyecto> proyectos = new ArrayList<>();

    @GetMapping
    public List<Proyecto> lista(@RequestParam(name = "estado", defaultValue = "todos") String estado) {
        if(estado.equals("activo")){
            List<Proyecto> filtrado = new ArrayList<>();
            for (Proyecto proyecto : proyectos) {
                if (proyecto.getActivo()) {
                    filtrado.add(proyecto);
                }
            }
            return filtrado;
        }
        return proyectos;
    }

    @GetMapping("/{id}")
    public Proyecto ficha_proyecto(@PathVariable(name = "id") int id){
        for (Proyecto proyecto : proyectos) {
            if (proyecto.getId() == id) {
                return proyecto;
            }
        }
        return null;
    }

    // @GetMapping("/{id}/incidencias")
    // public String incidencias_proyecto(@PathVariable(name = "id") int id){
    //     return "Incidencias del proyecto "+id;
    // }

    @PostMapping
    public Proyecto crear(@RequestBody Proyecto proyecto) {
        proyectos.add(proyecto);
        return proyecto;
    }
}

/*
** Reto · Predice el JSON **
    {
        id: 7,
        titulo: "Caída del servidor",
        nivel: 3
    }

** Reto · Diagnóstico de tres respuestas **
    1- Te el Content-Type mal configurat, te que revisaro be
    2- pot ser que tinga el nom de les funcions del model mas declarades, te que asegurare que despres de escriure  get o set tinga el nombre de les variables amb el primer nombre en mayuscula. example "getNombre" en lugar de "getnombre". 
    3- pot ser que el POST no este guardant les dades en la DB, te que revisar la funcion y asegurase de que les dades es guarden correctament en la db.
*/