package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /bills

func CreateBill(c *gin.Context) {
	var bill entity.Bill
	var quotacode entity.QuotaCode
	var paymenttype entity.Paymenttype
	//var customer entity.Customer
	//var service entity.Service

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	/*9: ค้นหา Service ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Q_ID).First(&quotacode); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}*/

	//10: ค้นหา Quota ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Q_ID).First(&quotacode); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//11: ค้นหา Paymenttype ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Paymenttype_ID).First(&paymenttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}
	b := entity.Bill{

		//Customer_ID: bill.Customer_ID,
		Q_ID:           bill.Q_ID,
		Paymenttype_ID: bill.Paymenttype_ID,
		Bill_Price:     bill.Bill_Price,
		//Time_Stamp:     bill.Date.local(),
	}
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
	var bill entity.Bill
	if err := entity.DB().Raw("SELECT * FROM bills").Scan(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// PATCH /users

func UpdateBill(c *gin.Context) {
	var bill entity.Bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}
