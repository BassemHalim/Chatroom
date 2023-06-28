package models

import "github.com/google/uuid"

type User struct {
	Uid uuid.UUID `json:"uid" gorm:"type:uuid;primary_key;"`
	Username string `json:"username" gorm:"not null;size:255;unique"`
	Email string `json:"email" gorm:"uniqueIndex;not null;size:255;unique"`
	Password string `json:"pwd" gorm:"not null"`
}

