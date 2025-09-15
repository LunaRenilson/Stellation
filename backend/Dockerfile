# Usa a imagem oficial do Node.js 20 no Alpine
FROM node:20-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos de dependência primeiro (para otimizar cache)
COPY package*.json ./

# Copia o restante do código da aplicação
COPY . .

# Compila TypeScript para JavaScript
RUN npx tsc

# Expõe a porta do backend
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["npm", "start"]
