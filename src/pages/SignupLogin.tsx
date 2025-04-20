import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Layout from "@/components/layout/Layout";
import {
  CircleCheck,
  Lock,
  Mail,
  Shield,
  User,
  KeyRound,
} from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState("");

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values) => {
    login(values.email, values.password);
    setShow2FA(true);
  };

  const onSignupSubmit = (values) => {
    signup(values.name, values.email, values.password);
    toast({
      title: "Account created",
      description: "Welcome to TrustShare! Your basic account has been created.",
    });
    navigate("/dashboard");
  };

  const handle2FAVerify = () => {
    if (code === "123456") {
      toast({ title: "Login successful", description: "Welcome back to TrustShare!" });
      navigate("/dashboard");
    } else {
      toast({ title: "Invalid code", description: "Please enter the correct verification code.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            {show2FA ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-richblack">Two-Step Verification</CardTitle>
                  <CardDescription>Enter the code sent to your email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="pl-10"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-brand-blue hover:bg-brand-teal text-richblack">
                    Verify Code
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-pale-lime border border-softgray">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-richblack">Welcome Back</CardTitle>
                      <CardDescription>Login to start renting and sharing.</CardDescription>
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
                          <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-teal text-richblack">Login</Button>
                        </form>
                      </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center text-center">
                      <div className="text-sm text-muted-foreground">
                        Don&apos;t have an account? <button onClick={() => setActiveTab("signup")} className="text-brand-blue hover:underline">Sign up now</button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-richblack">Create an Account</CardTitle>
                      <CardDescription>Join our trusted community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                          {(['name', 'email', 'password', 'confirmPassword'] as const).map((fieldName) => (
                            <FormField key={fieldName} control={signupForm.control} name={fieldName} render={({ field }) => (
                              <FormItem>
                                <FormLabel className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    {fieldName === 'name' && <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
                                    {fieldName === 'email' && <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
                                    {fieldName.includes('password') && <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
                                    <Input
                                      type={fieldName.includes('password') ? 'password' : 'text'}
                                      placeholder={fieldName.includes('password') ? '••••••••' : ''}
                                      className="pl-10"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          ))}
                          <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-teal text-richblack">Create Account</Button>
                        </form>
                      </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center text-center">
                      <div className="text-sm text-muted-foreground">
                        Already have an account? <button onClick={() => setActiveTab("login")} className="text-brand-blue hover:underline">Login</button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* RIGHT SIDE INFO */}
          <div className="lg:w-1/2">
            <div className="bg-pale-lime p-8 rounded-lg shadow border border-softgray">
              <h2 className="text-2xl font-bold mb-6 text-richblack">Our Trust-Centered System</h2>
              <p className="text-gray-600 mb-8">
                TrustShare uses a multi-tiered verification system to ensure a safe and reliable experience for everyone in our community.
              </p>
              {[{
                icon: Mail, bg: 'bg-amber-100', title: 'Basic Account (Tier 1)', color: 'text-amber-600',
                desc: 'Email verification required. Browse listings and create basic profile.',
                points: ['Email verification', 'Browse listings', 'Create profile']
              }, {
                icon: Shield, bg: 'bg-green-100', title: 'Verified Account (Tier 2)', color: 'text-green-600',
                desc: 'ID verification required. Unlock full platform features and build trust.',
                points: ['Government ID verification', 'Verified badge on profile', 'Higher trust ratings', 'Preferred lending partner']
              }].map((tier, idx) => (
                <div className="flex gap-4 mb-6" key={idx}>
                  <div className={`${tier.bg} p-3 rounded-full h-12 w-12 flex items-center justify-center`}>
                    <tier.icon className={`h-6 w-6 ${tier.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-richblack">{tier.title}</h3>
                    <p className="text-gray-600 mb-2">{tier.desc}</p>
                    <ul className="space-y-1">
                      {tier.points.map((point, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CircleCheck className="h-4 w-4 mr-2 text-green-500" />{point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="mt-8 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                <h4 className="font-semibold mb-2 flex items-center text-richblack">
                  <Shield className="h-5 w-5 mr-2 text-brand-blue" /> Why Verification Matters
                </h4>
                <p className="text-sm text-gray-600">
                  Our verification process helps ensure that all community members are who they say they are. Verified users enjoy more platform privileges.
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
