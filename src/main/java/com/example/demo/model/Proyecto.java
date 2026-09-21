package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public class Proyecto {

    private int id;
    private int numeroDeIncidencias;
    private String nombre;
    private String descripcion;
    private boolean activo;

    @JsonCreator
    public Proyecto() {
    }

    public Proyecto(int id, int numeroDeIncidencias, String nombre, String descripcion, boolean activo) {
        this.id = id;
        this.numeroDeIncidencias = numeroDeIncidencias;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.activo = activo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumeroDeIncidencias() {
        return numeroDeIncidencias;
    }

    public void setNumeroDeIncidencias(int numeroDeIncidencias) {
        this.numeroDeIncidencias = numeroDeIncidencias;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean getActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}