package db

import (
	"parler/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// @TODO use .env
	dsn := "host=localhost user=postgres password=postgres dbname=go_chat port=5432 sslmode=disable TimeZone=America/Los_Angeles"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&models.User{})    // register User model
	database.AutoMigrate(&models.Message{}) // register Message model

	DB = database
}
