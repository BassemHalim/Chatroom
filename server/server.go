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
	// router.Use(middlewares.RequestLogger())


	router.Use(middlewares.CORSMiddleware())
	public := router.Group("/auth")
	public.POST("/login", controller.Login)
	public.POST("/signup", controller.CreateUser)

	protected := router.Group("api")
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.POST("/chat", controller.PostMessage)
	protected.GET("/chat", controller.GetMessages)
	protected.POST("/chat/vote", controller.Vote)

	router.Run("localhost:8080")
}
