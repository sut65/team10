package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /users
func ListPaymenttypes(c *gin.Context) {
	var Paymenttype []entity.Paymenttype
	if err := entity.DB().Raw("SELECT * FROM paymenttypes").Scan(&Paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Paymenttype})

}
