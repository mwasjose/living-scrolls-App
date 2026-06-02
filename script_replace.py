import re, pathlib
root = pathlib.Path('src')
patterns = [
    (re.compile(r'\bglass-card\b'), 'card-soft'),
    (re.compile(r'\bbg-parchment/5\b'), 'bg-secondary'),
    (re.compile(r'\bbg-midnight/\d+\b'), 'bg-surface-soft'),
    (re.compile(r'\bbg-gold/\d+\b'), 'bg-accent-soft'),
    (re.compile(r'\bbg-gold\b'), 'bg-accent'),
    (re.compile(r'\btext-gold\b'), 'text-accent'),
    (re.compile(r'\bborder-gold/\d+\b'), 'border-accent'),
    (re.compile(r'\bborder-gold\b'), 'border-accent'),
    (re.compile(r'\bborder-white/\d+\b'), 'border-border'),
    (re.compile(r'\bfrom-gold/\d+\b'), 'from-accent-soft'),
    (re.compile(r'\bto-gold/\d+\b'), 'to-accent-soft'),
    (re.compile(r'\bvia-gold/\d+\b'), 'via-accent-soft'),
    (re.compile(r'\bhover:border-gold/\d+\b'), 'hover:border-accent'),
    (re.compile(r'\bring-gold/\d+\b'), 'ring-accent'),
    (re.compile(r'\bfrom-gold\b'), 'from-accent'),
    (re.compile(r'\bto-gold\b'), 'to-accent'),
    (re.compile(r'\bvia-gold\b'), 'via-accent'),
    (re.compile(r'\bhover:text-gold\b'), 'hover:text-accent'),
    (re.compile(r'\bhover:border-gold\b'), 'hover:border-accent'),
]
changed_files = []
for path in root.rglob('*'):
    if path.suffix in {'.ts', '.tsx'}:
        text = path.read_text(encoding='utf-8')
        new = text
        for pat, repl in patterns:
            new = pat.sub(repl, new)
        if new != text:
            path.write_text(new, encoding='utf-8')
            changed_files.append(str(path))
print('changed', len(changed_files), 'files')
for p in changed_files:
    print(p)
