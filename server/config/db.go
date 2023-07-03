package config

import (
	"fmt"
	"log"
	"os"
	"parler/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() error {
	host := os.Getenv("DATABASE_HOST")
	username := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	databaseName := os.Getenv("POSTGRES_NAME")
	// dsn := fmt.Sprintf("postgres://%s:%s@localhost:5432/%s?sslmode=disable", username, password, databaseName)
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=America/Los_Angeles", host, username, password, databaseName)
	log.Print(dsn)
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
