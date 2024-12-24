# softtek-prueba
Prueba técnica para postulacion a puesto backend node js aws a la empresa softtek - rimac seguros

## Configuración Inicial

### 1. Instalar Dependencias Globales

- **Node.js**: [Descargar desde nodejs.org](https://nodejs.org)
- **Serverless Framework**: Instálalo globalmente con el siguiente comando:
```bash
npm install -g serverless
```

### 2. Configura tus credenciales en aws

```bash
aws configure
```
Esto te pedirá tu AWS Access Key, AWS Secret Key, región y formato de salida.
Para más detalles, consulta la [documentación oficial de Serverless](https://docs.aws.amazon.com/es_es/config/latest/developerguide/getting-started.html).

### 3. Despliega el proyecto

```bash
npm run deploy
```

## Estructura del Proyecto
Este proyecto está basado en **Serverless Framework** y diseñado para interactuar con AWS utilizando Node.js. La estructura está organizada para facilitar el desarrollo, la extensibilidad y la mantenibilidad del código.

```bash
softtek-prueba/
│
├── documentation/              # Recursos necesario para la documentacion con Open api
│
├── infrastructure/             
│   └── iam/                    # Recursos IAM necesarios para la aplicación   
│   └── resources/              # Recursos AWS que usará la aplicaciónn   
│
├── layers/
│   └── nodejs/                 # Lógica compartida entre funciones Lambda
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
│   └── utils/                  # Utilidades generales para el proyecto
│
├── tests/                      # Pruebas de la API, funciones, etc.
│   ├── unit/                   # Pruebas unitarias
│   ├── integration/            # Pruebas de integración (interacción entre servicios)
│   └── e2e/                    # Pruebas end-to-end (funcionalidad completa)
│
├── serverless.yml              # Configuración de Serverless Framework
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Documentación del proyecto

```

## Lo que deberias saber del proyecto:
en esta sección dejaremos un par de observaciones a tener en cuenta previo a realizar cambios significativos en el proyecto:

### ¿Cómo funciona el rate limit?
Actualmente el rate limit solo está implementado para el endpoint de fusionados el cual es el encargado de usar las 2 apis
externas, funciona haciendo una consulta a la tabla de historial, esto es medianamente incorrecto ya que es posible usar la tabla
de historial, si se tuvieran todas las consultas realiadas y no unicamente las satisfactorias, pero al no ser el caso el rate limit
no se calcula "correctamente". ¿Porqué se hizo así? unicamente para ahorrar recursos y demostrar su posible implementación.

### ¿Por qué la documentación debe ser estática y no usar un plugin?
La principal razón de esto es que se opto por `httpApi` para la reducción de costos y actualmente no existe un plugin que sea compatible con `httpApi` para la implementación dinámica de documentación.

### ¿Por qué dynamoDB y no una RDS?
Esto es porque no existe la necesidad de usar una RDS debido a que no se presentan relaciones complejas o alguna otra razón
como un esquema rigido. por otro lado, dynamoDB no ofrece una escabilidad automatica y un menor costo (debido al uso) 
además del mero gusto de hacerlo así :D 

### ¿Por qué la escabilidad es bajo demanda?
Esto es principal por la razón de que no se tiene una referencia de la demanda real, patrones de acceso o una forma
correcta de calcular las lecturas y escrituras necesarias.