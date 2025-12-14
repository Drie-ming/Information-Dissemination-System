import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
const LoginPage = () => {

const [username, setUsername] = useState("")
 const [password, setPassword] = useState("")
 const [isLoading, setIsLoading] = useState(false)  
 const navigate = useNavigate()

 const apiURL = "http://localhost/InfoDIsSys/backend/index.php?action=";
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiURL}login`, {
        username: username,
        password: password,
      });

       if (response.data.status === 'success') {
       
       if (response.data.role === 'admin') { navigate('/admin_user') }
       if (response.data.role === 'staff') { navigate('/staff_user') }

      } else {
        toast("Login failed " + response.data.message)
      }

    } catch (error) {
      toast("Login failed ", {
        description: "An error occurred during login. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
        
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-paleWhite">
        <div className="flex flex-col border-2 border-black items-center p-15 shadow-2xl rounded-lg ">
          <div className="text-3xl mb-10">
            Lidong Information Dissemination System
          </div>
          <form onSubmit={handleLogin}
          className="flex flex-col gap-4 w-64">
            <div>
              <Label htmlFor="userName">Username</Label>
              <Input 
               className= "border-black"
                type="text"
                id ="userName"
                name="userName"
                onChange={(e) => setUsername(e.target.value)}
                required
                
             />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
               className= "border-black"
               type="password"
               id = "password"
               name="password"
               onChange={(e) => setPassword(e.target.value)}
               required
                />
            </div>

            <Button type="submit" disabled={isLoading}
             className="hover:bg-green-500 mt-3">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
