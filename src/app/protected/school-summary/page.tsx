"use client";
import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SummaryTable from "./components/SummaryTable";
import DoubleOrders from "./components/DoublesResult";
import { Items, Summary, Doubles, Info } from "./types";

const pricing = {};

const Page: FC = () => {
  const [file, setFile] = useState<string>("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [doubles, setDoubles] = useState<Doubles | null>(null);
  const [info, setInfo] = useState<Info>({ date: "", totalPrice: 0 });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullFile = e.target.files?.[0];

    if (fullFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result as string;
        setFile(text);
      };
      reader.readAsText(fullFile);
    }
  };

  const clearContent = () => {
    console.log(file);
    console.log(summary);
    setFile("");
    setSummary(null);
    setDoubles(null);
    (document.getElementById("customFile") as HTMLInputElement).value = "";
  };

  useEffect(() => {
    if (!file) {
      setSummary(null);
      setDoubles(null);
      return;
    }
    if (file.trim().length > 0) {
      const lines = file.split("\n").map((line) => line.split(","));
      lines.shift();

      const date = lines[0][5];
      let temp = { date: lines[0][5], totalPrice: 0 };

      let res: Summary = { Total: { pieces: 0, rolls: 0 } };
      let tempDoubles: Doubles = {};
      // Member: 0, Location: 1, Item: 6, Quantity: 10, Price: 11, Organization: 22
      lines.forEach((line, i) => {
        const member = line[0];
        const location = line[1];
        const item = line[6];
        const quantity = line[10];
        const cost = line[11];
        const organization = line[22];

        temp.totalPrice += cost ? parseFloat(cost) : 0;

        console.log(cost);
        console.log(temp.totalPrice);

        if (parseInt(quantity) > 1) {
          tempDoubles[i.toString()] = {
            member,
            roomNumber: location,
            item,
            quantity: parseInt(quantity),
            organization,
          };
        }

        if (item === undefined) {
          return;
        }
        const [name, amount] = item.split(" - ").map((str) => str.trim());
        const pieces = parseInt(amount.replace(/[^0-9]/g, ""));
        const rolls = pieces / 10;

        if (name && name === "Mixed") {
          res["Chicken teriyaki"] = {
            pieces:
              (res["Chicken teriyaki"].pieces || 0) + Math.floor(pieces / 2),
            rolls: (res["Chicken teriyaki"].rolls || 0) + rolls / 2,
          };
          res["Salmon & Avocado"] = {
            pieces:
              (res["Salmon & Avocado"].pieces || 0) + Math.floor(pieces / 2),
            rolls: (res["Salmon & Avocado"].rolls || 0) + rolls / 2,
          };
        } else {
          res[name] = {
            pieces: (res[name]?.pieces || 0) + pieces,
            rolls: (res[name]?.rolls || 0) + rolls,
          };
        }

        res.Total = {
          pieces: (res.Total?.pieces || 0) + pieces,
          rolls: (res.Total?.rolls || 0) + rolls,
        };
      });

      if (tempDoubles) {
        setDoubles(tempDoubles);
      }

      Object.entries(res).forEach(([key, value]) => {
        res[key] = {
          pieces: value.pieces,
          rolls: Math.round(value.rolls * 100) / 100,
        };
      });

      console.log(temp);
      setSummary(res);
      setInfo({ ...temp, totalPrice: Math.round(temp.totalPrice * 100) / 100 });

      console.log(info);
    }
  }, [file]);

  return (
    <section className="page">
      <div className="flex flex-col justify-start gap-2">
        <h1 className="text-left">School Summary</h1>

        <Label htmlFor="customFile">
          &nbsp;Upload a&nbsp;
          <span className="text-[hsl(var(--excel-green))]">CSV</span>
          &nbsp;or&nbsp;
          <span className="text-[hsl(var(--excel-green))]">Excel</span>
          &nbsp;file&nbsp;
        </Label>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <Input
              type="file"
              id="customFile"
              accept=".csv, application/vnd.ms-excel, .xlsx, .xls"
              className="w-fit cursor-pointer"
              onChange={handleFileChange}
            />
            <Button className="w-20" onClick={clearContent}>
              Clear
            </Button>
          </div>

          {info.date && <div className="p-2 bg-accent border rounded w-fit space-y-1 text-left">
            <p>{info.date}</p>
            <p>{info.totalPrice > 0 ? "$" + info.totalPrice : ""}</p>
          </div>}
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <SummaryTable results={summary} />
        <DoubleOrders results={doubles} />
      </div>
    </section>
  );
};

export default Page;
