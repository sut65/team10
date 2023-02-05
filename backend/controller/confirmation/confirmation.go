package controller

import (
	"net/http"
	"time"

	// "time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gopkg.in/go-playground/validator.v9"
	"gorm.io/gorm/clause"
)

type TimeForCheck struct {
	DateTimeChecker time.Time `validate:"required,current_time_as_min"`
}

// POST /confirmation
func CreateConfirmation(c *gin.Context) {

	var confirmation entity.Confirmation
	var recvtype entity.RecvType
	var complete entity.Complete
	var customer entity.Customer
	var time time.Time //Time to use as DateTimeCheck

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร confirmation
	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา recvtype ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.RecvType_ID).First(&recvtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recvtype not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Complete_ID).First(&complete); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	/* ------ Get Input from RecvTime to other stuct (TimeForCheck) for custom validate method ----- */
	date := TimeForCheck{
		DateTimeChecker: confirmation.RecvTime.Local(),
	}
	/* -------------------------------------------------------------------------- */
	/*                  Create New Validator That Check Datetime                  */
	/* -------------------------------------------------------------------------- */
	validate := validator.New()
	RegisterCurrentTimeAsMin(validate)

	err := validate.Struct(date)
	if err == nil {
		time = date.DateTimeChecker

	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "เวลาต้องเป็นอนาคต"})
		return
	}
	/* -------------------------------------------------------------------------- */
	/*                           End of DateTimeChecker                           */
	/* -------------------------------------------------------------------------- */

	// 12: สร้าง Confirmation
	con := entity.Confirmation{
		Complete:    complete,
		RecvType:    recvtype,                 // โยงความสัมพันธ์กับ Entity Confirmation_Type
		RecvTime:    time,                     // เซ็ทฟิลด์ RecvTime จากตัวแปร time
		RecvAddress: confirmation.RecvAddress, // โยงความสัมพันธ์กับ Entity Patient
		Customer:    customer,                 // โยงความสัมพันธ์กับ Entity Employee
		Note:        confirmation.Note,        // ตั้งค่าฟิลด์ Symptom
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
func GetConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation
	customer_id := c.Param("id")
	if err := entity.DB().Preload("Customer").Preload("RecvType").Raw("SELECT * FROM confirmations WHERE customer_id = ? ORDER BY id DESC LIMIT 1", customer_id).Find(&confirmation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": confirmation})
}

// GET /confirmation
func ListConfirmations(c *gin.Context) {
	var confirmations []entity.Confirmation
	if err := entity.DB().Preload("RecvType").Preload("Customer").Preload("Complete").Raw("SELECT * FROM confirmations").Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": confirmations})
}

// DELETE /confirmations/:id
func DeleteConfirmation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM confirmations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /confirmations
func UpdateConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation

	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	conf := entity.Confirmation{
		RecvTime:    confirmation.RecvTime.Local(),
		RecvAddress: confirmation.RecvAddress,
		Note:        confirmation.Note,
		RecvType_ID: confirmation.RecvType_ID,
	}

	if err := entity.DB().Where("id = ?", confirmation.ID).Updates(&conf).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": conf})

}

// GET /c_completes/:id
func ListComplete(c *gin.Context) {
	var complete []entity.Complete
	customer_id := c.Param("id")
	// Preload ตัวแรก กำหนด ความลึกมากที่สุดที่ต้องการจะ Preload
	// Preload ตัวที่ 2 สั่งให้ Preload สิ่งที่เกี่ยวข้องทั้งหมดกับความลึกที่ได้กำหนดไว้จากตัวแรก
	if err := entity.DB().Preload("Receive.Bill.Service").Preload(clause.Associations).Raw("SELECT * FROM completes").Where("customer_id = ?", customer_id).Find(&complete).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": complete})
}

func RegisterCurrentTimeAsMin(v *validator.Validate) {
	v.RegisterValidation("current_time_as_min", func(fl validator.FieldLevel) bool {
		value := fl.Field().Interface().(time.Time)
		currentTime := time.Now().Local()
		return value.After(currentTime)
	})
}
