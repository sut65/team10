package controller

import (
	"net/http"

	// "time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gorm.io/gorm/clause"
)

// type TimeForCheck struct {
// 	DateTimeChecker time.Time `validate:"required,current_time_as_min"`
// }

// POST /confirmation
/* ---------------------------- ConfirmationUI used --------------------------- */
func CreateConfirmation(c *gin.Context) {

	var confirmation entity.Confirmation
	var recvtype entity.RecvType
	var complete entity.Complete
	var customer entity.Customer
	// var time time.Time //Time to use as DateTimeCheck

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร confirmation
	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา recvtype ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.RecvType_ID).First(&recvtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Receive Method not found"})
		return
	}

	// 10: ค้นหา complete ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Complete_ID).First(&complete); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Complete not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	/* ------ Get Input from RecvTime to other stuct (TimeForCheck) for custom validate method ----- */
	// date := TimeForCheck{
	// 	DateTimeChecker: confirmation.RecvTime.Local(),
	//}
	/* -------------------------------------------------------------------------- */
	/*                  Create New Validator That Check Datetime                  */
	/* -------------------------------------------------------------------------- */
	// validate := validator.New()
	// RegisterCurrentTimeAsMin(validate)

	// err := validate.Struct(date)
	// if err == nil {
	// 	time = date.DateTimeChecker

	// }
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "เวลาต้องไม่เป็นอดีต"})
	// 	return
	// }
	/* -------------------------------------------------------------------------- */
	/*                           End of DateTimeChecker                           */
	/* -------------------------------------------------------------------------- */

	// 12: สร้าง Confirmation
	con := entity.Confirmation{
		Complete:            complete,
		RecvType:            recvtype,                         // โยงความสัมพันธ์กับ Entity Confirmation_Type
		RecvTime:            confirmation.RecvTime,            // เซ็ทฟิลด์ RecvTime จากตัวแปร time
		DeliveryInstruction: confirmation.DeliveryInstruction, // โยงความสัมพันธ์กับ Entity Patient
		Customer:            customer,                         // โยงความสัมพันธ์กับ Entity Employee
		Note:                confirmation.Note,                // ตั้งค่าฟิลด์ Symptom
	}
	/* -------------------------------------------------------------------------- */
	/*                                  Prototype                                 */
	/* -------------------------------------------------------------------------- */
	// println("Input time: " + con.RecvTime.Local().String())
	// println("Time Now: " + time.Now().Local().String())

	// ti := con.RecvTime
	// tn := time.Now().Local()

	// if ti.Equal(tn) || ti.After(tn) {
	// 	println("Hell tea")
	// }
	/* -------------------------------------------------------------------------- */
	/*                                  Prototype                                 */
	/* -------------------------------------------------------------------------- */

	if _, err := govalidator.ValidateStruct(con); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 13: บันทึก
	if err := entity.DB().Create(&con).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": con})
}

// wrong commit close
// GET /confirmation/:id
/* ------------------------- ConfirmationUpdate used ------------------------ */
func GetConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation
	customer_id := c.Param("id")
	if err := entity.DB().Preload("Customer").Preload("RecvType").Raw("SELECT * FROM confirmations WHERE customer_id = ? ORDER BY id DESC LIMIT 1", customer_id).Find(&confirmation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": confirmation})
}

/* -------------------------------------------------------------------------- */
/*         List Confirmation (confirmation_id) if it not yet Delivery         */
/* -------------------------------------------------------------------------- */
// GET /confirmations
/* -------------------------- Delivery use this one ------------------------- */
// If avaible (not yet in "Delivery" Table(Entity))
// step refer from each line
func ListConfirmations(c *gin.Context) {
	// Load confirmation table
	var confirmations []entity.Confirmation
	if err := entity.DB().Preload("RecvType").Preload("Customer").Preload("Complete.Receive.Bill.Service").Preload(clause.Associations).Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Load delivery table
	var deliveries []entity.Delivery
	if err := entity.DB().Find(&deliveries).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// variable to map used confirmation_id "uint" to store id & "bool" to store true false
	usedIDs := make(map[uint]bool)

	// for loop to check confirmation_id not yet in deliveries table
	for _, delivery := range deliveries {
		if delivery.Confirmation_ID != nil {
			usedIDs[*delivery.Confirmation_ID] = true
		}
	}

	// Create new variable that check usedId(confirmation_id) to prepare to send to http request
	var newConfirmations []entity.Confirmation
	for _, confirmation := range confirmations {
		if !usedIDs[confirmation.ID] {
			newConfirmations = append(newConfirmations, confirmation)
		}
	}

	if len(newConfirmations) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รายการยืนยันรับผ้าถูกนำส่งหมดแล้ว กรุณาลองใหม่ในภายหลัง"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newConfirmations})
}

/* -------------------------------------------------------------------------- */
/*                      End of list confirmation delivery                     */
/* -------------------------------------------------------------------------- */

// GET /confirmations/:id
/* ----------------------- ConfirmationTable use this one ---------------------- */
func ListConfirmationsByID(c *gin.Context) {
	var confirmations []entity.Confirmation
	customer_id := c.Param("id")
	if err := entity.DB().Preload("RecvType").Preload("Customer").Preload("Complete").Raw("SELECT * FROM confirmations WHERE customer_id = ?", customer_id).Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": confirmations})
}

// DELETE /confirmations/:id
/* ------------------------------- no one use ------------------------------- */
func DeleteConfirmation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM confirmations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /confirmations
/* ----------------------- confirmationUpdate use this ---------------------- */
func UpdateConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation

	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	conf := entity.Confirmation{
		RecvTime:            confirmation.RecvTime.Local(),
		DeliveryInstruction: confirmation.DeliveryInstruction,
		Note:                confirmation.Note,
		RecvType_ID:         confirmation.RecvType_ID,
	}

	if _, err := govalidator.ValidateStruct(conf); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", confirmation.ID).Updates(&conf).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": conf})

}

/* -------------------------------------------------------------------------- */
/*                        List Complete by Customer_ID                        */
/* -------------------------------------------------------------------------- */
// List Complete by Customer_ID in with check if it yet in confirmation table
// GET /c_completes/:id
func ListComplete(c *gin.Context) {
	var complete []entity.Complete
	customer_id := c.Param("id")
	// Join table trying to find match customer_id
	if err := entity.DB().Raw("SELECT * FROM completes c "+
		"JOIN receives r ON r.id = c.receive_id "+
		"JOIN bills b ON b.id = r.bill_id "+
		"JOIN services s ON s.id = b.service_id "+
		"WHERE s.customer_id = ?", customer_id).Find(&complete).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Load confirmation table
	var confirmations []entity.Confirmation
	if err := entity.DB().Preload("Complete").Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// variable to map used complete_id "uint" to store id & "bool" to store true false
	usedIDs := make(map[uint]bool)

	// for loop to check complete_id not yet in confirmations table
	for _, confirmation := range confirmations {
		if confirmation.Complete_ID != nil {
			usedIDs[*confirmation.Complete_ID] = true
		}
	}

	// Create new variable that check usedId(complete_id) to prepare to send to http request
	var newCompletes []entity.Complete
	for _, complete := range complete {
		if !usedIDs[complete.ID] {
			newCompletes = append(newCompletes, complete)
		}
	}

	if len(newCompletes) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ยังไม่มีรายการผ้าที่ซักเสร็จของคุณ กรุณาลองใหม่ในภายหลัง"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newCompletes})
}

/* -------------------------------------------------------------------------- */
/*                     End of List Complete by Customer_ID                    */
/* -------------------------------------------------------------------------- */

//	func RegisterCurrentTimeAsMin(v *validator.Validate) {
//		v.RegisterValidation("current_time_as_min", func(fl validator.FieldLevel) bool {
//			value := fl.Field().Interface().(time.Time)
//			currentTime := time.Now().Local()
//			return value.After(currentTime)
//		})
//	}
