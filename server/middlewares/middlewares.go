package middlewares

import (
	"fmt"
	"net/http"

	"parler/utils"

	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token string
		if c.Request.RequestURI == "/api/v1/ws" {
			token = c.Request.Header.Get("Sec-Websocket-Protocol")
		} else {
			token = utils.ExtractToken(c)
		}
		err := utils.TokenValid(token)
		if err != nil {
			c.String(http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}
		c.Next()
	}
}

func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(c.Request)
		c.Next()
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// FrontEnd := os.Getenv("FE_URL")

		c.Writer.Header().Set("Access-Control-Allow-Origin", "")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
