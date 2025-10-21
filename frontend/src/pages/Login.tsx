import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/login-background.jpg')] bg-cover bg-center">
      <Card className="w-full max-w-md bg-white text-black shadow-lg p-6">

        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Make-It-All
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
  <Label htmlFor="email" className="text-black">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="js@make-it-all.co.uk"
    required
    className="bg-gray-100 text-black"
  />
</div>
<div>
  <Label htmlFor="password" className="text-black">Password</Label>
  <Input
    id="password"
    type="password"
    placeholder="••••••••"
    required
    className="bg-gray-100 text-black"
  />
</div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
