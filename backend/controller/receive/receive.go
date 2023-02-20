package controller

import (
	"github.com/sut65/team10/entity"
	//"gopkg.in/yaml.v2"
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /receives

func CreateReceive(c *gin.Context) {
	var receive entity.Receive
	var bill entity.Bill
	var detergent entity.Stock
	var softener entity.Stock
	var employee entity.Employee
	var stock entity.Stock
	var stock2 entity.Stock

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Employee ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})

		return

	}

	//8: ค้นหา bill ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Bill_ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bill not found"})

		return

	}

	//9: ค้นหา Det ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Detergent_ID).First(&detergent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Detergent not found"})

		return

	}

	//10: ค้นหา Sof ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Softener_ID).First(&softener); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Softener not found"})

		return

	}

	//11: สร้าง
	rec := entity.Receive{
		Employee_ID:  receive.Employee_ID,
		Bill_ID:      receive.Bill_ID,
		Detergent_ID: receive.Detergent_ID,
		Softener_ID:  receive.Softener_ID,
		Det_Quantity: receive.Det_Quantity,
		Sof_Quantity: receive.Sof_Quantity,
		Time_Stamp:   receive.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(rec); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//สร้าง ข้อมูลสำหรับใช้ในการอัปเดต Receive_State ใน Bill
	b_u := entity.Bill{
		Receive_State: 1,
	}

	//function สำหรับอัปเดต Receive_State Bill
	if err := entity.DB().Where("id = ?", receive.Bill_ID).Updates(&b_u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา stock ของ detergent
	if tx := entity.DB().Where("id = ?", receive.Detergent_ID).First(&stock); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Detergent not found"})

		return

	}

	//สร้าง ข้อมูลสำหรับใช้ในการอัปเดต Stock ของ detergent
	d_u := entity.Stock{
		Quantity: stock.Quantity - int(receive.Det_Quantity),
	}

	//ค้นหา stock ของ softener
	if tx := entity.DB().Where("id = ?", receive.Softener_ID).First(&stock2); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Softener not found"})

		return

	}

	//สร้าง ข้อมูลสำหรับใช้ในการอัปเดต Stock ของ softener
	s_u := entity.Stock{
		Quantity: stock2.Quantity - int(receive.Sof_Quantity),
	}

	if d_u.Quantity < 0 {
		//Alert ว่าผงซักซอกไม่เพียงพอ
		c.JSON(http.StatusBadRequest, gin.H{"error": "ผงซักซอกไม่เพียงพอ"})
		return
	}

	if s_u.Quantity < 0 {
		//Alert ว่าน้ำยาปรับผ้านุ่มไม่เพียงพอ
		c.JSON(http.StatusBadRequest, gin.H{"error": "น้ำยาปรับผ้านุ่มไม่เพียงพอ"})
		return
	}
	if d_u.Quantity >= 0 && s_u.Quantity >= 0 {
		//function สำหรับอัพเดท stock ของ detergent
		if err := entity.DB().Where("id = ?", receive.Detergent_ID).Updates(&d_u).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		//function สำหรับอัพเดท stock ของ softener
		if err := entity.DB().Where("id = ?", receive.Softener_ID).Updates(&s_u).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		//12: บันทึก
		if err := entity.DB().Create(&rec).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": rec})

}

// GET /detergents
func ListDetergents(c *gin.Context) {
	var detergent []entity.Stock
	if err := entity.DB().Preload("Brand").Preload("Size").Raw("SELECT * FROM stocks WHERE type_id = 1").Find(&detergent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": detergent})
}

// GET /softeners
func ListSofteners(c *gin.Context) {
	var softener []entity.Stock
	if err := entity.DB().Preload("Brand").Preload("Size").Raw("SELECT * FROM stocks WHERE type_id = 2").Find(&softener).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": softener})
}

// GET /receive/:id

func GetReceive(c *gin.Context) {
	var receive entity.Receive
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM receives WHERE id = ?", id).Scan(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})
}

// GET /receives

func ListReceives(c *gin.Context) {
	var receive []entity.Receive
	if err := entity.DB().Preload("Bill").Preload("Detergent.Brand").Preload("Detergent.Size").Preload("Softener.Brand").Preload("Softener.Size").Preload("Employee").Raw("SELECT * FROM receives").Find(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})

}

// GET /bills

func ListReceiveBillState(c *gin.Context) {
	var receivebillstate []entity.Bill
	if err := entity.DB().Preload("Service.Customer").Preload("QuotaCode").Preload("Paymenttype").Raw("SELECT * FROM bills WHERE Receive_State = 0").Find(&receivebillstate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receivebillstate})

}

// PATCH /receives

func UpdateReceive(c *gin.Context) {
	var receive entity.Receive

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updateDet_Quantity = receive.Det_Quantity
	var updateSof_Quantity = receive.Sof_Quantity

	//12: สร้าง
	u_rec := entity.Receive{
		Model:        gorm.Model{ID: receive.ID},
		Det_Quantity: updateDet_Quantity,
		Sof_Quantity: updateSof_Quantity,
		Employee_ID:  receive.Employee_ID,
		Time_Stamp:   receive.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(u_rec); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", receive.ID).Updates(&u_rec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u_rec})

}

// DELETE /receives/:id
func DeleteReceive(c *gin.Context) {
	var receive entity.Receive

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM receives WHERE id = ?", receive.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receive not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})
}
