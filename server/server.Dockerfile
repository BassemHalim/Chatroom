# syntax=docker/dockerfile:1

FROM golang:1.19

WORKDIR /app

COPY . .

# download dependencies
RUN go mod download

RUN go build -o server server.go

EXPOSE 8080

CMD ["./server"]
