package controller

import (
	"net/http"
	"parler/db"
	"parler/models"
	"parler/service"
	"strconv"
	"time"

	token "parler/utils"

	"github.com/gin-gonic/gin"
)

const MaxMsgsPerRequest = 200

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

	user, err := service.GetUserByID(user_id)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	AuthorID := user.ID
	message := models.Message{Content: request.Content,
		UserID:    AuthorID,
		Votes:     0,
		CreatedAt: time.Now()}

	db.DB.Create(&message)
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
	db.DB.Offset(offset).Limit(limit).Find(&messages)
	c.JSON(http.StatusOK, gin.H{"data": messages})

}
