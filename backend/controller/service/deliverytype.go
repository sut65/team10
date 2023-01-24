package controller

import (

	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

//POST /users
func CreateDeliverys(c *gin.Context) {
	var deliverytype entity.DeliveryType
	if err := c.ShouldBindJSON(&deliverytype); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	if err := entity.DB().Create(&deliverytype).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": deliverytype})
}

// GET /user/:id
func GetDelivery(c *gin.Context) {
	var user entity.DeliveryType
	id := c.Param("delivery_id")
	if err := entity.DB().Raw("SELECT * FROM deliveries WHERE delivery_id = ?", id).Scan(&user).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListDeliverys(c *gin.Context) {
	var deliverytype []entity.DeliveryType
	if err := entity.DB().Raw("SELECT * FROM deliveries").Scan(&deliverytype).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": deliverytype})
}