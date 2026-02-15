import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { validateDomain, getValidationMessage } from "../../deployment/validateDomain";

interface DeploymentDomainValidationBannerProps {
  domain: string;
}

export default function DeploymentDomainValidationBanner({
  domain,
}: DeploymentDomainValidationBannerProps) {
  const validation = validateDomain(domain);

  if (validation.isValid) {
    return (
      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-500">Valid Deployment Domain</AlertTitle>
        <AlertDescription className="text-green-500/90">
          Domain <span className="font-mono font-semibold">{domain}</span> is valid and ready for deployment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Invalid Deployment Domain</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Current domain: <span className="font-mono font-semibold">{domain}</span>
        </p>
        <p className="mb-2">{validation.error}</p>
        <p className="text-sm">{getValidationMessage()}</p>
      </AlertDescription>
    </Alert>
  );
}
