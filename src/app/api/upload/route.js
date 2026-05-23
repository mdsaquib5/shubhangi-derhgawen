import { NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'portfolio';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mimeType = file.type;
    let resourceType = 'image';

    if (mimeType.startsWith('image/')) {
      resourceType = 'image';
    } else if (mimeType.startsWith('video/')) {
      resourceType = 'video';
    } else if (mimeType.startsWith('audio/')) {
      resourceType = 'video'; // Cloudinary handles audio under video
    } else if (mimeType === 'application/pdf') {
      resourceType = 'raw';
    } else {
      resourceType = 'raw';
    }

    const result = await uploadMedia(buffer, folder, resourceType);

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      resourceType: result.resourceType,
      format: result.format,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
