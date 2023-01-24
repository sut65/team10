package controller

import (

        "github.com/sut65/team10/entity"

        "github.com/gin-gonic/gin"

        "net/http"
)

//POST /users
func CreateService(c *gin.Context) {

	var typewashing entity.TypeWashing
	var delivery entity.Delivery
	var weight entity.Weight
	var service entity.Service

	//ถ้ามัน err จะบันทึกข้อมูลลงในตารางหลัก 
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", service.TypeWashing_ID).First(&typewashing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}

	// 10. ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", service.Delivery_ID).First(&delivery); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delivery not found"})
		return
	}

	// 11. ค้นหา position ด้วย id
	if tx := entity.DB().Where("id = ?", service.Weight_ID).First(&weight); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "weight not found"})
		return
	}

	// 13. สร้าง Service
	// เป็น Asynchonus รันไม่คำนึงตามบรรทัด
	sv := entity.Service{
		TypeWashing:      typewashing,               
		Delivery:   delivery,            
		Weight:     weight,             
		Address:     service.Address,              
		                       // ตั้งค่าฟิลด์ Address
	}

	if err := entity.DB().Create(&sv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sv})
}


// GET /user/:id
func GetService(c *gin.Context) {
	var service entity.Service
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM services WHERE id = ?", id).Scan(&service).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

// GET /users
func ListServices(c *gin.Context) {

	var service []entity.Service

	if err := entity.DB().Preload("TypeWashing").Preload("Delivery").Preload("Weight").Raw("SELECT * FROM services").Find(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

// DELETE /users/:id
// func DeleteUser(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		   return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// PATCH /users
// func UpdateUser(c *gin.Context) {
// 	var user entity.Service
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		   return
// 	}
// 	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		   return
// 	}
// 	if err := entity.DB().Save(&user).Error; err != nil {
// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		   return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }