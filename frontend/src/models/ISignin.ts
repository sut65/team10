export interface SigninInterface {
  Username?: string;
  Password?: string;
  UserType?: string;
}

// Interface นี้จะส่งข้อมูล Username Password และ Usertype ไปยัง Backend 
// โดยจะตรวจทั้ง Username ของ Customer  
// และ Personal ID ของ Employee
// โดยอ้างอิงจากการเลือก CheckBox ใน SignIn_UI และจะทำการเลือกวิธีส่งข้อมูลว่าต้องการ SiginIn โดยใคร