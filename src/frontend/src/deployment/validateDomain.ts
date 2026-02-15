/**
 * Validates a deployment domain slug against the required rules.
 * @param domain - The domain slug to validate
 * @returns An object with isValid boolean and error message if invalid
 */
export function validateDomain(domain: string): {
  isValid: boolean;
  error: string | null;
} {
  // Check length
  if (domain.length < 5 || domain.length > 50) {
    return {
      isValid: false,
      error: "Domain must be between 5 and 50 characters long.",
    };
  }

  // Check allowed characters (lowercase letters, numbers, hyphens only)
  const validPattern = /^[a-z0-9-]+$/;
  if (!validPattern.test(domain)) {
    return {
      isValid: false,
      error: "Domain must contain only lowercase letters, numbers, and hyphens.",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

/**
 * Returns a user-friendly validation message with rules and example.
 */
export function getValidationMessage(): string {
  return "Domain must be 5–50 characters and contain only lowercase letters, numbers, and hyphens (example: tbn-trained-by-nipun).";
}
