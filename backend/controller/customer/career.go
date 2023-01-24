package controller

import (

	"github.com/sut65/team10/entity"
    "github.com/gin-gonic/gin"
    "net/http"

)

// POST /Career

func CreateCareer(c *gin.Context) {
	var career entity.Career
	if err := c.ShouldBindJSON(&career); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	if err := entity.DB().Create(&career).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	c.JSON(http.StatusOK, gin.H{"data": career})

}

// GET /Career/:id
func GetCareer(c *gin.Context) {
	var career entity.Career
	id := c.Param("career_id")
	if err := entity.DB().Raw("SELECT * FROM careers WHERE career_id = ?", id).Find(&career).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": career})
}

// GET /Career

func ListCareer(c *gin.Context) {
	var careers []entity.Career
	if err := entity.DB().Raw("SELECT * FROM careers").Scan(&careers).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": careers})

}

// DELETE /Career/:id

// func DeleteCareer(c *gin.Context) {
//            id := c.Param("id")
//            if tx := entity.DB().Exec("DELETE FROM careers WHERE id = ?", id); tx.RowsAffected == 0 {

//                   c.JSON(http.StatusBadRequest, gin.H{"error": "career not found"})

//                   return
//            }
//            c.JSON(http.StatusOK, gin.H{"data": id})

// }

 // PATCH /Career

// func UpdateCareer(c *gin.Context) {

// 	var career entity.Career

// 	if err := c.ShouldBindJSON(&career); err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	if tx := entity.DB().Where("id = ?", career.Career_ID).First(&career); tx.RowsAffected == 0 {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "career not found"})

// 		   return

// 	}
// 	if err := entity.DB().Save(&career).Error; err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": career})

// }
