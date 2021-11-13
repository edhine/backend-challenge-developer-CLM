# backend-challenge-developer-CLM

_Este proyecto contempla el desarrollo del challenge ._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

**Estructura de proyecto**

```
├── dist
├── docker-compose.development.yml
├── Dockerfile
├── init-mongo.js
├── nest-cli.json
├── package.json
├── README.md
├── src
|  ├── app.module.ts
|  ├── app.service.ts
|  ├── main.ts
|  ├── modules
|  |  └── movies
|  |     ├── application
|  |     |  ├── commands
|  |     |  ├── events
|  |     |  |  └── integration.ts
|  |     |  └── queries
|  |     |     ├── find-movie-by-title.handler.ts
|  |     |     ├── find-movie-by-title.query.ts
|  |     |     ├── find-movie-by-title.result.ts
|  |     |     ├── find-movies.handler.ts
|  |     |     ├── find-movies.query.ts
|  |     |     ├── find-movies.result.ts
|  |     |     ├── movie.query.ts
|  |     |     ├── search-and-replace-plot.handler.ts
|  |     |     ├── search-and-replace-plot.query.ts
|  |     |     └── search-and-replace-plot.result.ts
|  |     ├── domain
|  |     |  ├── error.ts
|  |     |  ├── events
|  |     |  ├── factory.ts
|  |     |  ├── movie.ts
|  |     |  └── repository.ts
|  |     ├── infrastructure
|  |     |  ├── entities
|  |     |  |  └── movie.entity.ts
|  |     |  ├── message
|  |     |  |  └── integration-event.publisher.ts
|  |     |  ├── queries
|  |     |  |  └── movie.query.ts
|  |     |  └── repositories
|  |     ├── interface
|  |     |  ├── dto
|  |     |  |  ├── find-movie-by-title.query.dto.ts
|  |     |  |  ├── find-movie-by-title.response.dto.ts
|  |     |  |  ├── find-movies.query.dto.ts
|  |     |  |  ├── find-movies.response.dto.ts
|  |     |  |  ├── search-and-replace-plot.body.dto.ts
|  |     |  |  └── search-and-replace-plot.response.dto.ts
|  |     |  ├── movies.controller.ts
|  |     |  └── response-description.ts
|  |     └── movies.module.ts
|  └── shared
|     ├── application
|     |  ├── application.module.ts
|     |  └── logger
|     |     ├── logger.module.ts
|     |     └── myLogger.service.ts
|     └── shared.module.ts
├── test
|  ├── app.e2e-spec.ts
|  └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## Requerimientos 📦

* docker-compose
* docker
* npm

### Instalación 🔧

Las siguientes instrucciones te guiaran para poder levantar el proyecto correctamente.

```
docker-compose -f docker-compose.development.yml up --build --force-recreate
```

Post-Instalación

```
microservicio: http://localhost:3000
swagger:       http://localhost:3000/api
swagger-json:  http://localhost:3000/api-json
```

## Swagger ⌨️

Este proyecto cuenta con un servicio interno de Swagger, este puede ser accedido desde [Aquí](http://localhost:3000/api), esto despliega una pagina interna que muestra todos los request que tiene este microservicio, esto tiene la particularidad de que se va actualizando con "Decorators" dentro del codigo, por lo cual no hay necesidad de formar o crear el archivo de manera manual.

Este tambien produce el archivo swagger.json [Aquí](http://localhost:3000/api-json) por lo cual se puede descargar directamente.

## Conceptos Aplicados 🤗

* [DDD](https://es.wikipedia.org/wiki/Dise%C3%B1o_guiado_por_el_dominio)
* [Arquitectura Hexagonal](https://medium.com/@edusalguero/arquitectura-hexagonal-59834bb44b7f)
* [Open Api - Swagger](https://swagger.io/resources/open-api/)
* [Nestjs - Mongoose](https://docs.nestjs.com/techniques/mongodb)
* Custom Logger -> Logger Custom basado en contextos
* Y mas...

## Autor ✒️

* **Sergio Andrés Orellana Roa** - **Edhine** - *Desarrollador full-stack* - [Linkedin](https://www.linkedin.com/in/sergio-andres-orellana-roa/) - [Github](https://github.com/Edhine)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

## Retroalimentación

Todo comentario y correcciones, no dudes en mencionarlas 📢, me ayudas a mejorar este proyecto ❤.

---
⌨️ con ❤️ por [Edhine](https://github.com/Edhine) 😊
