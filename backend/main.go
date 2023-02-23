package main

import (
	"github.com/gin-gonic/gin"
	controllerbill "github.com/sut65/team10/controller/bill"
	Packging_controller "github.com/sut65/team10/controller/complete"
	controllercomplete "github.com/sut65/team10/controller/complete"
	controllerconfirmation "github.com/sut65/team10/controller/confirmation"
	controllercustomer "github.com/sut65/team10/controller/customer"
	delivery_controller "github.com/sut65/team10/controller/delivery"
	employee_controller "github.com/sut65/team10/controller/employee"
	gender_controller "github.com/sut65/team10/controller/employee"
	position_controller "github.com/sut65/team10/controller/employee"
	workshift_controller "github.com/sut65/team10/controller/employee"
	FormType_controller "github.com/sut65/team10/controller/form"
	Form_controller "github.com/sut65/team10/controller/form"
	Satisfaction_controller "github.com/sut65/team10/controller/form"
	login_controller "github.com/sut65/team10/controller/login"
	controllerpromotion "github.com/sut65/team10/controller/promotion"
	controllerdetergent "github.com/sut65/team10/controller/receive"
	controllerreceive "github.com/sut65/team10/controller/receive"
	controllersoftener "github.com/sut65/team10/controller/receive"
	DeliveryType_controller "github.com/sut65/team10/controller/service"
	Service_controller "github.com/sut65/team10/controller/service"
	WashingType_controller "github.com/sut65/team10/controller/service"
	Weight_controller "github.com/sut65/team10/controller/service"
	brand_controller "github.com/sut65/team10/controller/stock"
	size_controller "github.com/sut65/team10/controller/stock"
	stock_controller "github.com/sut65/team10/controller/stock"
	type_controller "github.com/sut65/team10/controller/stock"
	controllerbrand_vehicles "github.com/sut65/team10/controller/vehicle"
	controllerengines "github.com/sut65/team10/controller/vehicle"
	controllervehicle "github.com/sut65/team10/controller/vehicle"

	"github.com/sut65/team10/entity"
	middlewares "github.com/sut65/team10/middlewares"
)

func main() {

	entity.SetupDatabase()
	entity.SetSpecialCharactersValidation()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//SignIn
	r.POST("/Clogin", login_controller.CLogin)
	r.POST("/Elogin", login_controller.ELogin)

	//SignUp
	// r.GET("/customer", controllercustomer.ListCustomer)
	// r.GET("/customer/:id", controllercustomer.GetCustomer)
	r.POST("/customers", controllercustomer.CreateCustomer)
	r.GET("/careers", controllercustomer.ListCareer)
	r.GET("/advertises", controllercustomer.ListAdvertise)
	r.GET("/genders", gender_controller.ListGenders)

	router := r.Group("")
	{
		p := router.Use(middlewares.Authorizes())
		{
			// Customer
			p.GET("/customer/:id", controllercustomer.GetCustomer)
			p.PATCH("/customers", controllercustomer.UpdateCustomer)
			// Bill
			p.GET("/bill", controllerbill.ListBills)
			p.GET("/bill/:id", controllerbill.GetBill)
			p.POST("/bills", controllerbill.CreateBill)
			p.PATCH("/bills", controllerbill.UpdateBill)

			p.GET("/bills/:id", controllerbill.ListBills_Customer)
			p.GET("/b_services/:id", controllerbill.ListServiceBill)
			p.GET("/bill_serviceupdate/:id", controllerbill.ListBills_ServiceID)
			// --Paymenttype
			p.GET("/paymenttype", controllerbill.ListPaymenttypes)

			// Promotion
			p.GET("/promotion", controllerpromotion.ListPromotions)
			p.GET("/promotion/:id", controllerpromotion.GetPromotion)
			p.POST("/promotions", controllerpromotion.CreatePromotion)
			p.PATCH("/promotions", controllerpromotion.UpdatePromotion)
			p.DELETE("/promotions/:id", controllerpromotion.DeletePromotion)
			//--codetype
			p.GET("/codetype", controllerpromotion.ListCodetypes)
			//--reason
			p.GET("/reason", controllerpromotion.ListReasons)
			//--quotacode
			p.GET("/quotacode", controllerpromotion.ListQuotacode)      //Unuse Quotacode
			p.GET("/quotacodes", controllerpromotion.ListQuotacodefull) //Full
			p.PATCH("/quotacodes", controllerpromotion.UpdatePromotion)

			//position
			p.GET("/positions", position_controller.ListPosition)

			//workshift
			p.GET("/workshifts", workshift_controller.ListWorkShift)

			//Employee
			p.POST("/employees", employee_controller.CreateEmployees)
			p.GET("/employees", employee_controller.ListEmployees)
			p.GET("/employees/:id", employee_controller.GetEmployee)
			p.PATCH("/employees", employee_controller.UpdateEmployee)
			p.DELETE("/employees/:id", employee_controller.DeleteEmployee)

			//types
			p.GET("/types", type_controller.ListTypes)

			//sizes
			p.GET("/sizes", size_controller.ListSizes)

			//brand
			p.GET("/brands", brand_controller.ListBrands)

			//Stock
			p.POST("/stocks", stock_controller.CreateStocks)
			p.GET("/stocks", stock_controller.ListStock)
			p.GET("/stocks/:id", stock_controller.GetStock)
			p.PATCH("/stocks", stock_controller.UpdateStock)
			// p.GET("/stocks/:id", stock_controller.AddStock)

			// Confirmation
			p.GET("/confirmations", controllerconfirmation.ListConfirmations)
			p.GET("/confirmation/:id", controllerconfirmation.GetConfirmation)
			p.POST("/confirmations", controllerconfirmation.CreateConfirmation)
			p.PATCH("/confirmations", controllerconfirmation.UpdateConfirmation)
			p.GET("/confirmations/:id", controllerconfirmation.ListConfirmationsByID)
			p.GET("/c_complete/:id", controllerconfirmation.ListComplete)

			// Recvtype
			p.GET("/recvtype", controllerconfirmation.ListRecvType)

			// Receive
			p.GET("/receive", controllerreceive.ListReceives)
			p.GET("/receive/:id", controllerreceive.GetReceive)
			p.POST("/receives", controllerreceive.CreateReceive)
			p.PATCH("/receives", controllerreceive.UpdateReceive)
			p.DELETE("/receive/:id", controllerreceive.DeleteReceive)

			p.GET("/receivebillstate", controllerreceive.ListReceiveBillState)
			//detergent
			p.GET("/detergents", controllerdetergent.ListDetergents)

			//softener
			p.GET("/softeners", controllersoftener.ListSofteners)

			// Vehicle
			p.GET("/vehicle", controllervehicle.ListVehicles)
			p.GET("/vehicle/:id", controllervehicle.GetVehicle)
			p.POST("/vehicle", controllervehicle.CreateVehicle)
			p.PATCH("/vehicle", controllervehicle.UpdateVehicle)
			p.DELETE("/vehicle/:id", controllervehicle.DeleteVehicle)

			// p.GET("/vehicle/:id", controllervehicle.GetVehicleUpdate)
			//brandvehicle
			p.GET("/brand_vehicles", controllerbrand_vehicles.ListBrand_Vehicles)
			p.GET("/brand_vehicle/:id", controllerbrand_vehicles.GetBrand_Vehicle)

			//engine
			p.GET("/engines", controllerengines.ListEngines)
			p.GET("/engine/:id", controllerengines.GetEngine)

			//service
			p.GET("/services", Service_controller.ListServices)
			p.GET("/s_service/:id", Service_controller.ListServiceByUID)
			p.GET("/service/:id", Service_controller.GetService)
			p.POST("/services", Service_controller.CreateService)
			p.DELETE("/services/:id", Service_controller.DeleteService)
			p.PATCH("/services", Service_controller.UpdateService)

			// p.GET("services/customer/:id", Service_controller.ListServiceByUID)

			//washingType
			p.GET("/typewashings", WashingType_controller.ListTypeWashings)
			p.GET("/typewashing/:id", WashingType_controller.GetTypeWashing)
			p.POST("/typewashings", WashingType_controller.CreateTypeWashings)

			//weight
			p.GET("/weights", Weight_controller.ListWeights)
			p.GET("/weight/:id", Weight_controller.GetWeight)
			p.POST("/weights", Weight_controller.CreateWeights)

			//deliverytype
			p.GET("/deliverytypes", DeliveryType_controller.ListDeliverys)
			p.GET("/deliverytypes/:id", DeliveryType_controller.GetDelivery)
			p.POST("/deliverytypes", DeliveryType_controller.CreateDeliverys)

			//complete
			r.GET("/completes", controllercomplete.ListComplete)
			r.GET("/complete/:id", controllercomplete.GetComplete)
			r.POST("/completes", controllercomplete.CreateComplete)
			r.PATCH("/completes", controllercomplete.UpdateComplete)
			r.DELETE("/completes/:id", controllercomplete.DeleteComplete)

			//packagink
			r.GET("/packagings", Packging_controller.ListPackaging)
			r.GET("/packaging/:id", Packging_controller.GetPackaging)
			r.POST("/packagings", Packging_controller.CreatePackaging)
			r.DELETE("/packagings/:id", Packging_controller.DeletePackaging)

			//Form
			p.GET("/forms", Form_controller.ListForms)
			p.GET("/f_form/:id", Form_controller.ListFormByUID)
			p.GET("/form/:id", Form_controller.GetForm)
			p.POST("/forms", Form_controller.CreateForm)
			p.DELETE("/forms/:id", Form_controller.DeleteForm)
			p.PATCH("/forms", Form_controller.UpdateForm)

			//Form_Type
			p.GET("/formtypes", FormType_controller.ListFormTypes)
			p.GET("/formtype/:id", FormType_controller.GetFormType)
			p.POST("/formtypes", FormType_controller.CreateFormType)

			//Satisfaction
			p.GET("/satisfactions", Satisfaction_controller.ListSatisfactions)
			p.GET("/satisfaction/:id", Satisfaction_controller.GetSatisfaction)

			p.GET("/deliverys/:id", delivery_controller.GetDelivery)
			p.GET("/deliveries/:id", delivery_controller.ListDeliveriesByID)
			p.POST("/delivery", delivery_controller.CreateDelivery)

		}
	}
	r.Run() // Run the server
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
//	p.ไม่ให้คนอืน ทำอะไรกับข้อมูลเรา
