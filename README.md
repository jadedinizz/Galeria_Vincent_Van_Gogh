# Galeria Vincent van Gogh

A galeria em React mostra obras, filtra por gênero e permite cadastrar, editar e excluir registros com imagens. O Django REST Framework expõe os dados da galeria, e o PostgreSQL armazena os registros.

## Rodar com Docker

Na raiz do repositório, copie `.env.example` para `.env` e preencha
`POSTGRES_PASSWORD` e `DJANGO_SECRET_KEY`. Para reutilizar o volume PostgreSQL
da versão anterior, informe a senha já configurada nesse banco. A opção
`--remove-orphans` remove o contêiner `web` da configuração anterior.

```sh
cp .env.example .env
# Preencha os valores no arquivo .env antes de subir os serviços.
docker compose --env-file .env -f docker/docker-compose.yml up --build -d --remove-orphans
```

O Compose aguarda o PostgreSQL, executa as migrações do Django, sobe a API e inicia
o Vite. Os serviços são voltados ao desenvolvimento local e a API aceita
alterações sem login. O painel administrativo exige autenticação.

- Galeria React em [http://localhost:5173/](http://localhost:5173/)
- API navegável em [http://localhost:8001/api/](http://localhost:8001/api/)
- Administração em [http://localhost:8001/admin/](http://localhost:8001/admin/)

Crie uma conta administrativa e cadastre pelo menos um gênero no painel antes de
adicionar obras.

```sh
docker compose --env-file .env -f docker/docker-compose.yml exec backend python manage.py createsuperuser
```

Para acompanhar os serviços ou encerrar a execução:

```sh
docker compose --env-file .env -f docker/docker-compose.yml logs -f
docker compose --env-file .env -f docker/docker-compose.yml down
```

O banco e os uploads são persistidos em volumes do Docker. Depois de editar o
código, rode novamente o comando `up --build -d --remove-orphans` para aplicar as mudanças.

## Aprender a criar a API REST

O módulo da galeria é o app Django `backend/core/`. Para acompanhar a construção
da API, siga o caminho de uma consulta a `GET /api/obras/?genero=1`:

1. **Modelos em `models.py`.** `Obra` define os campos da pintura e aponta
   para `Genero` por uma chave estrangeira. O ORM traduz as consultas para SQL.
2. **Serializadores em `serializers.py`.** `ObraSerializer` define os campos
   retornados em JSON e valida os dados de criação e edição. O campo `imagem`
   recebe o arquivo e `imagem_url` devolve o caminho usado pelo React.
3. **Serviço em `services.py`.** `listar_obras` organiza a consulta, aplica
   o filtro quando há um gênero e carrega a relação em uma única consulta.
4. **Controlador em `controladores/galeria.py`.** O `ObraViewSet` valida o
   parâmetro `genero` e chama o serviço. O `ModelViewSet` fornece as ações
   padrão de leitura, criação, atualização e exclusão.
5. **Rotas em `urls.py`.** O `DefaultRouter` transforma as ações do controlador
   em URLs. A configuração principal do Django adiciona o prefixo `/api/`.
6. **Cliente em `frontend/src/api.js`.** O React chama as rotas com `fetch`.
   Durante o desenvolvimento, o proxy do Vite encaminha `/api/` e `/media/`
   ao Django. O filtro atualiza a galeria sem recarregar a página.

| Método | Rota | Ação |
| --- | --- | --- |
| GET | `/api/generos/` | Listar gêneros |
| GET | `/api/generos/{id}/` | Consultar um gênero |
| GET | `/api/obras/?genero={id}` | Listar obras, com filtro opcional |
| POST | `/api/obras/` | Criar uma obra |
| GET | `/api/obras/{id}/` | Consultar uma obra |
| PUT / PATCH | `/api/obras/{id}/` | Substituir ou atualizar uma obra |
| DELETE | `/api/obras/{id}/` | Excluir uma obra |

Experimente consultar os gêneros, criar uma obra e depois alterar só seu título.
Substitua os IDs pelos retornados pela sua API e use o caminho de uma imagem local.

```sh
curl -i http://localhost:8001/api/generos/

curl -i -X POST http://localhost:8001/api/obras/ \
  -F 'titulo=Noite Estrelada' \
  -F 'genero=1' \
  -F 'imagem=@noite-estrelada.jpg'

curl -i -X PATCH http://localhost:8001/api/obras/1/ \
  -H 'Content-Type: application/json' \
  -d '{"titulo":"A Noite Estrelada"}'
```

O `POST` envia a imagem como `multipart/form-data` e retorna `201 Created`.
O `PATCH` aceita apenas os campos que você quer alterar e retorna `200 OK`.
Como exercício, tente consultar `/api/obras/?genero=abc` e encontre no
controlador a validação que produz a resposta `400 Bad Request`.
