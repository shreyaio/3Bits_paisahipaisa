import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Layout from "@/components/layout/Layout";
import { CircleCheck, Lock, Mail, Shield, User } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit = (values) => {
    login(values.email, values.password);
    toast({ title: "Login successful", description: "Welcome back to TrustShare!" });
    navigate("/dashboard");
  };

  const onSignupSubmit = (values) => {
    signup(values.name, values.email, values.password);
    toast({ title: "Account created", description: "Welcome to TrustShare! Your basic account has been created." });
    navigate("/verify");
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Login to your TrustShare account to start renting and sharing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField control={loginForm.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="your@email.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={loginForm.control} name="password" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-teal">Login</Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center text-center">
                    <div className="text-sm text-muted-foreground">
                      Don't have an account? {" "}
                      <button type="button" onClick={() => setActiveTab("signup")} className="text-brand-blue hover:underline">
                        Sign up now
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Join our trusted community of renters and lenders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                        <FormField control={signupForm.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Your full name" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={signupForm.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="your@email.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={signupForm.control} name="password" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-teal">Create Account</Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center text-center">
                    <div className="text-sm text-muted-foreground">
                      Already have an account? {" "}
                      <button type="button" onClick={() => setActiveTab("login")} className="text-brand-blue hover:underline">
                        Login
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Our Trust-Centered System</h2>
              <p className="text-gray-600 mb-8">
                TrustShare uses a multi-tiered verification system to ensure a safe and reliable experience for everyone in our community.
              </p>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-amber-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Account (Tier 1)</h3>
                    <p className="text-gray-600">Email verification required. Browse listings and create basic profile.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Email verification</li>
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Browse listings</li>
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Create profile</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Verified Account (Tier 2)</h3>
                    <p className="text-gray-600">ID verification required. Unlock full platform features and build trust.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Government ID verification</li>
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Verified badge on profile</li>
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Higher trust ratings</li>
                      <li className="flex items-center text-sm text-gray-600"><CircleCheck className="h-4 w-4 mr-2 text-green-500" />Preferred lending partner</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-brand-blue" />
                  Why Verification Matters
                </h4>
                <p className="text-sm text-gray-600">
                  Our verification process helps ensure that all community members are who they say they are. Verified users can enjoy more platform privileges and build stronger trust relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupLogin; 