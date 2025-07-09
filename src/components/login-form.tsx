"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        toast({ title: "Email and password are required.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // The AuthProvider will handle the redirect on successful login.
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // The AuthProvider will handle the redirect on successful sign-up.
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please log in.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. It should be at least 6 characters.";
      }
      
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
          <FlaskConical className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">BL-Research Flow</span>
      </div>
      <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
          <p className="text-muted-foreground">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Fill in the details to get started.'}</p>
      </div>
      <form onSubmit={handleAuthAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>}
              </div>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? 'Login' : 'Sign Up'}
          </Button>
      </form>
      <p className="mt-2 text-sm text-center text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary hover:underline focus:outline-none">
              {isLogin ? 'Sign up' : 'Login'}
          </button>
      </p>
    </div>
  );
}
