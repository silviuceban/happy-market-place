# Save this script with a .ps1 extension, for example, run_code.ps1

# Check if 'code' is in the PATH
if (Get-Command code -ErrorAction SilentlyContinue) {
    # Run the 'code .' command
    code .
} else {
    Write-Host "'code' is not found in the PATH. Make sure Visual Studio Code is installed."
    # You may want to provide the full path to 'code' if it's not in the PATH
    # For example: & "C:\Program Files\Microsoft VS Code\Code.exe" .
}