import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface PasswordRequirementsProps {
  className?: string;
  password: string;
  onValidateChange: (isValid: boolean) => void;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  className,
  password,
  onValidateChange,
}) => {
  const passwordRequirements = useMemo(() => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );

    return [
      { name: "8 characters minimum", valid: minLength },
      { name: "One number", valid: hasNumber },
      { name: "One lowercase character", valid: hasLowerCase },
      { name: "One uppercase character", valid: hasUpperCase },
      { name: "One special character", valid: hasSpecialCharacter },
    ];
  }, [password]);

  const validPassword = passwordRequirements.every(
    (requirement) => requirement.valid
  );

  useEffect(() => {
    onValidateChange(validPassword);
  }, [validPassword, onValidateChange]);

  return (
    <ul className={cn("list-disc list-inside", className)}>
      {passwordRequirements.map((requirement, index) => (
        <li
          key={`requirement-${index}`}
          className={cn(
            requirement.valid ? "text-green-600" : "text-gray-400",
            "transition-colorss"
          )}
        >
          {requirement.name}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRequirements;
