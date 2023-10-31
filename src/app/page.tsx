"use client";
import './globals.css'
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select"; 
import Image from "next/image";
import bg_image from "@/../public/cool-bgimage.avif"
interface Error {
  status: number;
  statusText: string;
  responseText: string;
}

export default function Home() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("bg-image"); // Add the CSS class to the body element
    return () => {
      document.body.classList.remove("bg-image"); // Remove the CSS class when the component is unmounted
    };
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bd5f56a5b2msh07de90bad432dc7p11aaf8jsn9e05513d11b8",
      "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
    },
  };

  const getCurrency = async (have: string, want: string, amount: string) => {
    const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${have}&want=${want}&amount=${amount}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setNewAmount(data.new_amount);
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  const search = () => {
    getCurrency(fromCurrency, toCurrency, amount);
  };
  const currencies = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "PKR",
    "INR",
  ];
  const currencyOptions = currencies.map((currency) => ({
    value: currency,
    label: currency,
  }));
  return (
    <div>
      <h1 className="flex justify-center text-2xl font-bold pt-4 uppercase text-sky-500" >
        Currency Converter...
      </h1>
      <div className="flex justify-center mt-24 relative">
        <h2 className="absolute -top-7 text-xl font-medium lg:text-[#28c735] sm:text-green-600 ">
          Amount:
        </h2>
        <Input
          id="amount"
          type="text"
          placeholder="Enter the Amount"
          className=" w-2/4"
          value={amount}
          onChange={(e) => {
            console.log(e.target.value); // This will log the input value to the console
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center sm:flex-col lg:flex-row mt-24 relative ">
        <h2 className="lg:absolute lg:-top-7 lg:left-[318px] sm:absolute sm:-top-6 sm:left-44  text-xl font-medium lg:text-[#28c735 sm:text-green-600">
          From:
        </h2>
          <Select
          className="lg:w-1/4 sm:w-11/12 sm:ml-4  rounded-xl mr-0 sm:absolute sm:-top-0 lg:absolute lg:-top-0  "
            id="fromCurrency"
            placeholder="Convert from "
            value={currencyOptions.find(
              (option) => option.value === fromCurrency
            )}
            options={currencyOptions}
            onChange={(selectedOption) => {
              setFromCurrency(selectedOption.value);
            }}
          />
        <h2 className="lg:absolute lg:-top-7 lg:right-[576px]  sm:absolute sm:right-48 sm:top-16 text-xl  font-medium lg:text-[#28c735 sm:text-green-600">
          To:
        </h2>
        {/* <Input
          id="toCurrency"
          type="text"
          placeholder="in which you want to convert"
          className=" w-1/4 ml-2 rounded-xl "
          value={toCurrency}
          onChange={(e) =>{
            console.log(e.target.value)
            setToCurrency(e.target.value)}}
        /> */}
        <Select
          id="toCurrency"
          className="lg:w-1/4 sm:w-11/12 sm:ml-4  rounded-xl lg:ml-0 sm:absolute sm:top-12 lg:absolute lg:-top-0    sm:flex-col"
          placeholder="Convert to"
          value={currencyOptions.find(
            (option) => option.value === toCurrency
          )}
          options={currencyOptions}
          onChange={(selectedOption) => {
            setToCurrency(selectedOption.value);
          }}
        />
      </div>
      <div className="flex justify-center items-center lg:mt-8 sm:mt-24">
        <Button
          onClick={search}
          variant="secondary"
          className="bg-blue-500 rounded-xl px-12"
        >
          Convert
        </Button>
      </div>
      <div className="mt-8">
        <h3 className="flex text-xl text-center justify-center">
          The amount in {newAmount ? toCurrency : ''} is : {newAmount}
        </h3>
      </div>
    </div>
  );
}
