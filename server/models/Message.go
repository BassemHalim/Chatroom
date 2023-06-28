package models

import (
	"time"

	"github.com/google/uuid"
)

type Message struct {
	ID     uint      `json:"id"  `
	UserID uuid.UUID `json:"author_id"`
	// User      User
	Content   string    `json:"content"`
	Votes     int       `json:"votes"`
	CreatedAt time.Time `json:"created_at"`
}
