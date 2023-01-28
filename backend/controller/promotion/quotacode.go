package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /Quotacodes
func ListQuotacode(c *gin.Context) {
	var quotacode []entity.QuotaCode
	if err := entity.DB().Preload("Promotion.Codetype").Raw("SELECT * FROM quota_codes WHERE bill_id = 0 GROUP BY promotion_id").Find(&quotacode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": quotacode})

}

func ListQuotacodefull(c *gin.Context) {
	var quotacode []entity.QuotaCode
	if err := entity.DB().Preload("Promotion").Preload("Bill").Raw("SELECT * FROM quota_codes").Find(&quotacode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": quotacode})

}

func UpdateQuotacode(c *gin.Context) {
	var quotacode entity.QuotaCode
	if err := c.ShouldBindJSON(&quotacode); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", quotacode.ID).First(&quotacode); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&quotacode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": quotacode})

}
