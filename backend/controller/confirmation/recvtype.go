package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET /recvtype

func ListRecvType(c *gin.Context) {
	var recv_types []entity.RecvType
	if err := entity.DB().Raw("SELECT * FROM recv_types").Scan(&recv_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recv_types})

}
