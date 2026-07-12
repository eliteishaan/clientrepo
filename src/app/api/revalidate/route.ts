/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// This is the secret set in Sanity Webhooks
const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, secret);

    if (!isValidSignature) {
      const message = 'Invalid Sanity Webhook signature';
      console.error(message);
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request: Missing _type', { status: 400 });
    }

    // Revalidate based on document type
    switch (body._type) {
      case 'project':
        revalidateTag('project');
        break;
      case 'siteSettings':
      case 'experience':
      case 'education':
      case 'skill':
      case 'award':
      case 'publication':
        revalidateTag('settings');
        revalidateTag('page'); // Home page queries this data
        break;
      default:
        revalidateTag('page');
        revalidateTag('project');
        revalidateTag('settings');
        break;
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return new Response(err.message, { status: 500 });
  }
}
