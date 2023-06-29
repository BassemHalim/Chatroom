package controller

import (
	"encoding/json"
	"errors"
	"net/http"
	"parler/config"
	"parler/models"
	"strconv"
	"time"

	token "parler/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const MaxMsgsPerRequest = 500

type PostMessageRequest struct {
	Content string `json:"content" binding:"required"`
}

func PostMessage(c *gin.Context) {
	var request PostMessageRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	user, err := getUserByID(user_id)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	message := models.Message{Content: request.Content,
		Username:  user.Username,
		Votes:     0,
		CreatedAt: time.Now()}
	config.DB.Create(&message)
	// broadcast to all clients
	msgJson, err := json.Marshal(message)
	if err == nil {
		config.Socket.Broadcast(msgJson)
	}

	c.JSON(http.StatusOK, gin.H{"message": message})

}

func GetMessages(c *gin.Context) {
	// get limit messages starting from offset defaults to first 50 messages
	offset, err1 := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, err2 := strconv.Atoi(c.DefaultQuery("limit", "50"))
	if err1 != nil || err2 != nil || offset < 0 || limit < 0 || limit >= MaxMsgsPerRequest {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "offest and limit must be positive integers"})
		return
	}

	var messages []models.Message
	config.DB.Offset(offset).Limit(limit).Order("ID").Find(&messages)
	c.JSON(http.StatusOK, gin.H{"data": messages})

}

func getUserByID(uid uuid.UUID) (models.User, error) {
	var user models.User

	if err := config.DB.First(&user, uid).Error; err != nil {
		return user, errors.New("user not found")
	}

	return user, nil
}
