import { NextRequest, NextResponse } from "next/server";

// EMI = P * r * (1+r)^n / ((1+r)^n - 1)
export async function POST(request: NextRequest) {
  try {
    const { principal, rate, tenure } = await request.json();
    const P = Number(principal);
    const annualRate = Number(rate);
    const years = Number(tenure);

    if (!P || !annualRate || !years) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "principal, rate, and tenure are required" } },
        { status: 400 }
      );
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    return NextResponse.json({
      success: true,
      data: {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: P,
        monthlyRate: r,
        months: n,
        breakdown: {
          principalPercent: Math.round((P / totalAmount) * 100),
          interestPercent: Math.round((totalInterest / totalAmount) * 100),
        },
      },
    });
  } catch (error) {
    console.error("EMI calc failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "CALC_ERROR", message: "Failed to calculate EMI" } },
      { status: 500 }
    );
  }
}
