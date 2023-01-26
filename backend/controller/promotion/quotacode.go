package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /users
func ListQuotacode(c *gin.Context) {
	var quotacode []entity.QuotaCode
	if err := entity.DB().Raw("SELECT * FROM Quotacodes").Scan(&quotacode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": quotacode})

}
