package main

import (
	"log"
	"parler/controller"
	"parler/db"
	"parler/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	db.ConnectDatabase()
	router := gin.Default()
	public := router.Group("/auth")
	public.POST("/login", controller.Login)
	public.POST("/signup", controller.CreateUser)

	protected := router.Group("api")
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.POST("/chat", controller.PostMessage)
	protected.GET("/chat", controller.GetMessages)

	router.Run("localhost:8080")
}
