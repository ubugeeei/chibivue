import { SFCDescriptor, SFCScriptBlock } from "../../compiler-sfc";
import { ResolvedOptions } from ".";

export function resolveScript(
  descriptor: SFCDescriptor,
  options: ResolvedOptions
): SFCScriptBlock | null {
  if (!descriptor.script && !descriptor.scriptSetup) return null;
  let resolved: SFCScriptBlock | null = null;
  resolved = options.compiler.compileScript(descriptor);
  return resolved;
}

// Check if we can use compile template as inlined render function
// inside <script setup>. This can only be done for build because
// inlined template cannot be individually hot updated.
export function isUseInlineTemplate(descriptor: SFCDescriptor): boolean {
  return !!descriptor.scriptSetup;
}
