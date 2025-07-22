import { type NextRequest, NextResponse } from "next/server"
import { VTEX_ENDPOINTS, vtexHeaders } from "@/lib/vtex-api"

export async function POST(request: NextRequest) {
  try {
    const { orderFormId } = await request.json()

    if (!orderFormId) {
      return NextResponse.json({ error: "OrderForm ID is required" }, { status: 400 })
    }

    console.log("Preparing checkout for orderFormId:", orderFormId)

    const orderFormResponse = await fetch(VTEX_ENDPOINTS.orderForm(orderFormId), {
      method: "GET",
      headers: vtexHeaders,
    })

    if (!orderFormResponse.ok) {
      if (orderFormResponse.status === 404) {
        return NextResponse.json({ error: "OrderForm not found or expired" }, { status: 404 })
      }
      throw new Error(`Failed to get orderForm: ${orderFormResponse.status}`)
    }

    const orderForm = await orderFormResponse.json()
    console.log("OrderForm for checkout:", {
      orderFormId: orderForm.orderFormId,
      itemsCount: orderForm.items?.length || 0,
      items: orderForm.items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }))
    })

    if (!orderForm.items || orderForm.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const clientPreferencesData = {
      locale: "en-US",
      optinNewsLetter: false,
    }

    const clientPreferencesResponse = await fetch(`${VTEX_ENDPOINTS.attachments(orderFormId)}/clientPreferencesData`, {
      method: "POST",
      headers: vtexHeaders,
      body: JSON.stringify(clientPreferencesData),
    })

    if (!clientPreferencesResponse.ok) {
      console.warn("Failed to set client preferences, continuing anyway")
    }

    return NextResponse.json({
      orderFormId,
      checkoutUrl: VTEX_ENDPOINTS.checkout(orderFormId),
      alternativeCheckoutUrl: VTEX_ENDPOINTS.checkoutWithId(orderFormId),
      gatewayUrl: VTEX_ENDPOINTS.gateway(orderFormId),
      orderForm,
    })
  } catch (error) {
    console.error("Error preparing checkout:", error)
    return NextResponse.json({ error: "Failed to prepare checkout" }, { status: 500 })
  }
}
