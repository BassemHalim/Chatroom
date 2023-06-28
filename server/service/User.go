package service

import (
	"errors"
	"parler/db"
	"parler/models"

	"github.com/google/uuid"
)

func GetUserByID(uid uuid.UUID) (models.User, error) {
	var user models.User

	if err := db.DB.First(&user, uid).Error; err != nil {
		return user, errors.New("user not found")
	}

	return user, nil
}
