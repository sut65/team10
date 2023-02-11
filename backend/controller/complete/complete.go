package controller

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/sut65/team10/entity"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"

	"net/http"
)

type extendedComplete struct {
	entity.Complete
	Name string
}

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "packaging not found"})
		return
	}

	//ค้นหาด้วย receive ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Receive_ID).First(&receive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receive not found"})
		return
	}
	///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (complete.Complete_datetime == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		com := entity.Complete{
			Model:             gorm.Model{ID: complete.ID},
			Employee:          employee,
			Receive:           receive,
			Packaging:         packaging,
			Complete_datetime: time.Time{},
	
		}
		if _, err := govalidator.ValidateStruct(com); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		} else {
	//create entity customer
	com := entity.Complete{
		Model:             gorm.Model{ID: complete.ID},
		Employee:          employee,
		Receive:           receive,
		Packaging:         packaging,
		Complete_datetime: complete.Complete_datetime.Local(),
	}

	if _, err := govalidator.ValidateStruct(com); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&com).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": com})
   }
}

// GET /Complete/:id
func GetComplete(c *gin.Context) {
	var complete entity.Complete
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM completes WHERE id = ?", id).Scan(&complete).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": complete})
}

func GetEmployeeName(c *gin.Context) {
	var complete entity.Complete
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM completes WHERE id = ?", id).Scan(&complete).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": complete})
}

// GET /Complete

func ListComplete(c *gin.Context) {

	var completes []extendedComplete

	if err := entity.DB().Preload("Employees").Preload("Packagings").Preload("Receives").Preload("Completes").Raw("SELECT c.* , e.name FROM completes c JOIN employees e GROUP BY c.id").Scan(&completes).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": completes})

}

// DELETE /complete/:id

func DeleteComplete(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM completes WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Complete
func UpdateComplete(c *gin.Context) {

	var complete entity.Complete
	var packaging entity.Packaging
	var receive entity.Receive
	var employee entity.Employee

	if err := c.ShouldBindJSON(&complete); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	var updatedatetime = complete.Complete_datetime
    ///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (complete.Complete_datetime == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		updatecom := entity.Complete{
			Model:             gorm.Model{ID: complete.ID},
			Employee:          employee,
			Receive:           receive,
			Packaging:         packaging,
			Complete_datetime: time.Time{},
	
		}
		if _, err := govalidator.ValidateStruct(updatecom); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
	//ค้นหา packaging ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Packaging_ID).First(&packaging); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "packaging not found"})
		return
	}
	//ค้นหา receive ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Receive_ID).First(&receive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receive not found"})
		return
	}
	//ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", complete.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	//ค้นหา complete ด้วย id
	if tx := entity.DB().Where("id = ?", complete.ID).First(&complete); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})
		return
	}

	//update entity complete
	updatecom := entity.Complete{
		Model:             gorm.Model{ID: complete.ID},
		Employee:          employee,
		Receive:           receive,
		Packaging:         packaging,
		Complete_datetime: updatedatetime.Local(),

	}

	if _, err := govalidator.ValidateStruct(updatecom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//update complete
	if err := entity.DB().Save(&updatecom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updatecom})
	}
}
