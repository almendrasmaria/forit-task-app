# 📝 Task App - Next.js

Es una aplicación web de lista de tareas que permite **crear, visualizar, editar y eliminar tareas**, desarrollada con **Next.js**.  
La aplicación consume una **API REST** integrada que maneja las tareas en memoria y ofrece un flujo completo de operaciones CRUD.

## Capturas de pantalla
<img width="1503" height="639" alt="image" src="https://github.com/user-attachments/assets/fb3927ae-deba-4eba-832e-44c94703608e" />
<img width="1446" height="670" alt="Crear tarea" src="https://github.com/user-attachments/assets/741eea70-ae1c-45fa-b464-af795a401065" />
<img width="1427" height="679" alt="Editar tarea" src="https://github.com/user-attachments/assets/ba60add2-5ff4-4e28-82df-41c446dca084" />

## Clonar el repositorio

```bash
git clone https://github.com/almendrasmaria/forit-task-app
cd forit-task-app
```

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```
## API Endpoints

| Método | Endpoint         | Descripción            |
|--------|------------------|------------------------|
| GET    | /api/tasks       | Obtener todas las tareas |
| POST   | /api/tasks       | Crear una nueva tarea  |
| PUT    | /api/tasks/:id   | Actualizar una tarea   |
| DELETE | /api/tasks/:id   | Eliminar una tarea     |

## Build

```bash
pnpm build
pnpm start
```
