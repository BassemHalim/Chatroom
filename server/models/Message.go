package models

import "time"

type Message struct {
	Content  string `json:"content"`
	AuthorID string `json:"author_id" gorm:"primaryKey"`
	Votes    int    `json:"votes"`
	CreatedAt time.Time `json:"created_at"`
}
