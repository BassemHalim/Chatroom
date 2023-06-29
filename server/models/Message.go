package models

import (
	"time"
)

type Message struct {
	ID        uint      `json:"id"  `
	Username  string    `json:"username"`
	Content   string    `json:"content"`
	Votes     int       `json:"votes"`
	CreatedAt time.Time `json:"created_at"`
}
