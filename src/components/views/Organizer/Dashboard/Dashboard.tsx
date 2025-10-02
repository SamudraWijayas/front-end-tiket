"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { Select, SelectItem, Skeleton } from "@heroui/react";
import useDashboard from "./useDashboard";
import { convertIDR } from "@/utils/currency";
import { ApexOptions } from "apexcharts";
import { IEvent } from "@/types/Event";

// ApexCharts harus di-load secara dynamic karena SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#3B82F6"];

interface SalesData {
  month: string;
  totalIncome: number;
}

interface TicketData {
  _id: string;
  ticketName?: string;
  sold: number;
}

const Organizer: React.FC = () => {
  const {
    selectedEventId,
    setSelectedEventId,

    setSelectedYear,
    selectedYear,

    dataOrderTotal,
    isLoadingOrderTotal,
    dataOrderTotalToday,
    isLoadingOrderTotalToday,
    dataTotalEvent,
    isLoadingTotalEvent,
    dataSalesStats,
    isLoadingSalesStats,
    dataTicketStats,
    isLoadingTicketStats,

    dataEvents,
  } = useDashboard();

  const currentYear = new Date().getFullYear();

  // Tahun awal, bisa diubah sesuai kebutuhan
  const startYear = 2024;

  // Buat array tahun dari startYear sampai currentYear
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString(),
  );

  const totalOrders = dataOrderTotal?.totalOrders ?? 0;
  const totalIncome = dataOrderTotal?.totalIncome ?? 0;
  const totalIncomeToday = dataOrderTotalToday?.totalIncome ?? 0;
  const totalOrdersToday = dataOrderTotalToday?.totalOrders ?? 0;
  const totalEvent = dataTotalEvent?.total ?? 0;

  // === Sales Bar Chart ===
  const salesCategories =
    (dataSalesStats as SalesData[])?.map((d) => {
      const [year, month] = d.month.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      return date.toLocaleString("id-ID", { month: "short", year: "numeric" });
    }) ?? [];

  const salesSeriesData =
    (dataSalesStats as SalesData[])?.map((d) => d.totalIncome) ?? [];

  const salesOptions: ApexOptions = {
    chart: {
      id: "sales-line",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    xaxis: {
      categories: salesCategories, // ["Jan 2025", "Feb 2025", ...]
      labels: { rotate: -45 },
      tooltip: { enabled: true },
    },
    yaxis: {
      labels: {
        formatter: (val) => convertIDR(val),
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 6,
      colors: ["#6366F1"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 8 },
    },
    grid: {
      borderColor: "#e0e0e0",
      row: { colors: ["#f8f8f8", "transparent"], opacity: 0.5 },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => convertIDR(val),
      },
    },
    colors: ["#6366F1"], // warna line
    dataLabels: { enabled: false },
  };

  const salesSeries = [
    {
      name: "Total Income",
      data: salesSeriesData, // misal: [100000, 200000, 150000, ...]
    },
  ];

  // === Ticket Pie Chart ===
  const ticketLabels =
    (dataTicketStats as TicketData[])?.map((d) => d.ticketName || d._id) ?? [];
  const ticketSeriesData =
    (dataTicketStats as TicketData[])?.map((d) => d.sold) ?? [];

  const ticketOptions: ApexOptions = {
    labels: ticketLabels,
    colors: COLORS,
    legend: { position: "bottom" },
    tooltip: { y: { formatter: (val: number) => `${val} tiket` } },
  };
  return (
    <section>
      <div className="mb-5 w-full rounded-xl border border-gray-200 bg-white p-4">
        <p className="mb-3 text-sm text-gray-500">
          Lihat statistik berdasarkan event yang dipilih
        </p>
        <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
          <Select
            className="max-w-xs"
            label="Select Event"
            size="sm"
            defaultSelectedKeys={selectedEventId ? [selectedEventId] : []} // default selected
            selectedKeys={selectedEventId ? [selectedEventId] : []} // untuk controlled
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0]?.toString() || null;
              setSelectedEventId(key);
            }}
          >
            {(dataEvents ?? []).map((event: IEvent) => (
              <SelectItem key={event._id}>{event.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
        {/* Top Stats */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-1 xl:col-span-3">
          <div className="p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <Skeleton isLoaded={!isLoadingOrderTotal} className="rounded-xl">
              <h2 className="text-2xl font-bold">{totalOrders}</h2>
            </Skeleton>
            <p className="flex items-center text-sm text-green-500">
              Orders berhasil
            </p>
          </div>
        </div>

        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-1 xl:col-span-3">
          <div className="p-4">
            <p className="text-sm text-gray-500">Total Income</p>
            <Skeleton isLoaded={!isLoadingOrderTotal} className="rounded-xl">
              <h2 className="text-2xl font-bold">{convertIDR(totalIncome)}</h2>
            </Skeleton>
            <p className="flex items-center text-sm text-green-500">
              Penghasilan
            </p>
          </div>
        </div>

        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-1 xl:col-span-3">
          <div className="p-4">
            <p className="text-sm text-gray-500">Total Income Hari ini</p>
            <Skeleton
              isLoaded={!isLoadingOrderTotalToday}
              className="rounded-xl"
            >
              <h2 className="text-2xl font-bold">
                {convertIDR(totalIncomeToday)}
              </h2>
            </Skeleton>
            <p className="flex items-center text-sm text-green-500">
              <ArrowUpRight size={14} className="mr-1" /> {totalOrdersToday}{" "}
              Orders
            </p>
          </div>
        </div>

        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-1 xl:col-span-3">
          <div className="p-4">
            <p className="text-sm text-gray-500">Total Event</p>
            <Skeleton isLoaded={!isLoadingTotalEvent} className="rounded-xl">
              <h2 className="text-2xl font-bold">{totalEvent}</h2>
            </Skeleton>
            <p className="flex items-center text-sm text-green-500">
              <ArrowUpRight size={14} className="mr-1" /> {totalEvent} Event
            </p>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-2 xl:col-span-6">
          <div className="p-4">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
              <Select
                className="max-w-xs"
                label="Select Year"
                size="sm"
                defaultSelectedKeys={[selectedYear]} // default saat pertama render
                selectedKeys={[selectedYear]}
                value={selectedYear} // tetap pakai ini untuk default
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <SelectItem key={year}>{year}</SelectItem> // jangan pakai 'value'
                ))}
              </Select>
            </div>

            <Skeleton isLoaded={!isLoadingSalesStats} className="rounded-xl">
              <ReactApexChart
                options={salesOptions}
                series={salesSeries}
                type="line"
                height={250}
              />
            </Skeleton>
          </div>
        </div>

        {/* Ticket Distribution */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white md:col-span-2 xl:col-span-6">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Sales Event</h2>
            <Skeleton isLoaded={!isLoadingTicketStats} className="rounded-xl">
              <ReactApexChart
                options={ticketOptions}
                series={ticketSeriesData}
                type="pie"
                height={250}
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizer;
