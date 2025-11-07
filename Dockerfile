FROM node:25-alpine3.21

WORKDIR /frontend
COPY frontend/package.json .
RUN npm install
COPY frontend/ /frontend/
RUN npm run build

FROM python:3.12-bookworm

WORKDIR /server
COPY server/requirements.txt .
RUN apt-get update && apt-get install build-essential -y
RUN pip install --no-cache-dir -r requirements.txt
COPY server/ /server/
COPY --from=0 /frontend/dist /server/dist
EXPOSE 8000                              
CMD ["fastapi", "run", "./src/main.py"]
