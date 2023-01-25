package main

import (
	"github.com/gin-gonic/gin"
	controllerbill "github.com/sut65/team10/controller/bill"
	employee_controller "github.com/sut65/team10/controller/employee"
	gender_controller "github.com/sut65/team10/controller/employee"
	position_controller "github.com/sut65/team10/controller/employee"
	workshift_controller "github.com/sut65/team10/controller/employee"
	"github.com/sut65/team10/entity"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// User Routes

	// Bill
	r.GET("/bill", controllerbill.ListBills)
	r.GET("/bill/:id", controllerbill.GetBill)
	r.POST("/bills", controllerbill.CreateBill)
	r.PATCH("/bills", controllerbill.UpdateBill)
	// Paymenttype
	r.GET("/paymenttype", controllerbill.ListPaymenttypes)
	r.GET("/genders", gender_controller.ListGenders)

	//position
	r.GET("/positions", position_controller.ListPosition)

	//workshift
	r.GET("/workshifts", workshift_controller.ListWorkShift)

	//Employee
	r.POST("/employees", employee_controller.CreateEmployees)
	r.GET("/employees", employee_controller.ListEmployees)
	r.GET("/employees/:id", employee_controller.GetEmployee)
	r.PATCH("/employees", employee_controller.UpdateEmployee)
	r.DELETE("/employees/:id", employee_controller.DeleteEmployee)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()

	}

}
