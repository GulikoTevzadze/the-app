"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { Toaster } from "sonner";

export default function Page() {
  const [activeTab, setActiveTab] = useState("sign-in");

  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");

    if (tab === "sign-up" || tab === "sign-in") {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-start items-start ">
      <Toaster />
      <div className="w-1/2 flex flex-col justify-start items-center mt-15">
        <Tabs className="w-3/5 mt-10" value={activeTab} onValueChange={setActiveTab}>
          <h1 className="text-4xl text-left font-bold text-sky-600 mb-8">
            THE APP
          </h1>
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2" value="sign-in">
              Sign in
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="sign-up">
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-1/2 h-dvh flex justify-center items-center bg-gradient-to-r from-indigo-500 to-teal-400">
      </div>
    </div>
  );
}
