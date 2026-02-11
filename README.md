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

## 📂 Estrutura de Diretórios

```plaintext
GALERIA_VINCENT_VAN_GOGH/
│── core/                  # App principal (models, views, urls, templates, static)
│   ├── migrations/        
│   ├── static/core/       # Arquivos estáticos (CSS, JS)
│   │   ├── css/estilo.css
│   │   └── js/script.js
│   ├── templates/core/    # Templates HTML
│   │   ├── base.html
│   │   ├── index.html
│   │   ├── detalhe.html
│   │   ├── form_image.html
│   │   └── confirmar_delete.html
│   ├── models.py          # Tabelas adicionadas ao banco 
│   ├── views.py           # Lógica da aplicação
│   ├── urls.py
│   └── forms.py
│
│── galeria_vincent_van_gogh/   # Configurações do projeto
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
│── media/                 # Uploads das imagens das obras (docker)
│── manage.py
│── requirements.txt
│── Dockerfile
│── docker-compose.yml
│── .env
└── .gitignore
```
---

## 🎯 Expectativas do Projeto

- Aplicação funcional rodando corretamente.
- Galeria responsiva e organizada.
- Filtros funcionando sem recarregar a página (JavaScript).
- Banco conectado e funcionando.

--- 
## 🚀 Como Rodar o Projeto Localmente

**1. Clonar repositório:**
```
git clone https://github.com/jadedinizz/Galeria_Vincent_Van_Gogh.git
cd Galeria_Vincent_Van_Gogh
```
**2. Criar ambiente virtual:**
```
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```
**3. Instalar dependências:**
```
pip install -r requirements.txt
```
**4. Migrar banco de dados:**
```
python manage.py migrate
```
**5. Rodar servidor:**
```
python manage.py runserver
```
👉 Acesse em: [http://localhost:8000/index/](http://localhost:8000/index/)


