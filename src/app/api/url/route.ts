import { getBaseUrl } from '@/utils/getBaseUrl'
import { NextResponse } from 'next/server'

export async function GET(
) {
  const baseUrl = await getBaseUrl()
  return NextResponse.json({ baseUrl })
}
