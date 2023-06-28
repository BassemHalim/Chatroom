package models

import "time"

type Message struct {
	AuthorID string `json:"author_id" gorm:"primaryKey"`
	Content  string `json:"content"`
	Votes    int    `json:"votes"`
	CreatedAt time.Time `json:"created_at"`
}
