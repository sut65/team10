package controller

import (
	"net/http"
	"time"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gorm.io/gorm"
)

// POST /bills

func CreateBill(c *gin.Context) {
	var bill entity.Bill
	var quotacode entity.QuotaCode
	var paymenttype entity.Paymenttype
	var service entity.Service

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา Service ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Service_ID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service not found"})

		return

	}

	//10: ค้นหา Quota ด้วยไอดี
	if bill.QuotaCode_ID == nil { //ถ้า QuotaCode_ID = Null
		q_q := entity.QuotaCode{ //สร้าง q_id = 0
			Model: gorm.Model{ID: 0},
		}
		bill.QuotaCode_ID = &q_q.ID //ใส่ q_id = 0 ให้ bill
	} else {
		if tx := entity.DB().Where("id = ?", bill.QuotaCode_ID).First(&quotacode); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "QuotaCode not found"})

			return

		}
	}

	//11: ค้นหา Paymenttype ด้วยไอดี
	if tx := entity.DB().Where("id = ?", bill.Paymenttype_ID).First(&paymenttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Paymenttype not found"})

		return

	}
	///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (bill.Time_Stamp == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		b := entity.Bill{
			Service_ID:     bill.Service_ID,
			QuotaCode_ID:   bill.QuotaCode_ID,
			Paymenttype_ID: bill.Paymenttype_ID,
			Bill_Price:     bill.Bill_Price,
			Receive_State:  0,
			Time_Stamp:     time.Time{},
		}
		if _, err := govalidator.ValidateStruct(b); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		// สร้างข้อมูลสำหรับเวลาที่ถูกต้อง
		b := entity.Bill{
			Service_ID:     bill.Service_ID,
			QuotaCode_ID:   bill.QuotaCode_ID,
			Paymenttype_ID: bill.Paymenttype_ID,
			Bill_Price:     bill.Bill_Price,
			Receive_State:  0,
			Time_Stamp:     bill.Time_Stamp.Local(),
		}
		if _, err := govalidator.ValidateStruct(b); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		//13: บันทึก
		if err := entity.DB().Create(&b).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		//สร้าง ข้อมูลสำหรับใช้ในการอัปเดต Quotacode ที่ถูกใช้งานโดยหมายเลขบิล
		q := entity.QuotaCode{
			Bill_ID: &b.ID,
		}

		// s := entity.Stock{
		// 	Quantity: ,
		// }
		//function สำหรับอัปเดต Quotacode
		if err := entity.DB().Where("id = ?", bill.QuotaCode_ID).Updates(&q).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		//สร้าง ข้อมูลสำหรับใช้ในการอัปเดต Bill_Status ใน Service
		s_u := entity.Service{
			Bill_status: 1,
		}

		//function สำหรับอัปเดต Bill_Status Service
		if err := entity.DB().Where("id = ?", bill.Service_ID).Updates(&s_u).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": b})
	}
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
	var bill []entity.Bill
	if err := entity.DB().Preload("Service.Customer").Preload("QuotaCode.Promotion.Codetype").Preload("Paymenttype").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// ใช้สำหรับค้นหา list ของ bill ที่ลูกค้าคนนั้นเคยเข้ามาใช้งาน
func ListBills_Customer(c *gin.Context) {
	var bill []entity.Bill
	customer_id := c.Param("id")
	if err := entity.DB().Preload("Service.Customer").Preload("QuotaCode.Promotion.Codetype").Preload("Paymenttype").Raw("SELECT bills.id,receive_state,service_id,quota_code_id,paymenttype_id,bills.bill_price,type_washing_id,delivery_type_id,weight_id,customer_id,bill_status,address,time_stamp FROM bills join services WHERE services.id = bills.id AND customer_id = ?", customer_id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// ใช้สำหรับค้นหา service_id ของลูกค้าเพื่อทำการอัพเดท
func ListBills_ServiceID(c *gin.Context) {
	var bill []entity.Bill
	service_id := c.Param("id")
	if err := entity.DB().Preload("Service.Customer").Preload("QuotaCode").Preload("Paymenttype").Raw("SELECT bills.id,receive_state,service_id,quota_code_id,paymenttype_id,bills.bill_price,type_washing_id,delivery_type_id,weight_id,customer_id,bill_status,address,time_stamp FROM bills join services WHERE services.id = bills.id AND service_id = ?", service_id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// PATCH /bills

func UpdateBill(c *gin.Context) {
	var bill entity.Bill

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (bill.Time_Stamp == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		u_b := entity.Bill{
			Paymenttype_ID: bill.Paymenttype_ID,
			Time_Stamp:     time.Time{},
		}
		if _, err := govalidator.ValidateStruct(u_b); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		if bill.Receive_State == 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "รายการของคุณได้ถูกรับรายการไปแล้วไม่สามารถแก้ไขได้ กรุณาติดต่อเจ้าหน้าที่"})
			return
		} else {
			// สร้างข้อมูลสำหรับเวลาที่ถูกต้อง
			u_b := entity.Bill{
				Paymenttype_ID: bill.Paymenttype_ID,
				Time_Stamp:     bill.Time_Stamp.Local(),
			}
			if _, err := govalidator.ValidateStruct(u_b); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			if err := entity.DB().Where("id = ?", bill.ID).Updates(&u_b).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"data": u_b})
		}
	}
}

// GET /b_services/:id
// ใช้สำหรับหา service ล่าสุดที่ลูกค้าคนนั้นสั่งบริการเข้ามา
func ListServiceBill(c *gin.Context) {
	var service []entity.Service
	customer_id := c.Param("id")
	if err := entity.DB().Preload("Customer").Raw("SELECT * FROM services WHERE customer_id = ? AND bill_status = 0 ORDER BY  services.id DESC LIMIT 1;", customer_id).Find(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": service})
}
