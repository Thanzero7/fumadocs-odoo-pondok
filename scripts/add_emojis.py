import os
import re

def get_emoji(path, title):
    path = path.lower()
    title = title.lower()
    
    # Priority keywords in title
    if 'absensi' in title: return '📝'
    if 'penilaian' in title: return '🎓'
    if 'kesehatan' in title: return '🏥'
    if 'pelanggaran' in title: return '⚠️'
    if 'prestasi' in title: return '🏆'
    if 'izin' in title: return '🎫'
    if 'saldo' in title or 'keuangan' in title: return '💰'
    if 'tagihan' in title or 'biaya' in title: return '🧾'
    if any(k in title for k in ['tahfidz', 'tahsin', 'quran']): return '📖'
    if 'pembelian' in title or 'order' in title: return '🛒'
    if 'pos' in title or 'kasir' in title: return '🏪'
    if 'login' in title or 'masuk' in title: return '🔑'
    
    # Path based mapping
    if 'modul-guru' in path: return '👨‍🏫'
    if 'modul-keamanan' in path: return '👮'
    if 'modul-kesantrian' in path: return '🏫'
    if 'modul-keuangan' in path: return '💰'
    if 'modul-musyrif' in path: return '👳'
    if 'modul-orang-tua' in path: return '👨‍👩‍👧'
    if 'modul-pembelian' in path: return '🛒'
    if 'modul-pos' in path: return '🏪'
    if 'modul-psb' in path: return '📝'
    if 'dashboard' in path: return '📊'
    if 'data-riwayat' in path: return '📜'
    if 'laporan-laporan' in path: return '📈'
    if 'master-data' in path: return '🗂️'
    if 'panduan-login' in path: return '🔑'
    if 'pengenalan-sistem' in path: return '💡'
    if 'setup-and-konfigurasi' in path: return '⚙️'
    
    return '📄'

def update_mdx_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        print(f"No frontmatter found in {filepath}")
        return

    frontmatter_content = match.group(1)
    body = content[match.end():]
    
    # Extract title
    title_match = re.search(r'^title:\s*(.*)$', frontmatter_content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else ""
    # Remove quotes if present
    title = title.strip('"').strip("'")
    
    # Determine emoji
    emoji = get_emoji(filepath, title)
    
    # Check if icon already exists
    if re.search(r'^icon:', frontmatter_content, re.MULTILINE):
        # Update existing icon
        updated_frontmatter = re.sub(r'^icon:.*$', f'icon: {emoji}', frontmatter_content, flags=re.MULTILINE)
    else:
        # Add icon after title or at the end of frontmatter
        if title_match:
            updated_frontmatter = frontmatter_content[:title_match.end()] + f'\nicon: {emoji}' + frontmatter_content[title_match.end():]
        else:
            updated_frontmatter = frontmatter_content + f'\nicon: {emoji}'
            
    # Combine back
    new_content = f"---\n{updated_frontmatter.strip()}\n---\n{body}"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath} with icon: {emoji}")

def main():
    docs_dir = 'content/docs'
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.mdx'):
                update_mdx_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
