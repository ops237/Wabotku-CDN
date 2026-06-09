import { createCanvas, loadImage } from 'canvas';
import { Buffer } from 'buffer';

// Basic caching for image buffers
const imageCache = new Map<string, Buffer>();

async function getBuffer(url: string): Promise<Buffer> {
    if (imageCache.has(url)) {
        return imageCache.get(url)!;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    imageCache.set(url, buffer);
    return buffer;
}

interface GenerateCanvasOptions {
    bgUrl: string;
    groupName: string;
    memberCount: number;
    mode: 'welcome' | 'goodbye';
    profileUrl: string;
}

export async function generateCanvas({
    bgUrl,
    groupName,
    memberCount,
    mode,
    profileUrl,
}: GenerateCanvasOptions): Promise<Buffer> {
    const WIDTH = 1400;
    const HEIGHT = 700;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    try {
        const bg = await loadImage(await getBuffer(bgUrl));
        ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);
    } catch (e) {
        console.warn('Gagal memuat BG_URL, menggunakan warna hitam.', e);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    let avatar;
    try {
        avatar = await loadImage(await getBuffer(profileUrl));
    } catch (e) {
        console.warn('Gagal memuat Avatar, menggunakan fallback.', e);
        avatar = null;
    }

    const AV = 260;
    const cx = WIDTH / 2;
    const cy = HEIGHT * 0.32;

    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 45;
    ctx.beginPath();
    ctx.arc(cx, cy, AV / 2 + 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, AV / 2, 0, Math.PI * 2);
    ctx.clip();

    if (avatar) {
        ctx.drawImage(avatar, cx - AV / 2, cy - AV / 2, AV, AV);
    } else {
        ctx.fillStyle = '#444';
        ctx.fillRect(cx - AV / 2, cy - AV / 2, AV, AV);
    }
    ctx.restore();

    ctx.lineWidth = 7;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(cx, cy, AV / 2 + 7, 0, Math.PI * 2);
    ctx.stroke();

    function drawText(str: string, size: number, y: number, bold: boolean = false) {
        ctx.font = `${bold ? 'bold' : ''} ${size}px Sans`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'black';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillText(str, cx, y);
    }

    const mainText = mode === 'welcome' ? 'WELCOME TO' : 'GOODBYE FROM';
    const nameText = groupName;
    const countText = `${memberCount} MEMBERS`;

    drawText(mainText, 70, cy + AV / 2 + 80, true);
    drawText(nameText, 52, cy + AV / 2 + 150, true);
    drawText(countText, 46, cy + AV / 2 + 220);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    // Bersihkan referensi canvas dari memori
    // ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // avatar = null;
    return buffer;
}
