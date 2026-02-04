#
# CS2 Skin Patterns

Small, focused JSON datasets for CS2 skin pattern analysis.  
All data is organized by **weapon type** and **pattern template**.

**What’s inside**
- `data/` — Individual JSON files separated by skin type.  
- `dump/all_skins.json` — Aggregated dump for all available skins/patterns in one file.

The nesting is:
- `skin` (`fade`) → `weapon` (`awp`) → `pattern_id` (`"8"`) → fields

All skin names are lowercase for consistent lookups.