"use client";

import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const ContactForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!formdata.name || !formdata.email || !formdata.message) {
      console.log("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }

    // Mock API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Api call successful");
      }, 1000);
    });

    if (response) {
      toast.success("Form submitted successfully");
    } else {
      toast.error("Form submission failed");
    }
  };

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-3xl flex-col gap-5 py-10"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium tracking-tight text-neutral-600"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          className="shadow-acceternity dark:bg-neutral-800  focus:ring-primary rounded-md p-2 text-sm focus:ring-2 focus:outline-none"
          value={formdata.name}
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          className="text-sm font-medium tracking-tight text-neutral-600"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your email"
          className="shadow-acceternity dark:bg-neutral-800  focus:ring-primary rounded-md p-2 text-sm focus:ring-2 focus:outline-none"
          value={formdata.email}
          onChange={handleChange}
        />
        <label
          htmlFor="message"
          className="text-sm font-medium tracking-tight text-neutral-600"
        >
          Message
        </label>
        <textarea
          rows={5}
          id="message"
          name="message"
          placeholder="You'r Crazy nigbbourhood freelacer"
          className="shadow-acceternity dark:bg-neutral-800  focus:ring-primary resize-none rounded-md p-2 text-sm focus:ring-2 focus:outline-none"
          value={formdata.message}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        className="bg-black dark:bg-primary hover:bg-black/80 mt-4 rounded-md px-4 py-2 text-white"
        >
        Send Message
      </Button>
    </form>
  );
};
