package controller

import (
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /bills

func CreateBill(c *gin.Context) {
	var bill entity.Bill
	var quotacode entity.QuotaCode
	var paymenttype entity.Paymenttype
	var service entity.Service

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา Service ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Service_ID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//10: ค้นหา Quota ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.QuotaCode_ID).First(&quotacode); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//11: ค้นหา Paymenttype ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Paymenttype_ID).First(&paymenttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}
	//12: สร้าง
	b := entity.Bill{
		Service_ID:     bill.Service_ID,
		QuotaCode_ID:   bill.QuotaCode_ID,
		Paymenttype_ID: bill.Paymenttype_ID,
		Bill_Price:     bill.Bill_Price,
		Time_Stamp:     bill.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//13: บันทึก
	if err := entity.DB().Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": b})

}

// GET /bill/:id

func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bills WHERE id = ?", id).Scan(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// GET /bills

func ListBills(c *gin.Context) {
	var bill []entity.Bill
	if err := entity.DB().Preload("Service.Customer").Preload("QuotaCode").Preload("Paymenttype").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// PATCH /bills

func UpdateBill(c *gin.Context) {
	var bill entity.Bill

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง
	u_b := entity.Bill{
		Paymenttype_ID: bill.Paymenttype_ID,
		Service_ID:     bill.Service_ID,
		Time_Stamp:     bill.Time_Stamp.Local(),
	}

	if err := entity.DB().Where("id = ?", bill.ID).Updates(&u_b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u_b})

}
