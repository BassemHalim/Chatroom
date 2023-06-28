package controller

import (
	"net/http"
	"net/mail"
	"parler/db"
	"parler/models"
	token "parler/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type CreateUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var request LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// verify email
	_, err := mail.ParseAddress(request.Email)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// get user info
	var user models.User
	err = db.DB.Where("email = ?", request.Email).Take(&user).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	// validate password
	if !doPasswordsMatch(user.Password, request.Password) {
		c.Status(http.StatusUnauthorized)
		return
	}
	// passwords match generate token
	token, err := token.GenerateToken(user.ID)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})

}

func CreateUser(c *gin.Context) {
	var request CreateUserRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "missing required fields"})
		return
	}
	//validate email
	_, err := mail.ParseAddress(request.Email)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// check for unique email and username
	var users []models.User
	res := db.DB.Where("email = ?", request.Email).Find(&users)
	if res.RowsAffected != 0 {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"error": "email already used"})
		return
	}

	res = db.DB.Where("username = ?", request.Username).Find(&users)
	if res.RowsAffected != 0 {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"error": "username already used"})
		return
	}

	var pwdBytes = []byte(request.Password)
	hashedPasswordBytes, err := bcrypt.
		GenerateFromPassword(pwdBytes, bcrypt.MinCost)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	user := models.User{
		Email:    request.Email,
		Username: request.Username,
		Password: string(hashedPasswordBytes),
		ID:       uuid.New()}
		
	db.DB.Create(&user)

	// generate jwt token
	token, err := token.GenerateToken(user.ID)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})

}

// Check if two passwords match
func doPasswordsMatch(hashedPassword, currPassword string) bool {
	err := bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword), []byte(currPassword))
	return err == nil
}
