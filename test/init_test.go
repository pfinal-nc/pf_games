package main

import (
	"fmt"
	"testing"
	"time"
	"wails_game/pkg"
)

//func TestCheckTable(t *testing.T) {
//	relativePath := "database"
//	// 获取相对路径的绝对路径
//	absolutePath, _ := filepath.Abs(relativePath)
//	fmt.Println("指定目录的路径:", absolutePath)
//	//db := &pkg.DataBase{}
//	//tableStatus := db.CheckTable("admin_user")
//	//fmt.Println(tableStatus)
//}

func TestInit(t *testing.T) {
	pkg.Init()
}

func TestLogin(t *testing.T) {
	admin := pkg.Admin{
		UserName: "admin",
		PassWord: pkg.MD5("admin"),
		Created:  time.Now().Format("2006-01-02 15:04:05"),
	}
	// fmt.Println(admin)
	fmt.Println(pkg.Login(admin))
}

func TestPwdCreate(t *testing.T) {
	pwds := pkg.PassWord{
		Mark:     "162邮箱",
		UserName: "lampxiezi@162.com",
		PassWord: "admin123",
		Created:  time.Now().Format("2006-01-02 15:04:05"),
	}
	pkg.Create(pwds)
}

func TestPwdList(t *testing.T) {
	fmt.Println(pkg.GetALLPass())
}
