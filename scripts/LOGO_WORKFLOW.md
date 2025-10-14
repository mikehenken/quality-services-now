# Logo Generation & Refinement Workflow

## 📁 Organization System

All logos are preserved forever in organized folders:

```
public/logos/
├── kds-navbar-logo-*.png           # Original generations (base folder)
├── session_20251014_120530/        # First refinement session
│   ├── kds-navbar-logo-v1-rev-v1_120545.png
│   ├── kds-navbar-logo-v1-rev-v2_120545.png
│   └── ...
├── session_20251014_143022/        # Second refinement session
│   └── ...
└── session_20251015_091234/        # Third refinement session (coming back later)
    └── ...
```

**Nothing is ever deleted!** Each session gets its own timestamped folder.

---

## 🚀 Workflow

### Step 1: Generate Initial Logos
```bash
cd /home/mikeh/Projects/roe/scripts
./run-focused-generator.sh
```
Generates 8 logos in `public/logos/` base folder.

### Step 2: Refine Your Favorite
```bash
./run-interactive-refine.sh
```

Interactive prompts:
1. **Pick your favorite** (from any session, any folder)
2. **Request changes** (e.g., "darker text", "smaller icon")
3. **Get 4 variations** saved to new session folder
4. **Repeat unlimited times**:
   - More changes to current logo
   - Pick different logo ('pick')
   - Done when satisfied ('done')

### Step 3: Come Back Later
Run `./run-interactive-refine.sh` again anytime!
- All previous logos still available
- Pick ANY logo from ANY session
- Create new variations
- New session folder created automatically

---

## 💡 Example Session

```
$ ./run-interactive-refine.sh

Available logos:
  [base]
  1. kds-navbar-logo-v1_20251410_071127.png
  2. kds-navbar-logo-v2_20251410_071127.png
  ...
  [session_20251014_120530]
  9. kds-navbar-logo-v1-rev-v1_120545.png
  ...

Enter number: 1
✓ Selected: kds-navbar-logo-v1_20251410_071127.png

What would you like to change?
Your input: make text darker and 20% larger

🎨 Generating 4 variations...
✓ Generated 4 variations! (Revision #1)

What would you like to change?
Your input: smaller icon, more space between icon and text

🎨 Generating 4 variations...
✓ Generated 4 variations! (Revision #2)

What would you like to change?
Your input: done

✓ Session complete!
  Session folder: session_20251014_143022
  Total revisions: 2
```

---

## 📝 Tips

**Good revision requests:**
- "Make text 30% darker"
- "Icon 50% smaller"
- "Add more orange accent"
- "Bolder font weight"
- "Better contrast for white background"

**Commands:**
- `pick` - Choose a different logo to refine
- `done` - Finish this session
- `quit` - Exit immediately

**Remember:**
- Each session is a new folder
- All logos preserved forever
- Can refine ANY logo anytime
- Unlimited revisions per session
