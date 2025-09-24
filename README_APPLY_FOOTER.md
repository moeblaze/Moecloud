# Footer Auto-Insert Tool

This script inserts the global footer snippet into **all** HTML files in your repo.

## Files
- `scripts/apply-footer.mjs`
- `partials/footer.html` (from the Footer Pack)

## Usage
1. Ensure `partials/footer.html` exists at repo root (from the Footer Pack).
2. Run locally or in CI:
   ```bash
   node scripts/apply-footer.mjs
   ```
3. Commit the modified files → PR → merge to `main`.

The script skips common system folders and won’t double-insert if the footer is already present.
