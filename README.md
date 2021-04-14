# TaskProyect-Api
https://taskservidor.herokuapp.com/

| methood | route | action |
| --- | --- | --- |
| `post` | /api/users | add users|
| `post` | /api/auth | auth user |
| `get` | /api/auth | get auth user|
| `post` | /api/proyect | add proyect |
| `get` | /api/proyect | get proyects |
| `put` | /api/proyect/:id | edit proyect |
| `delete` | /api/proyect/:id | remove proyect |
| `post` | /api/task | add task on proyect |
| `get` | /api/task | get tasks |
| `put` | /api/task/:id | edit task |
| `delete` | /api/task/:id | remove task |

```
{
        "estado": false,
        "creado": "2021-04-07T20:41:04.333Z",
        "_id": "606e1ed8f4065b00153ec624",
        "nombre": "Proyecto",
        "desc": "Descripcion del proyecto\n",
        "creador": "60321bd4e731a3001577adf9",
        "__v": 0
}
```
Create a user,authenticate it and start creating proyects and task 🙊
