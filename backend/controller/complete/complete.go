package controller

import (
	
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Complete

func CreateComplete(c *gin.Context) {
	var complete entity.Complete
	var packaging entity.Packaging
	var receive entity.Receive
    var employee entity.Employee

	if err := c.ShouldBindJSON(&complete); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	//ค้นหาด้วย employee ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//ค้นหาด้วย packaging ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Packaging_ID).First(&packaging); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})
		return
	}

	//ค้นหาด้วย receive ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Receive_ID).First(&receive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receive not found"})
		return
	}

	//create entity complete
	com := entity.Complete{
		Employee:      employee,
		Receive: receive,
		Packaging: packaging,
		Complete_datetime: complete.Complete_datetime,
	}	
	if err := entity.DB().Create(&com).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": com})

}

// GET /Complete/:id
func GetComplete(c *gin.Context) {
	var complete entity.Complete
	id := c.Param("completes_id")

	if err := entity.DB().Raw("SELECT * FROM completes WHERE completes_id = ?", id).Scan(&complete).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": complete})
}

// GET /Complete

func ListCompletes(c *gin.Context) {
	var completes []entity.Complete
	if err := entity.DB().Raw("SELECT * FROM completes").Find(&completes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": completes})
}

// DELETE /complete/:id

// func DeleteComplete(c *gin.Context) {
//            id := c.Param("id")
//            if tx := entity.DB().Exec("DELETE FROM completes WHERE id = ?", id); tx.RowsAffected == 0 {

//                   c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})

//                   return
//            }
//            c.JSON(http.StatusOK, gin.H{"data": id})

// }

// PATCH /Complete

// func UpdateComplete(c *gin.Context) {

// 	var complete entity.Complete

// 	if err := c.ShouldBindJSON(&complete); err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	if tx := entity.DB().Where("id = ?", complete.Complete_ID).First(&complete); tx.RowsAffected == 0 {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "Complete not found"})

// 		   return

// 	}
// 	if err := entity.DB().Save(&complete).Error; err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": complete})

// }
