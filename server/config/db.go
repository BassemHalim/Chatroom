package config

import (
	"fmt"
	"os"
	"parler/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() error {
	host := os.Getenv("DB_HOST")
	username := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	databaseName := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Los_Angeles", host, username, password, databaseName, port)
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return err
	}
	err = database.AutoMigrate(&models.User{}) // register User model
	if err != nil {
		return err
	}
	database.AutoMigrate(&models.Message{}) // register Message model
	if err != nil {
		return err
	}
	DB = database
	return nil
}
