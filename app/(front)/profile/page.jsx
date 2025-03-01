'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem('username'),
    email: 'john@example.com',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    alert('Profile updated successfully!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">用户中心</h1>
      <Card>
        <CardHeader>
          <CardTitle>修改信息</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div> */}
            </div>
            <CardFooter className="mt-6">
              <Button type="submit">提交修改</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

