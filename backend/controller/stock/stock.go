package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
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

	if stock.Add_number == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserName invalid"})
		return
	}

	if stock.Quantity == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name invalid"})
		return
	}

	// ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", stock.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา type ด้วย id
	if tx := entity.DB().Where("id = ?", stock.TypeID).First(&types); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	// ค้นหา brand ด้วย id
	if tx := entity.DB().Where("id = ?", stock.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "brand not found"})
		return
	}

	// ค้นหา size ด้วย id
	if tx := entity.DB().Where("id = ?", stock.SizeID).First(&size); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "size not found"})
		return
	}

	// 14: สร้าง  stock
	stc := entity.Stock{
		List_Number: stock.List_Number,
		TypeID:      stock.TypeID,
		BrandID:     stock.BrandID,
		Employee_ID: stock.Employee_ID,
		SizeID:      stock.SizeID,
		Quantity:    stock.Quantity,
		Add_number:  stock.Add_number,
		Time:        stock.Time.Local(),
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(stc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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

	if err := entity.DB().Raw("SELECT * FROM stocks WHERE id = ?", id).Scan(&stocks).Error; err != nil {
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

	if tx := entity.DB().Where("id = ?", stocks.ID).First(&stocks); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stocks not found"})
		return
	}

	if err := entity.DB().Save(&stocks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stocks})

}
func DeleteStock(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM stocks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stocks not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}