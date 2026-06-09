import { NextRequest, NextResponse } from 'next/server';
import { generateCanvas } from '@/utils/canvasGenerator';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const bgUrl = searchParams.get('bgUrl');
    const groupName = searchParams.get('groupName');
    const memberCount = parseInt(searchParams.get('memberCount') || '0', 10);
    const mode = searchParams.get('mode') as 'welcome' | 'goodbye' | null;
    const profileUrl = searchParams.get('profileUrl');

    if (!bgUrl || !groupName || !memberCount || !mode || !profileUrl) {
        return NextResponse.json(
            { error: 'Missing required parameters: bgUrl, groupName, memberCount, mode, profileUrl' },
            { status: 400 }
        );
    }

    if (!['welcome', 'goodbye'].includes(mode)) {
        return NextResponse.json(
            { error: 'Invalid mode. Must be \'welcome\' or \'goodbye\'' },
            { status: 400 }
        );
    }

    try {
        const imageBuffer = await generateCanvas({ bgUrl, groupName, memberCount, mode, profileUrl });

        return new NextResponse(Uint8Array.from(imageBuffer), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Error generating canvas:', error);
        return NextResponse.json(
            { error: 'Failed to generate image', details: (error as Error).message },
            { status: 500 }
        );
    }
}
