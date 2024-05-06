"use client";
import { useState } from 'react';
import { useCurrentUser } from '@/hooks/currentUser';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const user = useCurrentUser();
  const [formData, setFormData] = useState({
    email: user?.email ?? '',
    name: user?.name ?? '',
    image: user?.image ?? ''
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to handle form submission here, e.g., making an API call to update user settings

    
};

  return (
    <Card className="w-[500px]">
      <CardHeader className="text-2xl font-semibold text-center">
        ⚙️ Settings
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <div>
            <label className="text-lg font-semibold">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label className="text-lg font-semibold">Name</label>
            <input
              type="text"
              className="input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label className="text-lg font-semibold">Image</label>
            <input
              type="file"
              className="input"
              name="image"
              value={formData.image}
              onChange={handleChange}
              disabled
            />
          </div>

          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
