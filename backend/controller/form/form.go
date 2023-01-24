package controller

import (

             "github.com/sut65/team10/entity"
           "github.com/gin-gonic/gin"
           "net/http"

)

// POST /users
func CreateForm(c *gin.Context) {

	var formtype entity.FormType
       var satisfaction entity.Satisfaction
       var form entity.Form

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	println(form.ID)
	if tx := entity.DB().Where("id = ?", form.FormTypeID).First(&formtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OFFicer not found"})
		return
	}
	println(form.ID)

	// 10. ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", form.SatisfactionID).First(&satisfaction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	// 13. สร้าง Form
	fm := entity.Form{
		Comment: form.Comment,
              Satisfaction: satisfaction,
              FormType: formtype,
	}

	if err := entity.DB().Create(&fm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fm})
}


// GET /user/:id

func GetForm(c *gin.Context) {

	var form entity.Form

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM froms WHERE id = ?", id).Scan(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": form})
}

// GET /users

func ListForms(c *gin.Context) {

	var form []entity.Form

	if err := entity.DB().Preload("FormType").Preload("").Preload("Satisfaction").Raw("SELECT * FROM forms").Find(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": form})
}