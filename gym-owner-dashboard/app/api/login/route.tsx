import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
      const body = await request.json();

          const username = String(body.username || "").trim();
              const password = String(body.password || "");

                  if (!username || !password) {
                        return NextResponse.json(
                                {
                                          success: false,
                                                    message: "Username and password are required.",
                                                            },
                                                                    { status: 400 }
                                                                          );
                                                                              }

                                                                                  const wpUrl = process.env.WP_SITE_URL;

                                                                                      if (!wpUrl) {
                                                                                            return NextResponse.json(
                                                                                                    {
                                                                                                              success: false,
                                                                                                                        message: "WordPress site URL is not configured.",
                                                                                                                                },
                                                                                                                                        { status: 500 }
                                                                                                                                              );
                                                                                                                                                  }

                                                                                                                                                      const response = await fetch(
                                                                                                                                                            `${wpUrl}/wp-json/gmc/v1/login`,
                                                                                                                                                                  {
                                                                                                                                                                          method: "POST",
                                                                                                                                                                                  headers: {
                                                                                                                                                                                            "Content-Type": "application/json",
                                                                                                                                                                                                    },
                                                                                                                                                                                                            body: JSON.stringify({
                                                                                                                                                                                                                      username,
                                                                                                                                                                                                                                password,
                                                                                                                                                                                                                                        }),
                                                                                                                                                                                                                                                cache: "no-store",
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                          );

                                                                                                                                                                                                                                                              const data = await response.json();

                                                                                                                                                                                                                                                                  return NextResponse.json(data, {
                                                                                                                                                                                                                                                                        status: response.status,
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                              } catch {
                                                                                                                                                                                                                                                                                  return NextResponse.json(
                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                success: false,
                                                                                                                                                                                                                                                                                                        message: "Login request failed.",
                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                    { status: 500 }
                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                          }