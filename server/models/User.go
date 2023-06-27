package models

type User struct {
	Uid string `json:"uid" gorm:"primaryKey"`
	Username string `json:"username"`
	Password string `json:"pwd"`
}
