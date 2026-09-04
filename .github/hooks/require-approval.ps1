$input = [Console]::In.ReadToEnd()

try {
    $data = $input | ConvertFrom-Json
} catch {
    # Si no se puede parsear JSON, permitir
    exit 0
}

# Solo interceptar la herramienta run_in_terminal
$toolName = $data.tool_name
if ($toolName -ne "run_in_terminal") {
    exit 0
}

# Obtener el comando del input
$command = ""
if ($data.tool_input.command) {
    $command = $data.tool_input.command
}

# Comandos que requieren aprobacion
$restrictedPatterns = @(
    "pnpm build",
    "pnpm dev",
    "pnpm start",
    "pnpm test",
    "pnpm install",
    "npm build",
    "npm run build",
    "npm run dev",
    "npm run start",
    "npm run test",
    "npm install",
    "yarn build",
    "yarn dev",
    "yarn start",
    "yarn test",
    "yarn install"
)

$needsApproval = $false
foreach ($pattern in $restrictedPatterns) {
    if ($command -match [regex]::Escape($pattern)) {
        $needsApproval = $true
        break
    }
}

if ($needsApproval) {
    $output = @{
        hookSpecificOutput = @{
            hookEventName = "PreToolUse"
            permissionDecision = "ask"
            permissionDecisionReason = "Este comando requiere tu aprobacion: $command"
        }
    }
    $output | ConvertTo-Json -Compress
    exit 0
}

exit 0
