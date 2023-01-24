package controller

import (

	"github.com/sut65/team10/entity"
    "github.com/gin-gonic/gin"
    "net/http"

)

// POST /Advertise

func CreateAdvertise(c *gin.Context) {
	var advertise entity.Advertise
	if err := c.ShouldBindJSON(&advertise); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	if err := entity.DB().Create(&advertise).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	c.JSON(http.StatusOK, gin.H{"data": advertise})

}

// GET /Advertise/:id
func GetAdvertise(c *gin.Context) {
	var advertise entity.Advertise
	id := c.Param("advertise_id")

	if err := entity.DB().Raw("SELECT * FROM advertises WHERE advertise_id = ?", id).Scan(&advertise).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	c.JSON(http.StatusOK, gin.H{"data": advertise})
}

// GET /Advertise

func ListAdvertise(c *gin.Context) {
	var advertises []entity.Advertise
	if err := entity.DB().Raw("SELECT * FROM advertises").Scan(&advertises).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": advertises})

}

// DELETE /Advertise/:id

// func DeleteAdvertise(c *gin.Context) {
//            id := c.Param("id")
//            if tx := entity.DB().Exec("DELETE FROM advertises WHERE id = ?", id); tx.RowsAffected == 0 {

//                   c.JSON(http.StatusBadRequest, gin.H{"error": "advertise not found"})

//                   return
//            }
//            c.JSON(http.StatusOK, gin.H{"data": id})

// }

 // PATCH /Advertise

// func UpdateAdvertise(c *gin.Context) {

// 	var advertise entity.Advertise

// 	if err := c.ShouldBindJSON(&advertise); err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	if tx := entity.DB().Where("id = ?", advertise.Advertise_ID).First(&advertise); tx.RowsAffected == 0 {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "advertise not found"})

// 		   return

// 	}
// 	if err := entity.DB().Save(&advertise).Error; err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": advertise})

// }
