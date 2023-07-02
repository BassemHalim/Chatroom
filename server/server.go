package main

import (
	"log"
	"parler/config"
	"parler/controller"
	"parler/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}

	err = config.ConnectDatabase()
	if err != nil {
		log.Fatalf("Failed to connect to DB")
		return
	}

	var router = gin.Default()

	router.Use(middlewares.CORSMiddleware())
	apiRoute := router.Group("/api/v1/")
	public := apiRoute.Group("/auth")
	public.POST("/login", controller.Login)
	public.POST("/signup", controller.CreateUser)

	protected := apiRoute
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.POST("/chat", controller.PostMessage)
	protected.GET("/chat", controller.GetMessages)
	protected.POST("/chat/vote", controller.Vote)

	channel := config.CreateSocket()
	protected.GET("/ws", func(c *gin.Context) {
		channel.HandleRequest(c.Writer, c.Request)
	})

	router.Run(":8080")
}
