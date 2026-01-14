const fs = require('fs');
const path = require('path');

const docsDir = '/home/than/Personal Project/odoo/clone gitbook to fumadoc/fumadocs-clone/content/docs';

const emojiMap = [
    { keywords: ['Al-Quran', 'Al Qur\'an', 'Surah', 'Ayat'], emoji: '📖' },
    { keywords: ['Tahfidz', 'Tahsin'], emoji: '📖' },
    { keywords: ['Absensi', 'Kehadiran'], emoji: '✅' },
    { keywords: ['Penilaian', 'Nilai', 'Rapor'], emoji: '📊' },
    { keywords: ['Login', 'Akun', 'Hak Akses', 'Pemblokiran', 'Pengaktifan'], emoji: '🔐' },
    { keywords: ['Santri', 'Siswa'], emoji: '👨‍🎓' },
    { keywords: ['Guru', 'Wali Kelas', 'Musyrif'], emoji: '👨‍🏫' },
    { keywords: ['Hadits', 'Buku'], emoji: '📖' },
    { keywords: ['Kesehatan'], emoji: '🏥' },
    { keywords: ['Pelanggaran', 'Tindakan Disipliner'], emoji: '⚠️' },
    { keywords: ['Keuangan', 'Biaya', 'Tagihan', 'Saldo', 'VA', 'Donasi', 'Mata Uang', 'Pajak', 'Akuntansi', 'Order Pembelian', 'Tagihan Pemasok'], emoji: '💰' },
    { keywords: ['Pengaturan', 'Konfigurasi', 'Setup', 'Alur', 'Role'], emoji: '⚙️' },
    { keywords: ['Laporan'], emoji: '📋' },
    { keywords: ['Dashboard', 'UI', 'Tampilan', 'Tampilan Sistem'], emoji: '🖥️' },
    { keywords: ['Jadwal', 'Jam Pelajaran'], emoji: '📅' },
    { keywords: ['Pendaftaran', 'PSB', 'Kartu'], emoji: '📝' },
    { keywords: ['Gudang', 'Penyimpanan', 'Lokasi'], emoji: '📦' },
    { keywords: ['Point of Sale', 'POS', 'Kasir', 'Penjualan'], emoji: '🛒' },
    { keywords: ['Halaqah', 'Asrama', 'Kamar'], emoji: '🏠' },
    { keywords: ['Pembelian', 'Pemasok'], emoji: '🤝' },
    { keywords: ['Struktur Organisasi'], emoji: '🏢' },
    { keywords: ['Jenjang', 'Jurusan', 'Kelas', 'Mata Pelajaran', 'Kurikulum', 'RPP'], emoji: '🏫' },
    { keywords: ['Pengumuman', 'Informasi'], emoji: '📢' },
];

function getEmoji(content, title, fileName) {
    const searchTitle = (title + ' ' + fileName).toLowerCase();
    const searchContent = content.toLowerCase();

    // High priority: Title match
    for (const entry of emojiMap) {
        for (const keyword of entry.keywords) {
            if (searchTitle.includes(keyword.toLowerCase())) {
                return entry.emoji;
            }
        }
    }

    // Low priority: Content match
    for (const entry of emojiMap) {
        for (const keyword of entry.keywords) {
            if (searchContent.includes(keyword.toLowerCase())) {
                return entry.emoji;
            }
        }
    }

    return '📄';
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract title from frontmatter
    const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    let title = '';
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/^title:\s*(.*)$/m);
        if (titleMatch) {
            title = titleMatch[1].trim();
            // Remove existing emoji if present
            title = title.replace(/^[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6CF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F170}-\u{1F251}]\s*/u, '');
        }
    }

    const fileName = path.basename(filePath, path.extname(filePath));
    if (!title) {
        title = fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const emoji = getEmoji(content, title, fileName);
    const h1Pattern = /^#\s+(.*)$/m;
    const h1Match = content.match(h1Pattern);

    const newH1 = `# ${emoji} ${title}`;

    if (h1Match) {
        // Replace existing H1
        content = content.replace(h1Pattern, newH1);
    } else {
        // Insert after frontmatter
        if (frontmatterMatch) {
            content = content.replace(/^---\s*[\s\S]*?\s*---/, (match) => `${match}\n\n${newH1}`);
        } else {
            content = `${newH1}\n\n${content}`;
        }
    }

    // Clean up double newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(filePath, content);
    console.log(`Processed: ${filePath} -> ${emoji}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            processFile(fullPath);
        }
    }
}

walkDir(docsDir);
console.log('Done!');
