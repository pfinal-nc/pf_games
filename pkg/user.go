package pkg

import (
	"bytes"
	"context"
	"crypto/md5"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
)

type User struct {
	ctx context.Context
}

type Admin struct {
	UserName string `json:"username"`
	PassWord string `json:"password"`
	Created  string `json:"Created"`
}

func (u *User) startup(ctx context.Context) {
	// Perform your setup here
	u.ctx = ctx
}

// CheckLogin 检测是否登录
func CheckLogin() bool {
	_, err := os.Stat("/tmp/database/tstatus")
	if err != nil {
		if os.IsExist(err) {
			return true
		}
		return false
	}
	return true
}
func Login(admin Admin) bool {
	db := &DataBase{}
	db.Start()
	defer db.Close()
	stmt, err := db.Db.Prepare("SELECT * FROM admin_user WHERE username = ? AND password = ?")
	db.checkErr(err)
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		db.checkErr(err)
	}(stmt)
	user := stmt.QueryRow(admin.UserName, admin.PassWord)
	var adminUser Admin
	uid := 0
	_ = user.Scan(&uid, &adminUser.UserName, &adminUser.PassWord, &adminUser.Created)
	fmt.Println(uid)
	if uid >= 0 {
		// 生成一个登录的零时文件
		saveLogin(adminUser)
		return true
	}
	return false
}

func LoginOut() bool {
	err := os.Remove("/tmp/database/tstatus")
	if err != nil {
		return false
	}
	return true
}

func saveLogin(user Admin) {
	userStr, _ := encodeToBase64(user)
	fmt.Println(userStr)
	file, _ := os.Create("/tmp/database/tstatus")
	defer func(file *os.File) {
		_ = file.Close()
	}(file)
	_, _ = file.Write([]byte(userStr))
}

func encodeToBase64(v interface{}) (string, error) {
	var buf bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buf)
	err := json.NewEncoder(encoder).Encode(v)
	if err != nil {
		return "", err
	}
	_ = encoder.Close()
	return buf.String(), nil
}

func MD5(str string) string {
	h := md5.New()
	h.Write([]byte(str))
	return hex.EncodeToString(h.Sum(nil))
}
