package pkg

import (
	"context"
)

type User struct {
	ctx context.Context
}

func (u *User) startup(ctx context.Context) {
	// Perform your setup here
	u.ctx = ctx
}

// CheckLogin 检测是否登录
func (u *User) CheckLogin() bool {
	return false
}

func NewUser() *User {
	return &User{}
}
