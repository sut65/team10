package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gorm.io/gorm"
)

type extendedForm struct {
	entity.Form
	Comment string
	FormTypeID uint
	SatisfactionID uint
	FormType_name string
	Satisfaction_name string
}

// POST /users
func CreateForm(c *gin.Context) {
	var customer entity.Customer
	var formtype entity.FormType
	var satisfaction entity.Satisfaction
	var form entity.Form

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	println(form.ID)
	if tx := entity.DB().Where("id = ?", form.FormTypeID).First(&formtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}
	println(form.ID)

		if tx := entity.DB().Where("id = ?", form.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", form.SatisfactionID).First(&satisfaction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	// 13. สร้าง Form

	fm := entity.Form{
		Model: gorm.Model{ID: form.ID},
		Comment:      form.Comment,
		Satisfaction: satisfaction,
		FormType:     formtype,
		Customer:     customer,
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

	if err := entity.DB().Raw("SELECT * FROM forms WHERE id = ?", id).Scan(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": form})
}

func ListForms(c *gin.Context) {

	var forms []entity.Form
	//.Preload("FormType").Preload("Satisfaction").Preload("Form")
	//SELECT f.* , q.form_type_name FROM form_types q JOIN forms f ON q.id = f.id;
	if err := entity.DB().Raw("SELECT * FROM forms").Scan(&forms).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": forms})

}

// DELETE /users/:id

func DeleteForm(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM forms WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateForm(c *gin.Context) {
	var customer entity.Customer
	var formtype entity.FormType
	var satisfaction entity.Satisfaction
	var form entity.Form

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var updateComment = form.Comment


	println(form.ID)
	if tx := entity.DB().Where("id = ?", form.FormTypeID).First(&formtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}
	println(form.ID)

	if tx := entity.DB().Where("id = ?", form.SatisfactionID).First(&satisfaction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction not found"})
		return
	}

	
	if tx := entity.DB().Where("id = ?", form.ID).Find(&form); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "form not found"})
		return
	}

	// 13. สร้าง Form
	up_fmc := entity.Form{
		Model: gorm.Model{ID: form.ID},
		Satisfaction: satisfaction,
		FormType:     formtype,
		Comment: updateComment,
		Customer: customer,
	}

	if err := entity.DB().Save(&up_fmc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": up_fmc})
}

func ListFormByUID(c *gin.Context) {

	var form []extendedForm
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT f.*, ft.form_type_name, s.satisfaction_name FROM forms f JOIN customers c JOIN form_types ft JOIN satisfactions s ON f.customer_id = c.id AND f.form_type_id = ft.id AND f.satisfaction_id = s.id WHERE c.id = ?", id).Find(&form).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": form})

}