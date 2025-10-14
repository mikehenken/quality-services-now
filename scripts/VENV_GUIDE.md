# Virtual Environment Guide

This project uses Python virtual environments (venv) to isolate dependencies and avoid conflicts with your system Python packages.

## 📦 What is a Virtual Environment?

A venv is an isolated Python environment that:
- ✅ Keeps project dependencies separate from system packages
- ✅ Prevents version conflicts between projects
- ✅ Allows different Python package versions per project
- ✅ Makes the project portable and reproducible

## 🚀 Quick Start

The setup script handles everything automatically:

```bash
cd /home/mikeh/Projects/roe/scripts
./setup-and-run.sh
```

This will:
1. Create `scripts/venv/` directory (if it doesn't exist)
2. Install all required packages inside the venv
3. Activate the venv automatically
4. Run the logo generation script

## 🔧 Manual Virtual Environment Usage

### Create Virtual Environment (First Time Only)
```bash
cd /home/mikeh/Projects/roe/scripts
python3 -m venv venv
```

### Activate Virtual Environment
```bash
# On Linux/Mac/WSL
source venv/bin/activate

# You'll see (venv) in your terminal prompt:
# (venv) user@host:~/Projects/roe/scripts$
```

### Install Dependencies
```bash
# Make sure venv is activated first!
pip install -r requirements.txt
```

### Run Scripts
```bash
# Venv must be activated
python3 generate-logo-enhanced.py
# or
python3 generate-logo.py
```

### Deactivate Virtual Environment
```bash
deactivate

# Prompt returns to normal:
# user@host:~/Projects/roe/scripts$
```

## 📁 Directory Structure

```
scripts/
├── venv/                    # Virtual environment (gitignored)
│   ├── bin/                # Executables (python, pip, etc.)
│   ├── lib/                # Installed packages
│   └── ...
├── generate-logo.py        # Logo generation script
├── generate-logo-enhanced.py
├── setup-and-run.sh        # Automated setup
├── activate-venv.sh        # Helper to activate venv
└── requirements.txt        # Python dependencies
```

## 🎯 Common Commands

### Check if venv is activated
```bash
which python3
# If active: /path/to/roe/scripts/venv/bin/python3
# If not: /usr/bin/python3
```

### List installed packages in venv
```bash
# Activate venv first
source venv/bin/activate
pip list
```

### Update packages
```bash
source venv/bin/activate
pip install --upgrade -r requirements.txt
```

### Delete and recreate venv
```bash
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## ❓ Troubleshooting

**"venv not found"**
```bash
# Run setup script to create it
./setup-and-run.sh

# Or create manually
python3 -m venv venv
```

**"Module not found" errors**
```bash
# Make sure venv is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**"Permission denied" when creating venv**
```bash
# Make sure you have write permissions
ls -la .

# Try with sudo (not recommended, but may be needed)
sudo python3 -m venv venv
sudo chown -R $USER:$USER venv
```

**Accidentally installed packages globally**
```bash
# Check if venv is active
which python3

# If showing /usr/bin/python3, activate venv first:
source venv/bin/activate
```

## 🧹 Cleanup

The virtual environment is gitignored and can be safely deleted:

```bash
# Delete venv (can always recreate)
rm -rf venv

# Recreate
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 💡 Best Practices

1. **Always activate venv before running scripts**
   ```bash
   source venv/bin/activate
   ```

2. **Use the setup script for first-time setup**
   ```bash
   ./setup-and-run.sh
   ```

3. **Deactivate when done**
   ```bash
   deactivate
   ```

4. **Never commit the venv directory**
   - Already added to `.gitignore`
   - Other developers will create their own

5. **Keep requirements.txt updated**
   ```bash
   pip freeze > requirements.txt
   ```

## 🔗 Resources

- [Python venv Documentation](https://docs.python.org/3/library/venv.html)
- [pip Documentation](https://pip.pypa.io/en/stable/)
- [virtualenv vs venv](https://stackoverflow.com/questions/41573587/what-is-the-difference-between-venv-pyvenv-pyenv-virtualenv-virtualenvwrappe)

