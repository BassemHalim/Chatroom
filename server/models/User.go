package models

import (
	"github.com/google/uuid"
)

type User struct {
	ID       uuid.UUID `json:"uid" `
	Username string    `json:"username" gorm:"not null;size:255;unique"`
	Email    string    `json:"email" gorm:"uniqueIndex;not null;size:255"`
	Password string    `json:"pwd" gorm:"not null"`
}
