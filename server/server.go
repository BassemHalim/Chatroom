package main

import (
	"parler/db"

	"github.com/gin-gonic/gin"
)


func main(){
	router := gin.Default()
	db.ConnectDatabase()


	router.Run("localhost:8080")
}