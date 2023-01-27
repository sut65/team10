package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Packaging

func CreatePackaging(c *gin.Context) {
	var packagings entity.Packaging
	if err := c.ShouldBindJSON(&packagings); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	if err := entity.DB().Create(&packagings).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": packagings})

}

// GET /Packaging/:id
func GetPackaging(c *gin.Context) {
	var packaging entity.Packaging
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM packagings WHERE id = ?", id).Scan(&packaging).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": packaging})
}

// GET /Complete

func ListPackaging(c *gin.Context) {
	var packagings []entity.Packaging
	if err := entity.DB().Raw("SELECT * FROM packagings").Find(&packagings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": packagings})
}

// DELETE /Packaging/:id

func DeletePackaging(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM packagings WHERE id = ?", id); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "packaging not found"})

		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Packaging

// func UpdatePackaging(c *gin.Context) {

// 	var packaging entity.Packaging

// 	if err := c.ShouldBindJSON(&packaging); err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	if tx := entity.DB().Where("id = ?", packaging.Packaging_ID).First(&packaging); tx.RowsAffected == 0 {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "packaging not found"})

// 		   return

// 	}
// 	if err := entity.DB().Save(&packaging).Error; err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": packaging})

// }
