# portfolio DAW

El objetivo es aprender a hacer un workflow y repasar conceptos de git

[URL portfolio](https://jousejg.github.io/portfolio/)

**ruta del workflow**: .github/workflows/static.yml

## Propuesta proyecto fin de trimestre
* **Propuesta 1**: 
Una web que permita crear diagramas de bases de datos en base a codigo, similar a la pagina [dbdiagram.io](https://dbdiagram.io/)
* **Propuesta 2**: 
Web que permita generar infraestructuras completas de AWS diseñandolas como un diagrama y permitiendo exportarlo en codigo y montarlo utilizando como base la CDK de amazon

## Endpoints
### GET
``` bash
/hola
/anyo
/estado
/prestamos/resumen
```

## Ejecucion
``` bash
git clone https://github.com/JouseJG/portfolio
cd portfolio
chmod +x mvnw
./mvnw spring-boot:run
```

