FROM golang:1.16-alpine

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN go build -o /petesukulelequiz

EXPOSE 8080

CMD [ "/petesukulelequiz" ]


