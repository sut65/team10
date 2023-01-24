package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Customer

func CreateCustomer(c *gin.Context) {
	var customers entity.Customer
	var gender entity.Gender
	var advertise entity.Advertise
	var career entity.Career

	if err := c.ShouldBindJSON(&customers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	//ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", customers.Gender_ID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}
	//ค้นหา Advertise ด้วย id
	if tx := entity.DB().Where("id = ?", customers.Advertise_ID).First(&advertise); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advertise not found"})
		return
	}
	//ค้นหา Career ด้วย id
	if tx := entity.DB().Where("id = ?", customers.Career_ID).First(&career); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "career not found"})
		return
	}

	//create entity customer
	cus := entity.Customer{
		Gender:      gender,
		Advertise: advertise,
		Career: career,
		Customer_Name: customers.Customer_Name,
		Customer_Username: customers.Customer_Username,
		Customer_Phone: customers.Customer_Phone,
		Customer_Promptpay: customers.Customer_Promptpay,
		Customer_Password: customers.Customer_Password,
		Customer_Address: customers.Customer_Address,
	}
	//save customer
	if err := entity.DB().Create(&cus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cus})

}

// GET /Customer/:id
func GetCustomer(c *gin.Context) {
	var customer entity.Customer

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM cutomers WHERE id = ?", id).Scan(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

// GET /Customer

func ListCustomers(c *gin.Context) {
	var customers []entity.Customer
	if err := entity.DB().Raw("SELECT * FROM customers").Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": customers})
}

// DELETE /Customer/:id

// func DeleteCustomer(c *gin.Context) {
//            id := c.Param("id")
//            if tx := entity.DB().Exec("DELETE FROM customers WHERE id = ?", id); tx.RowsAffected == 0 {

//                   c.JSON(http.StatusBadRequest, gin.H{"error": "custome not found"})

//                   return
//            }
//            c.JSON(http.StatusOK, gin.H{"data": id})

// }

// PATCH /Customer

// func UpdateCustomer(c *gin.Context) {

// 	var customer entity.Customer

// 	if err := c.ShouldBindJSON(&customer); err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	if tx := entity.DB().Where("id = ?", customer.Customer_ID).First(&customer); tx.RowsAffected == 0 {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": "career not found"})

// 		   return

// 	}
// 	if err := entity.DB().Save(&customer).Error; err != nil {

// 		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		   return

// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": customer})

// }
