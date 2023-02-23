package controller

import (
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

/* --- ระบบบันทึข้อมูลบุคลากร --- */

// POST /employees

func CreateEmployees(c *gin.Context) {

	var employee entity.Employee
	var gender entity.Gender
	var position entity.Position
	var workshift entity.WorkShift

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9.ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.Gender_ID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 10.ค้นหา position ด้วย id
	if tx := entity.DB().Where("id = ?", employee.Position_ID).First(&position); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "position not found"})
		return
	}

	// 11.ค้นหา workshift ด้วย id
	if tx := entity.DB().Where("id = ?", employee.WorkShift_ID).First(&workshift); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workshift not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// 12: สร้าง  employee
	emp := entity.Employee{
		Model:        gorm.Model{ID: employee.ID},
		Personal_ID:  employee.Personal_ID,
		Username:     employee.Username,
		Name:         employee.Name,
		Gender_ID:    employee.Gender_ID,
		Position_ID:  employee.Position_ID,
		WorkShift_ID: employee.WorkShift_ID,
		Phonnumber:   employee.Phonnumber,
		Address:      employee.Address,
		Password:     employee.Password,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(emp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
//แฮชนี้ป้องกันแม้แต่ช่องว่างก็เข้ารหัส
	emp.Password = string(hashPassword)
//13.บันทึก
	if err := entity.DB().Create(&emp).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": employee})

}

// GET /employee/:id 1คน
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")

	if err := entity.DB().Preload("Gender").Preload("WorkShift").Preload("Position").
		Raw("SELECT * FROM employees WHERE id = ? and deleted_at is null", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employee empทุกตัวที่ยังไม่ลบมาแสดง --ตาราง
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee

	if err := entity.DB().Preload("Gender").Preload("WorkShift").Preload("Position").
		Raw("SELECT * FROM employees where deleted_at is null").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employees})
}
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//Check if password field is not empty(update password)
	//if empty it just skip generate hash
	if employee.Password != "" {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		employee.Password = string(hashPassword)
	}

	emp := entity.Employee{
		Gender:      employee.Gender,
		Username:    employee.Username,
		Personal_ID: employee.Personal_ID,
		Name:        employee.Name,
		Position:    employee.Position,
		Phonnumber:  employee.Phonnumber,
		Address:     employee.Address,
		Password:    employee.Password,
		WorkShift:   employee.WorkShift,
	}

	if err := entity.DB().Where("id = ?", employee.ID).Updates(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emp})

}
func DeleteEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	// hard delete
	// if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
	// 	return
	// }

	// soft delete
	// UPDATE employee SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", id).Delete(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
