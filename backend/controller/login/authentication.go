package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"github.com/sut65/team10/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
	UserType string `json:"usertype"`
}

// LoginResponse token response
type LoginResponse struct {
	Token    string `json:"token"`
	ID       uint   `json:"id"`
	Username string `json:"username"`
	UserType string `json:"usertype"`
}

// POST /c_login
func CLogin(c *gin.Context) {
	var payload LoginPayload
	var customer entity.Customer
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//** 3: ค้นหาด้วยเลขบัตรประชาชน(Personal_ID) */ // ตรวจสอบว่ามี Personal ID ที่กรอกมาหรือไม่
	if err := entity.DB().Raw("SELECT * FROM customers WHERE customer_username = ?", payload.Username).Scan(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(customer.Customer_Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(customer.Customer_Username)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token:    signedToken,
		ID:       customer.ID,
		Username: customer.Customer_Username,
		UserType: "customer",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /E_login
func ELogin(c *gin.Context) {
	var payload LoginPayload
	var employee entity.Employee
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//** 3: ค้นหาด้วยเลขบัตรประชาชน(Personal_ID) */ // ตรวจสอบว่ามี Personal ID ที่กรอกมาหรือไม่
	if err := entity.DB().Raw("SELECT * FROM employees WHERE username = ?", payload.Username).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(employee.Username)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token:    signedToken,
		ID:       employee.ID,
		Username: employee.Username,
		UserType: "employee",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
