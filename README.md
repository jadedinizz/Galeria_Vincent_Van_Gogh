# 🎨 Galeria Vincent Van Gogh

Uma **galeria de imagens com filtros** das obras de Vincent van Gogh, onde o usuário pode navegar pelas pinturas organizadas por gênero, visualizar detalhes em modal e explorar os trabalhos do artista de forma simples e intuitiva.

---

## 📌 Objetivo
- Criar uma galeria de imagens com categorias filtráveis.  
- Aplicar um efeito **hover** nas imagens para exibir título/ano da obra.  
- Criar um **modal** para visualizar a imagem em tamanho maior.  
- Implementar **CRUD** (Create, Read, Update, Delete) para gerenciamento das obras.  
- Conectar a aplicação a um **banco de dados relacional** (PostgreSQL).  
- Organizar templates e arquivos estáticos de forma clara e reutilizável.  

---

## ✨ Funcionalidades Principais
- ✅ Exibição das obras em galeria (grid de imagens).  
- ✅ Filtros por categoria (autoretrato, retrato, flores, natureza morta e paisagem).  
- ✅ Efeito hover para exibir título/ano da obra.  
- ✅ Modal para ampliar a imagem e mostrar detalhes.  
- ✅ CRUD das obras no sistema (título, imagem, data e gênero).  

---

## ⚙️ Requisitos Técnicos
- **Backend**: Django.  
- **Banco de Dados**: PostgreSQL.  
- **Frontend**: HTML, CSS, JavaScript.  
- **Templates e Static**: organizados em pastas separadas.  
- **Armazenamento de imagens**: via `ImageField` em Django.  

---

## Estrutura do monorepo

```text
.
├── backend/
│   ├── core/                    # Modelos, views, formulários e migrações
│   ├── galeria_vincent_van_gogh/  # Configuração e rotas do Django
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── templates/core/          # Páginas HTML renderizadas pelo Django
│   └── static/core/             # CSS e JavaScript
└── docker-compose.yml           # Django e PostgreSQL
```

O Django carrega os templates e os arquivos estáticos de `frontend/`.
O frontend é servido pelo próprio Django e não precisa de um processo de build.

## Como rodar com Docker

Na raiz do repositório, copie `.env.example` para `.env` e preencha
`POSTGRES_PASSWORD` e `DJANGO_SECRET_KEY`. Para reutilizar um volume
PostgreSQL existente, informe a senha já configurada nessa instância.
Depois, execute:

```sh
docker compose up --build -d
docker compose exec web python manage.py migrate
```

Acesse [http://localhost:8001/](http://localhost:8001/). Para criar uma conta
administrativa, execute `docker compose exec web python manage.py createsuperuser`
e acesse [http://localhost:8001/admin/](http://localhost:8001/admin/).
Cadastre os gêneros no admin antes de adicionar obras pela galeria.

## Como rodar sem Docker

Na raiz do repositório, crie e ative um ambiente virtual. Com um banco
PostgreSQL já criado, exporte `POSTGRES_DB`, `POSTGRES_USER`,
`POSTGRES_PASSWORD`, `POSTGRES_HOST` e `POSTGRES_PORT` com os dados da sua
instância. Exporte também `DJANGO_SECRET_KEY` com uma chave para o Django.
Em seguida, execute:

```sh
python -m pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/manage.py runserver 8001
```

Os uploads ficam em `backend/media/` ou no volume de mídia do Docker.
