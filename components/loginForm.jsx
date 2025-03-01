'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import apiClient from "@/lib/apiClient"

import { useRouter } from 'next/navigation'
export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async()=>{
      const res = await apiClient.post("/login",{email,password})
      const {username,access_token} = res.data;
      localStorage.setItem("username", username)
      document.cookie = `Authorization=Bearer ${access_token}; Secure; SameSite=Strict; Path=/; Domain=${window.location.hostname}`;
      router.push("/")
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>
            在下方输入邮箱与密码进行登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">密码</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    忘记密码?
                  </a>
                </div>
                <Input id="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} type="password" required />
              </div>
              <Button onClick={handleLogin} type="button" className="w-full">
                登录
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              没有账号？
              <a href="/register" className="underline underline-offset-4">
                注册
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}