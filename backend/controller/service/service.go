package controller

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gorm.io/gorm"

	// "gorm.io/gorm/clause"

	"net/http"
)

type extendedService struct {
	entity.Service
	Type_washing string
	DeliveryType_service string
	Weight_net string
}

// POST /users
func CreateService(c *gin.Context) {
	var customer entity.Customer
	var typewashing entity.TypeWashing
	var deliverytype entity.DeliveryType
	var weight entity.Weight
	var service entity.Service

	//ถ้ามัน err จะบันทึกข้อมูลลงในตารางหลัก
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", service.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", service.TypeWashing_ID).First(&typewashing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}

	// 10. ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", service.DeliveryType_ID).First(&deliverytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "deliverytype not found"})
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
		Model:        gorm.Model{ID: service.ID},
		TypeWashing:  typewashing,
		DeliveryType: deliverytype,
		Weight:       weight,
		Bill_Price:   service.Bill_Price,
		Address:      service.Address,
		Bill_status:  0,
		Customer:     customer,
		Service_Time: time.Now(),
		// ตั้งค่าฟิลด์ Address
	}
	if _, err := govalidator.ValidateStruct(sv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	// if err := entity.DB().Raw("SELECT * FROM services WHERE id = ?", id).Scan(&service).Error; err != nil {
	if err := entity.DB().Raw("SELECT s.*, t.type_washing, w.weight_net, d.delivery_type_service FROM services s JOIN type_washings t JOIN weights w JOIN delivery_types d ON s.type_washing_id = t.id AND s.weight_id = w.id AND s.delivery_type_id = d.id WHERE s.id = ?", id).Scan(&service).Error; err != nil {
	// if tx := entity.DB().Preload(clause.Associations).Where("id = ?", id).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Serevice Not Found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}


func ListServices(c *gin.Context) {

	var service []extendedService

	if err := entity.DB().Preload("TypeWashing").Preload("DeliveryType").Preload("Weight").Raw("SELECT s.*,t.*,d.*,w.* FROM services s JOIN type_washings t JOIN delivery_types d JOIN weights w ON s.id = t.id AND s.id = d.id AND s.id = w.id").Find(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

func ListServiceByUID(c *gin.Context) {

	var service []extendedService
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT s.*, t.type_washing, w.weight_net, d.delivery_type_service FROM services s JOIN customers c JOIN type_washings t JOIN weights w JOIN delivery_types d ON s.customer_id = c.id AND s.type_washing_id = t.id AND s.weight_id = w.id AND s.delivery_type_id = d.id WHERE c.id = ?", id).Find(&service).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": service})

}



// DELETE /users/:id
func DeleteService(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM services WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}



// PATCH /users
func UpdateService(c *gin.Context) {
	var typewashing entity.TypeWashing
	var deliverytype entity.DeliveryType
	var weight entity.Weight
	var service entity.Service
	var customer entity.Customer

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var upAddress = service.Address
	var upBill_Price = service.Bill_Price

	if tx := entity.DB().Where("id = ?", service.TypeWashing_ID).First(&typewashing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", service.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", service.Weight_ID).First(&weight); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", service.DeliveryType_ID).First(&deliverytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typewashing not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", service.ID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	up_sv := entity.Service{
		Model:        gorm.Model{ID: service.ID},
		TypeWashing:  typewashing,
		DeliveryType: deliverytype,
		Weight:       weight,
		Address:      upAddress,
		Bill_Price: upBill_Price,
		Customer:     customer,
		// ตั้งค่าฟิลด์ Address
	}
	if _, err := govalidator.ValidateStruct(up_sv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&up_sv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": up_sv})
}

type ServiceError struct {
	msg string
}

func (e ServiceError) Error() string {
	return e.msg
}
