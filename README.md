# backend-challenge-developer-CLM

_Este proyecto contempla el desarrollo del challenge ._

## Comenzando π

_Estas instrucciones te permitirΓ‘n obtener una copia del proyecto en funcionamiento en tu mΓ‘quina local para propΓ³sitos de desarrollo y pruebas._

**Estructura de proyecto**

```
βββ dist
βββ docker-compose.development.yml
βββ Dockerfile
βββ init-mongo.js
βββ nest-cli.json
βββ package.json
βββ README.md
βββ src
|  βββ app.module.ts
|  βββ app.service.ts
|  βββ main.ts
|  βββ modules
|  |  βββ movies
|  |     βββ application
|  |     |  βββ commands
|  |     |  βββ events
|  |     |  |  βββ integration.ts
|  |     |  βββ queries
|  |     |     βββ find-movie-by-title.handler.ts
|  |     |     βββ find-movie-by-title.query.ts
|  |     |     βββ find-movie-by-title.result.ts
|  |     |     βββ find-movies.handler.ts
|  |     |     βββ find-movies.query.ts
|  |     |     βββ find-movies.result.ts
|  |     |     βββ movie.query.ts
|  |     |     βββ search-and-replace-plot.handler.ts
|  |     |     βββ search-and-replace-plot.query.ts
|  |     |     βββ search-and-replace-plot.result.ts
|  |     βββ domain
|  |     |  βββ error.ts
|  |     |  βββ events
|  |     |  βββ factory.ts
|  |     |  βββ movie.ts
|  |     |  βββ repository.ts
|  |     βββ infrastructure
|  |     |  βββ entities
|  |     |  |  βββ movie.entity.ts
|  |     |  βββ message
|  |     |  |  βββ integration-event.publisher.ts
|  |     |  βββ queries
|  |     |  |  βββ movie.query.ts
|  |     |  βββ repositories
|  |     βββ interface
|  |     |  βββ dto
|  |     |  |  βββ find-movie-by-title.query.dto.ts
|  |     |  |  βββ find-movie-by-title.response.dto.ts
|  |     |  |  βββ find-movies.query.dto.ts
|  |     |  |  βββ find-movies.response.dto.ts
|  |     |  |  βββ search-and-replace-plot.body.dto.ts
|  |     |  |  βββ search-and-replace-plot.response.dto.ts
|  |     |  βββ movies.controller.ts
|  |     |  βββ response-description.ts
|  |     βββ movies.module.ts
|  βββ shared
|     βββ application
|     |  βββ application.module.ts
|     |  βββ logger
|     |     βββ logger.module.ts
|     |     βββ myLogger.service.ts
|     βββ shared.module.ts
βββ test
|  βββ app.e2e-spec.ts
|  βββ jest-e2e.json
βββ tsconfig.build.json
βββ tsconfig.json
```

## Requerimientos π¦

* docker-compose
* docker
* npm

### InstalaciΓ³n π§

Las siguientes instrucciones te guiaran para poder levantar el proyecto correctamente.

```
docker-compose -f docker-compose.development.yml up --build --force-recreate
```

Post-InstalaciΓ³n

```
microservicio: http://localhost:3000
swagger:       http://localhost:3000/api
swagger-json:  http://localhost:3000/api-json
```

## Swagger β¨οΈ

Este proyecto cuenta con un servicio interno de Swagger, este puede ser accedido desde [AquΓ­](http://localhost:3000/api), esto despliega una pagina interna que muestra todos los request que tiene este microservicio, esto tiene la particularidad de que se va actualizando con "Decorators" dentro del codigo, por lo cual no hay necesidad de formar o crear el archivo de manera manual.

Este tambien produce el archivo swagger.json [AquΓ­](http://localhost:3000/api-json) por lo cual se puede descargar directamente.

## Conceptos Aplicados π€

* [DDD](https://es.wikipedia.org/wiki/Dise%C3%B1o_guiado_por_el_dominio)
* [Arquitectura Hexagonal](https://medium.com/@edusalguero/arquitectura-hexagonal-59834bb44b7f)
* [Open Api - Swagger](https://swagger.io/resources/open-api/)
* [Nestjs - Mongoose](https://docs.nestjs.com/techniques/mongodb)
* Custom Logger -> Logger Custom basado en contextos
* Y mas...

## Autor βοΈ

* **Sergio AndrΓ©s Orellana Roa** - **Edhine** - *Desarrollador full-stack* - [Linkedin](https://www.linkedin.com/in/sergio-andres-orellana-roa/) - [Github](https://github.com/Edhine)

## Licencia π

Este proyecto estΓ‘ bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

## RetroalimentaciΓ³n

Todo comentario y correcciones, no dudes en mencionarlas π’, me ayudas a mejorar este proyecto β€.

---
β¨οΈ con β€οΈ por [Edhine](https://github.com/Edhine) π
