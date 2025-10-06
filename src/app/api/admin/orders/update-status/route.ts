import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['confirmed', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // In production, this would update the database
    // For now, we'll just return success
    console.log(`Updating order ${orderId} status to ${status}`);

    // Simulate database update delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} status updated to ${status}`,
      data: {
        orderId,
        status,
        updatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
