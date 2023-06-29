package controller

import (
	"errors"
	"net/http"
	"parler/config"
	"parler/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type VoteRequest struct {
	MessageID uint `json:"MessageID" binding:"required"`
	VoteType  int  `json:"VoteType" binding:"required"` // [-1:1]

}

func Vote(c *gin.Context) {
	var request VoteRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// validate vote type
	voteType := request.VoteType
	if voteType != -1 && voteType != 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "upvote:1 downvote:-1"})
		return
	}
	// check if message exists
	// validate and update vote
	err := UpdateVote(request.MessageID, voteType)
	if err != nil {
		// TODO: handle different types of errors
		c.AbortWithStatusJSON(http.StatusInternalServerError, err)
		return
	}
	c.Status(http.StatusOK)
}

func UpdateVote(id uint, typ int) error {
	if typ != 1 && typ != -1 {
		return errors.New("typ must be -1 or 1")
	}
	message := models.Message{}
	res := config.DB.Clauses(clause.Locking{Strength: "UPDATE"}).First(&message, id)
	if res.Error != nil {
		return res.Error
	}
	message.Votes += typ
	return config.DB.Save(message).Error
}
