import Link from 'next/link'
import { ShoppingCart, User, LogOut,Amphora,House,TableProperties,BadgeJapaneseYen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          抖音电商
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/admin/products">
                <Button variant="ghost" size="icon">
                  <TableProperties className="h-5 w-5"/>
                  <span className="sr-only">后台管理</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <House className="h-5 w-5"/>
                  <span className="sr-only">首页</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">购物车</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/orders">
                <Button variant="ghost" size="icon">
                  <BadgeJapaneseYen className="h-5 w-5" />
                  <span className="sr-only">订单</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">个人中心</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">登出</span>
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

