FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY backend/requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY backend/ /code/backend/
COPY frontend/ /code/frontend/

WORKDIR /code/backend

# para dev usamos runserver
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
