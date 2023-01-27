package controller

import (
	"github.com/sut65/team10/entity"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

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

	// Encrypt Password Before save to database
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(customers.Customer_Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	//create entity customer
	cus := entity.Customer{
		Model:              gorm.Model{ID: customers.ID},
		Gender:             gender,
		Advertise:          advertise,
		Career:             career,
		Customer_Name:      customers.Customer_Name,
		Customer_Username:  customers.Customer_Username,
		Customer_Phone:     customers.Customer_Phone,
		Customer_Promptpay: customers.Customer_Promptpay,
		Customer_Password:  string(hashPassword),
		Customer_Address:   customers.Customer_Address,
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

	if err := entity.DB().Raw("SELECT * FROM customers WHERE id = ?", id).Scan(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

// GET /Customer

func ListCustomer(c *gin.Context) {
	var customers []entity.Customer
	if err := entity.DB().Raw("SELECT * FROM customers").Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": customers})
}

// DELETE /Customer/:id

func DeleteCustomer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM customers WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Customer

func UpdateCustomer(c *gin.Context) {

	var customers entity.Customer
	var gender entity.Gender
	var advertise entity.Advertise
	var career entity.Career

	if err := c.ShouldBindJSON(&customers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	var updateCustomer_Username = customers.Customer_Username
	var updateCustomer_Name = customers.Customer_Name
	var updateCustomer_Password = customers.Customer_Password
	var updateCustomer_Phone = customers.Customer_Phone
	var updateCustomer_Prompay = customers.Customer_Promptpay
	var updateCustomer_Address = customers.Customer_Address

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
	//ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", customers.ID).First(&customers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	//update entity customer
	updatecus := entity.Customer{
		Model:              gorm.Model{ID: customers.ID},
		Gender:             gender,
		Advertise:          advertise,
		Career:             career,
		Customer_Name:      updateCustomer_Name,
		Customer_Username:  updateCustomer_Username,
		Customer_Phone:     updateCustomer_Phone,
		Customer_Promptpay: updateCustomer_Prompay,
		Customer_Password:  updateCustomer_Password,
		Customer_Address:   updateCustomer_Address,
	}
	//update customer
	if err := entity.DB().Save(&updatecus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updatecus})

}
