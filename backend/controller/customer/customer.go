package controller

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

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
		Model:              gorm.Model{ID: customers.ID},
		Gender:             gender,
		Advertise:          advertise,
		Career:             career,
		Customer_Name:      customers.Customer_Name,
		Customer_Username:  customers.Customer_Username,
		Customer_Phone:     customers.Customer_Phone,
		Customer_Promptpay: customers.Customer_Promptpay,
		Customer_Password:  customers.Customer_Password,
		Customer_Address:   customers.Customer_Address,
		Customer_Datetime:  time.Now(),
	}
	if _, err := govalidator.ValidateStruct(cus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Encrypt Password Before save to database
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(customers.Customer_Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// Assign hashpassword to Customers_Password (replace the un-hash)
	cus.Customer_Password = string(hashPassword)

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
	// debug
	// println(customer.Customer_Password)
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
	var customer entity.Customer

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cus := entity.Customer{
		Gender:             customer.Gender,
		Advertise:          customer.Advertise,
		Career:             customer.Career,
		Customer_Name:      customer.Customer_Name,
		Customer_Username:  customer.Customer_Username,
		Customer_Phone:     customer.Customer_Phone,
		Customer_Promptpay: customer.Customer_Promptpay,
		Customer_Password:  customer.Customer_Password,
		Customer_Address:   customer.Customer_Address,
		Customer_Datetime:  time.Now(),
	}
	// println(customer.Customer_Password)

	//** If customer enter the update section they need to update all of above entity
	if _, err := govalidator.ValidateStruct(cus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//** if password already hash (from getCustomer) it won't repeat hashing
	if !(customer.Customer_Password[0:7] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(customer.Customer_Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		// Assign hashpassword
		cus.Customer_Password = string(hashPassword)
	}

	if err := entity.DB().Where("id = ?", customer.ID).Updates(&cus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cus})

}
