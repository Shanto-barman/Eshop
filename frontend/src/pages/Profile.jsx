import React from "react";
import { AppWindowIcon, CodeIcon } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="pt-30 min-h-screen ">
      <Tabs
        defaultValue="profile"
        className="bg-white mx-w-7xl mx-auto items-center"
      >
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center ">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src="/profile.jpg"
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-1 hover:bg-pink-400">
                    Change Picture
                    <input type="file" accept="image/*" className="hidden" />
                  </Label>
                </div>
                {/* profile picture */}

                <div>
                  <form className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="Fast name"
                          className="w-full border rounded-lg px-3 py-2 mt-1"
                        ></Input>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="Last name"
                          className="w-full border rounded-lg px-3 py-2 mt-1"
                        ></Input>
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email" 
                          placeholder="Enter your Email"
                          disabled className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                        ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input
                          type="text"
                          name="phoneNo" 
                          placeholder="Enter your Contact No"
                          className="w-full border rounded-lg px-3 py-2 mt-1 "
                        ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                          Address
                        </Label>
                        <Input
                          type="text"
                          name="address" 
                          placeholder="Enter your Address"
                          className="w-full border rounded-lg px-3 py-2 mt-1 "
                        ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                          City
                        </Label>
                        <Input
                          type="text"
                          name="city" 
                          placeholder="Enter your City"
                          className="w-full border rounded-lg px-3 py-2 mt-1 "
                        ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                          Zip Code
                        </Label>
                        <Input
                          type="text"
                          name="zipCode" 
                          placeholder="Enter your ZipCode"
                          className="w-full border rounded-lg px-3 py-2 mt-1 "
                        ></Input>
                    </div>
                    <Button className='w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg'>
                      Update Profile
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
