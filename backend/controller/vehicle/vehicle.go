package controller

import (
	"net/http"
	"time"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /vehicles

func CreateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	var brand_vehicles entity.Brand_Vehicle
	var engines entity.Engine
	var employee entity.Employee

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Employee ด้วยไอดี
	if tx := entity.DB().Where("id = ?", vehicle.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})

		return

	}
	//8: ค้นหา branvehicle ด้วยไอดี
	if tx := entity.DB().Where("id = ?", vehicle.Brand_Vehicle_ID).First(&brand_vehicles); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Brand not found"})

		return

	}

	//9: ค้นหา engine ด้วยไอดี
	if tx := entity.DB().Where("id = ?", vehicle.Engine_ID).First(&engines); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Engine not found"})

		return

	}
	///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (vehicle.Date_Insulance == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		u_v := entity.Vehicle{
			Employee_ID:    vehicle.Employee_ID,
			Date_Insulance: time.Time{},
		}
		if _, err := govalidator.ValidateStruct(u_v); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		//10: สร้าง
		veh := entity.Vehicle{
			Employee_ID:      vehicle.Employee_ID,
			Brand_Vehicle_ID: vehicle.Brand_Vehicle_ID,
			Engine_ID:        vehicle.Engine_ID,
			ListModel:        vehicle.ListModel,
			Registration:     vehicle.Registration,
			Date_Insulance:   vehicle.Date_Insulance.Local(),
		}

		if _, err := govalidator.ValidateStruct(veh); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		//11: บันทึก
		if err := entity.DB().Create(&veh).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": veh})

	}
}

// GET /vehicle/:id

func GetVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	id := c.Param("id")
	if err := entity.DB().Preload("Engine").Preload("Brand_Vehicle").Preload("Employee").Raw("SELECT * FROM vehicles WHERE id = ?", id).Find(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})
}

// GET /receives

func ListVehicles(c *gin.Context) {
	var vehicle []entity.Vehicle
	if err := entity.DB().Preload("Engine").Preload("Brand_Vehicle").Preload("Employee").Raw("SELECT * FROM vehicles").Find(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})

}

// PATCH /vehicles

func UpdateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	///////////////////////////////////////////////////////////////////////
	////////////////////// Validation Time not null ///////////////////////
	///////////////////////////////////////////////////////////////////////

	//ถ้าเวลาที่รับเข้ามามีค่าเป็น null จะเข้าไปทำใน if และทำการ validation
	//จำเป็นต้องแยกเช็คเนื่องจาก time.Local() เมื่อดึงเวลาแล้วมันจะนับเวลาใน timezone ของเราเข้าไปด้วย ทำให้ค่าไม่เป็น null จะไม่สามารถ validation DateTimeNull ได้
	if (vehicle.Date_Insulance == time.Time{}) {
		// สร้างข้อมูลสำหรับเวลาที่เป็น null
		u_v := entity.Vehicle{
			Employee_ID:    vehicle.Employee_ID,
			ListModel:      vehicle.ListModel,
			Registration:   vehicle.Registration,
			Date_Insulance: time.Time{},
		}
		if _, err := govalidator.ValidateStruct(u_v); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {

		//12: สร้าง
		u_v := entity.Vehicle{
			Employee_ID:    vehicle.Employee_ID,
			ListModel:      vehicle.ListModel,
			Registration:   vehicle.Registration,
			Date_Insulance: vehicle.Date_Insulance.Local(),
		}

		if _, err := govalidator.ValidateStruct(u_v); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := entity.DB().Where("id = ?", vehicle.ID).Updates(&u_v).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": u_v})
	}

}

// // GET /vehicle/:id

// func GetVehicleUpdate(c *gin.Context) {
// 	var vehicle entity.Vehicle
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Engine").Preload("Brand_Vehicle").Preload("Employee").Raw("SELECT * FROM vehicles WHERE id = ?", id).Find(&vehicle).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": vehicle})
// }

// DELETE /vehicle/:id
func DeleteVehicle(c *gin.Context) {
	var vehicle entity.Vehicle

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM vehicles WHERE id = ?", vehicle.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})
}
