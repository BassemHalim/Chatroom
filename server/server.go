package main

import (
	"log"
	"parler/controller"
	"parler/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	router := gin.Default()
	db.ConnectDatabase()

	router.POST("/chat", controller.PostMessage)
	router.GET("/chat", controller.GetMessages)
	router.POST("/auth/signup", controller.CreateUser)
	router.POST("/auth/login", controller.Login)

	router.Run("localhost:8080")
}
