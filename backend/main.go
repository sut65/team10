package main

import (
	"github.com/gin-gonic/gin"
	controllerbill "github.com/sut65/team10/controller/bill"
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
