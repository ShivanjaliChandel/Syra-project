import { NextResponse } from "next/server"
import { VTEX_ACCOUNT, VTEX_ENVIRONMENT, VTEX_CONFIG, vtexHeaders } from "@/lib/vtex-api"

export async function GET() {
  try {
    console.log("VTEX Configuration:")
    console.log("Account:", VTEX_ACCOUNT)
    console.log("Environment:", VTEX_ENVIRONMENT)
    console.log("Config:", VTEX_CONFIG)
    console.log("Headers:", vtexHeaders)

    // Test basic connectivity
    const testUrl = `https://${VTEX_ACCOUNT}.${VTEX_ENVIRONMENT}.com.br/api/catalog_system/pub/category/tree/1`
    console.log("Testing URL:", testUrl)

    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("Test response status:", response.status)

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({
        success: true,
        config: {
          account: VTEX_ACCOUNT,
          environment: VTEX_ENVIRONMENT,
          hasAppKey: !!VTEX_CONFIG.appKey,
          hasAppToken: !!VTEX_CONFIG.appToken,
        },
        testData: data.slice(0, 2), // Return first 2 categories
      })
    } else {
      return NextResponse.json({
        success: false,
        error: `VTEX API returned ${response.status}`,
        config: {
          account: VTEX_ACCOUNT,
          environment: VTEX_ENVIRONMENT,
          hasAppKey: !!VTEX_CONFIG.appKey,
          hasAppToken: !!VTEX_CONFIG.appToken,
        },
      })
    }
  } catch (error) {
    console.error("VTEX test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      config: {
        account: VTEX_ACCOUNT,
        environment: VTEX_ENVIRONMENT,
        hasAppKey: !!VTEX_CONFIG.appKey,
        hasAppToken: !!VTEX_CONFIG.appToken,
      },
    })
  }
} 