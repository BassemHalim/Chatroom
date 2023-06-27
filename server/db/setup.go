package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"parler/models"
)

var DB *gorm.DB

func ConnectDatabase() {
    dsn := "host=localhost user=postgres dbname=go_blog port=5432 sslmode=disable timezone="
    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})  

    if err != nil {
        panic("Failed to connect to database!")
    }

    database.AutoMigrate(&models.User{})  // register User model
    database.AutoMigrate(&models.Message{})  // register Message model

    DB = database
}