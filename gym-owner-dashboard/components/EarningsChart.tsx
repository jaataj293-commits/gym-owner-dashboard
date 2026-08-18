"use client";

import {
  LineChart,
    Line,
      XAxis,
        YAxis,
          CartesianGrid,
            Tooltip,
              ResponsiveContainer,
              } from "recharts";

              const data = [
                { day: "Mon", earnings: 1200 },
                  { day: "Tue", earnings: 1800 },
                    { day: "Wed", earnings: 1400 },
                      { day: "Thu", earnings: 2200 },
                        { day: "Fri", earnings: 2600 },
                          { day: "Sat", earnings: 3000 },
                            { day: "Sun", earnings: 2400 },
                            ];

                            export default function EarningsChart() {
                              return (
                                  <div style={{ width: "100%", height: "260px" }}>
                                        <ResponsiveContainer>
                                                <LineChart data={data}>
                                                          <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="day" />
                                                                              <YAxis />
                                                                                        <Tooltip />
                                                                                                  <Line type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={3} />
                                                                                                          </LineChart>
                                                                                                                </ResponsiveContainer>
                                                                                                                    </div>
                                                                                                                      );
                                                                                                                      }