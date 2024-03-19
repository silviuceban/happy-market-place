
if (Get-Command code -ErrorAction SilentlyContinue) {
    code .
}
else {
    Write-Host "'code' is not found in the PATH. Make sure Visual Studio Code is installed."
    
}