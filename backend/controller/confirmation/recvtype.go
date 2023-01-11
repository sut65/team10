package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET /recvtype

func ListRecvType(c *gin.Context) {
	var recvtypes []entity.RecvType
	if err := entity.DB().Raw("SELECT * FROM recvtypes").Scan(&recvtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recvtypes})

}
