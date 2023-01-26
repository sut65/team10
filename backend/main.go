package main

import (
	"github.com/gin-gonic/gin"
	controllerbill "github.com/sut65/team10/controller/bill"
	controllercomplete "github.com/sut65/team10/controller/complete"
	controllerconfirmation "github.com/sut65/team10/controller/confirmation"
	employee_controller "github.com/sut65/team10/controller/employee"
	gender_controller "github.com/sut65/team10/controller/employee"
	position_controller "github.com/sut65/team10/controller/employee"
	workshift_controller "github.com/sut65/team10/controller/employee"
	FormType_controller "github.com/sut65/team10/controller/form"
	Form_controller "github.com/sut65/team10/controller/form"
	Satisfaction_controller "github.com/sut65/team10/controller/form"
	controllerpromotion "github.com/sut65/team10/controller/promotion"
	brand_controller "github.com/sut65/team10/controller/stock"
	size_controller "github.com/sut65/team10/controller/stock"
	stock_controller "github.com/sut65/team10/controller/stock"
	type_controller "github.com/sut65/team10/controller/stock"
	Service_controller "github.com/sut65/team10/controller/service"
	WashingType_controller "github.com/sut65/team10/controller/service"
	Weight_controller "github.com/sut65/team10/controller/service"
	DeliveryType_controller "github.com/sut65/team10/controller/service"
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
	// --Paymenttype
	r.GET("/paymenttype", controllerbill.ListPaymenttypes)
	r.GET("/genders", gender_controller.ListGenders)

	// Promotion
	r.GET("/promotion", controllerpromotion.ListPromotions)
	r.GET("/promotion/:id", controllerpromotion.GetPromotion)
	r.POST("/promotions", controllerpromotion.CreatePromotion)
	r.PATCH("/promotions", controllerpromotion.UpdatePromotion)
	//--codetype
	r.GET("/codetype", controllerpromotion.ListCodetypes)
	//--reason
	r.GET("/reason", controllerpromotion.ListReasons)
	//--quotacode
	r.GET("/quotacode", controllerpromotion.ListQuotacode)
	r.PATCH("/quotacodes", controllerpromotion.UpdatePromotion)

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

	//types
	r.GET("/types", type_controller.ListTypes)

	//sizes
	r.GET("/sizes", size_controller.ListSizes)

	//brand
	r.GET("/brands", brand_controller.ListBrands)

	//Stock
	r.POST("/stocks", stock_controller.CreateStocks)
	r.GET("/stocks", stock_controller.ListStock)
	r.GET("/stocks/:id", stock_controller.GetStock)
	r.PATCH("/stocks", stock_controller.UpdateStock)
	r.DELETE("/stocks/:id", stock_controller.DeleteStock)

	// Confirmation
	r.GET("/confirmation", controllerconfirmation.ListConfirmations)
	r.GET("/confirmation/:id", controllerconfirmation.GetConfirmation)
	r.POST("/confirmations", controllerconfirmation.CreateConfirmation)
	r.PATCH("/confirmations", controllerconfirmation.UpdateConfirmation)
	r.GET("/c_complete", controllerconfirmation.ListComplete)

	// Recvtype
	r.GET("/recvtype", controllerconfirmation.ListRecvType)

	//Complete
	r.GET("/complete", controllercomplete.ListComplete)

	//Form
	r.GET("/forms", Form_controller.ListForms)
	r.GET("/form/:id", Form_controller.GetForm)
	r.POST("/forms", Form_controller.CreateForm)
	r.DELETE("/forms/:id", Form_controller.DeleteForm)
	r.PATCH("/forms", Form_controller.UpdateForm)

	//Form_Type
	r.GET("/formtypes", FormType_controller.ListFormTypes)
	r.GET("/formtype/:id", FormType_controller.GetFormType)
	r.POST("/formtypes", FormType_controller.CreateFormType)

	//Satisfaction
	r.GET("/satisfactions", Satisfaction_controller.ListSatisfactions)
	r.GET("/satisfaction/:id", Satisfaction_controller.GetSatisfaction)
	r.POST("/satisfactions", Satisfaction_controller.CreateSatisfaction)

	//service
	r.GET("/services", Service_controller.ListServices)
	r.GET("/service/:id", Service_controller.GetService)
	r.POST("/services", Service_controller.CreateService)
	r.DELETE("/services/:id", Service_controller.DeleteService)
	r.PATCH("/services", Service_controller.UpdateService)

	//washingType
	r.GET("/washingtypes", WashingType_controller.ListTypeWashings)
	r.GET("/washingtype/:id", WashingType_controller.GetTypeWashing)
	r.POST("/washingtypes", WashingType_controller.CreateTypeWashings)

	//weight
	r.GET("/weights", Weight_controller.ListWeights)
	r.GET("/weight/:id", Weight_controller.GetWeight)
	r.POST("/weights", Weight_controller.CreateWeights)

	//deliverytype
	r.GET("/deliverytypes", DeliveryType_controller.ListDeliverys)
	r.GET("/deliverytypes/:id", DeliveryType_controller.GetDelivery)
	r.POST("/deliverytypes", DeliveryType_controller.CreateDeliverys)
	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()

	}

}
