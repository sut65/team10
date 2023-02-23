package controller

import (
	"net/http"

	"gorm.io/gorm"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

/* --- stock--- */

// POST /employees

func CreateStocks(c *gin.Context) {

	var stock entity.Stock
	var types entity.Type
	var brand entity.Brand
	var size entity.Size
	var employee entity.Employee

	if err := c.ShouldBindJSON(&stock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13.ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", stock.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 11.ค้นหา type ด้วย id
	if tx := entity.DB().Where("id = ?", stock.TypeID).First(&types); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	// 10.ค้นหา brand ด้วย id
	if tx := entity.DB().Where("id = ?", stock.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "brand not found"})
		return
	}

	// 12.ค้นหา size ด้วย id
	if tx := entity.DB().Where("id = ?", stock.SizeID).First(&size); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "size not found"})
		return
	}

	// 14: สร้าง  stock
	stc := entity.Stock{
		Model:       gorm.Model{ID: stock.ID},
		List_Number: stock.List_Number,
		TypeID:      stock.TypeID,
		BrandID:     stock.BrandID,
		Employee_ID: stock.Employee_ID,
		SizeID:      stock.SizeID,
		Quantity:    stock.Quantity,
		Time:        stock.Time.Local(),
	}

	//ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(stc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
//15.บันทึก
	if err := entity.DB().Create(&stc).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": stock})

}

// GET /employee/:id
func GetStock(c *gin.Context) {
	var stocks entity.Stock
	id := c.Param("id")

	if err := entity.DB().Preload("Type").Preload("Size").Preload("Brand").Preload("Employee").Raw("SELECT * FROM stocks WHERE id = ?", id).Find(&stocks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stocks})
}

// GET Stock
func ListStock(c *gin.Context) {
	var stocks []entity.Stock

	if err := entity.DB().Preload("Type").Preload("Size").Preload("Brand").Preload("Employee").Raw("SELECT * FROM stocks").Find(&stocks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stocks})
}
func UpdateStock(c *gin.Context) {
	var stocks entity.Stock
	if err := c.ShouldBindJSON(&stocks); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	stc := entity.Stock{
		List_Number: stocks.List_Number,
		TypeID:      stocks.TypeID,
		BrandID:     stocks.BrandID,
		Employee_ID: stocks.Employee_ID,
		SizeID:      stocks.SizeID,
		Quantity:    stocks.Quantity,
		Time:        stocks.Time.Local(),
	}
	if err := entity.DB().Where("id = ?", stocks.ID).Updates(&stc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stc})
}
// func AddStock(c *gin.Context) {
// 	var stocks entity.Stock
// 	id := c.Param("id")

// 	if err := entity.DB().Raw("UPDATE stocks SET quantity = add_number+quantity WHERE stocks.id", id).Scan(&stocks).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": stocks})
// }
