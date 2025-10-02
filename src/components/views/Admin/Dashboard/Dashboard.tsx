"use client";

import React from "react";
import useDashboard from "./useDashboard";
import { IEventOrderTotal } from "@/types/Order";

const DashboardAdmin = () => {
  const { dataOrderTotal } = useDashboard();
  console.log(dataOrderTotal);
  return (
    <div className="min-h-screen rounded-lg bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            + Add Project
          </button>
          <button className="rounded-lg border border-blue-600 px-4 py-2">
            Import Data
          </button>
        </div>
      </div>

      {/* Project Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-blue-600 p-4 text-white">
          <p className="text-sm">Total Projects</p>
          <h2 className="text-2xl font-bold">24</h2>
          <p className="mt-1 text-xs">Increased from last month</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm">Ended Projects</p>
          <h2 className="text-2xl font-bold">10</h2>
          <p className="mt-1 text-xs text-blue-600">
            Increased from last month
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm">Running Projects</p>
          <h2 className="text-2xl font-bold">12</h2>
          <p className="mt-1 text-xs text-blue-600">
            Increased from last month
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm">Pending Project</p>
          <h2 className="text-2xl font-bold">2</h2>
          <p className="mt-1 text-xs text-blue-600">On Discuss</p>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {dataOrderTotal?.data?.map((event: IEventOrderTotal, index: number) => (
          <div
            key={index}
            className={`rounded-lg p-4 shadow ${
              index === 0 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <p className="text-sm">{event.eventName}</p>
            <h2 className="text-2xl font-bold">{event.totalAmount}</h2>
            <p className="mt-1 text-xs text-blue-600">Total completed orders</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Project Analytics */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Project Analytics</h3>
            <div className="flex h-24 items-end justify-between">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-6 ${i === 2 ? "h-16 bg-blue-500" : "h-12 bg-blue-200"} rounded-lg`}
                  />
                  <span className="mt-1 text-xs">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 flex items-center justify-between font-semibold">
              Team Collaboration
              <button className="text-sm text-blue-600">+ Add Member</button>
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="font-semibold">Alexandra Deff</p>
                <p className="text-xs text-gray-500">
                  Working on Github Project Repository{" "}
                  <span className="text-blue-500">Completed</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">Edwin Adenike</p>
                <p className="text-xs text-gray-500">
                  Working on Integrate User Authentication System{" "}
                  <span className="text-yellow-500">In Progress</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">Isaac Oluwatemilorun</p>
                <p className="text-xs text-gray-500">
                  Working on Develop Search and Filter Functionality{" "}
                  <span className="text-red-500">Pending</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">David Oshodi</p>
                <p className="text-xs text-gray-500">
                  Working on Responsive Layout for Homepage{" "}
                  <span className="text-yellow-500">In Progress</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Reminders */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Reminders</h3>
            <p className="font-semibold text-blue-600">
              Meeting with Arc Company
            </p>
            <p className="mb-2 text-sm text-gray-500">
              Time: 02:00 pm - 04:00 pm
            </p>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Start Meeting
            </button>
          </div>

          {/* Project Progress */}
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Project Progress</h3>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-blue-200">
              <div className="absolute h-32 w-32 rotate-[148deg] rounded-full border-8 border-blue-600" />
              <span className="z-10 text-lg font-bold">41%</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Project List */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 flex items-center justify-between font-semibold">
              Project
              <button className="text-sm text-blue-600">+ New</button>
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Develop API Endpoints", due: "Nov 26, 2024" },
                { name: "Onboarding Flow", due: "Nov 28, 2024" },
                { name: "Build Dashboard", due: "Nov 30, 2024" },
                { name: "Optimize Page Load", due: "Dec 5, 2024" },
                { name: "Cross-Browser Testing", due: "Dec 6, 2024" },
              ].map((proj, i) => (
                <li key={i} className="flex justify-between">
                  <span>{proj.name}</span>
                  <span className="text-gray-400">{proj.due}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Time Tracker */}
          <div className="rounded-lg bg-white p-4 text-center shadow">
            <h3 className="mb-2 font-semibold">Time Tracker</h3>
            <p className="mb-2 text-2xl font-bold">01:24:08</p>
            <div className="flex justify-center gap-2">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                Pause
              </button>
              <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
