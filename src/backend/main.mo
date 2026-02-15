actor {
  public type Documentation = Text;

  public func getDomainValidationDocumentation() : async Documentation {
    "App deployment domain must be 5–50 characters long, using only lowercase letters, numbers, and hyphens. No parentheses or other special characters are allowed. Example: tbn-trained-by-nipun";
  };
};
