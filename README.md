# softtek-prueba
prueba técnica para postulacion a puesto backend node js aws a la empresa softtek - rimac seguros


# Estructura del Proyecto

Este proyecto está basado en **Serverless Framework** y diseñado para interactuar con AWS utilizando Node.js. La estructura está organizada para facilitar el desarrollo, la extensibilidad y la mantenibilidad del código.

## Estructura del Proyecto

```bash
softtek-prueba/
│
├── layers/
│   └── nodejs/                # Lógica compartida entre funciones Lambda (vacía)
│
├── src/
│   ├── config/                 # Configuración general de la aplicación
│   │
│   ├── core/                   # Funciones y estructuras principales del proyecto
│   │   ├── middlewares/        # Middlewares para la manipulación de requests/responses
│   │   ├── models/             # Modelos de datos
│   │   ├── requests/           # Clases para validación de datos de entrada
│   │   ├── responses/          # Respuestas estandarizadas para la API
│   │
│   ├── functions/              # Funciones Lambda
│   │
│   ├── services/               # Lógica de negocio y servicios de la API
│   │   ├── repositories/       # Repositorios para interactuar con la base de datos
│   │   ├── apis/               # Lógica para consumir APIs externas
│   │   └── topics/             # Lógica relacionada con eventos o mensajes (SNS, SQS)
│   │
│   ├── utils/                  # Utilidades generales para el proyecto
│   │
│   └── database/               # Conexión y lógica relacionada con la base de datos
│       └── migrations/         # Migraciones de base de datos
│
├── tests/                      # Pruebas de la API, funciones, etc.
│   ├── unit/                   # Pruebas unitarias
│   ├── integration/            # Pruebas de integración (interacción entre servicios)
│   └── e2e/                    # Pruebas end-to-end (funcionalidad completa)
│
├── serverless.yml              # Configuración de Serverless Framework
├── serverless-openapi.yml      # Configuración para OpenAPI
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Documentación del proyecto

```

# Lo que deberias saber del proyecto:
en esta sección dejaremos un par de observaciones a tener en cuenta previo a realizar cambios significativos en el proyecto:

## ¿Por qué la documentación debe ser estática y no usar un plugin?
La principal razón de esto es que se opto por `httpApi` para la reducción de costos y actualmente no existe un plugin que sea compatible con `httpApi` para la implementación dinámica de documentación.

## ¿Por qué dynamoDB y no una RDS?
Esto es porque no existe la necesidad de usar una RDS debido a que no se presentan relaciones complejas o alguna otra razón
como un esquema rigido. por otro lado, dynamoDB no ofrece una escabilidad automatica y un menor costo (debido al uso) 
además del mero gusto de hacerlo así :D 

## ¿Por qué la escabilidad es bajo demanda?
Esto es principal por la razón de que no se tiene una referencia de la demanda real, patrones de acceso o una forma
correcta de calcular las lecturas y escrituras necesarias.